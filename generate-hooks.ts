import fs from 'fs';
import path from 'path';

const SERVICES_DIR = path.resolve('src/generated/services');
const OUTPUT_DIR = path.resolve('src/generated/hooks');

function extractNestedType(content: string, startIndex: number): string {
    let depth = 0;
    for (let i = startIndex; i < content.length; i++) {
        if (content[i] === '<') depth++;
        if (content[i] === '>') {
            if (depth === 0) return content.slice(startIndex, i);
            depth--;
        }
    }
    return content.slice(startIndex);
}

function generateHooks() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const services = fs.readdirSync(SERVICES_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts');
    const indexExports: string[] = [];

    services.forEach(serviceFile => {
        const serviceName = serviceFile.replace('.ts', '');
        const hookFileName = `use${serviceName.replace('Service', '')}.ts`;
        const content = fs.readFileSync(path.join(SERVICES_DIR, serviceFile), 'utf-8');

        // Extract models used in this service to import them
        const modelImports = Array.from(content.matchAll(/import type { ([\w]+) } from '\.\.\/models\/[\w]+';/g)).map(m => m[1]);
        const uniqueModels = [...new Set(modelImports)].sort();

        let fileOutput = `/* generated using generate-hooks.ts -- do not edit */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { appClient } from '../../lib/appClient';
import {
    CancelablePromise${uniqueModels.length > 0 ? ',\n    ' + uniqueModels.join(',\n    ') : ''}
} from '../index';

`;

        // Better regex for methods to find the return type correctly
        const methodRegex = /public\s+(\w+)\s*\(([\s\S]*?)\)\s*:\s*CancelablePromise</g;
        let match;
        let hasHooks = false;

        while ((match = methodRegex.exec(content)) !== null) {
            hasHooks = true;
            const methodName = match[1];
            const params = match[2].trim();
            const returnTypeStart = match.index + match[0].length;
            const returnType = extractNestedType(content, returnTypeStart).trim();

            const methodBodyStart = content.indexOf('{', returnTypeStart + returnType.length);
            const methodBodyEnd = content.indexOf('});', methodBodyStart);
            const methodBody = content.slice(methodBodyStart, methodBodyEnd);

            const isMutation = /method:\s*'(POST|PUT|DELETE|PATCH)'/.test(methodBody);

            // Clean method name
            let cleanMethodName = methodName.split('Sgvd')[0];
            cleanMethodName = cleanMethodName.replace(/(Get|Post|Put|Delete|Patch)$/, '');

            const serviceBaseName = serviceName.replace('Service', '');
            const hookName = `use${serviceBaseName}${cleanMethodName.charAt(0).toUpperCase() + cleanMethodName.slice(1)}`;

            const paramTypeMatch = params.match(/:\s*({[\s\S]*?}|[\w]+)/);
            const paramType = paramTypeMatch ? paramTypeMatch[1].trim().replace(/\s+/g, ' ') : null;

            const serviceProperty = serviceName.charAt(0).toLowerCase() + serviceName.slice(1, -7);

            if (isMutation) {
                const mutationParamsType = paramType || 'void';
                fileOutput += `export const ${hookName} = (options?: UseMutationOptions<${returnType}, Error, ${mutationParamsType}>) => {
    return useMutation({
        mutationFn: (${paramType ? 'variables: ' + paramType : ''}) => appClient.${serviceProperty}.${methodName}(${paramType ? 'variables' : ''}),
        ...options,
    });
};\n\n`;
            } else {
                if (paramType) {
                    fileOutput += `export const ${hookName} = (variables: ${paramType}, options?: Partial<UseQueryOptions<${returnType}, Error>>) => {
    return useQuery({
        queryKey: ['${serviceBaseName}', '${methodName}', variables],
        queryFn: () => appClient.${serviceProperty}.${methodName}(variables),
        ...options,
    } as UseQueryOptions<${returnType}, Error>);
};\n\n`;
                } else {
                    fileOutput += `export const ${hookName} = (options?: Partial<UseQueryOptions<${returnType}, Error>>) => {
    return useQuery({
        queryKey: ['${serviceBaseName}', '${methodName}'],
        queryFn: () => appClient.${serviceProperty}.${methodName}(),
        ...options,
    } as UseQueryOptions<${returnType}, Error>);
};\n\n`;
                }
            }
        }

        if (hasHooks) {
            fs.writeFileSync(path.join(OUTPUT_DIR, hookFileName), fileOutput);
            indexExports.push(`export * from './use${serviceName.replace('Service', '')}';`);
        }
    });

    // Create index.ts
    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), `/* generated using generate-hooks.ts -- do not edit */\n${indexExports.sort().join('\n')}\n`);

    console.log(`Hooks generated successfully in ${OUTPUT_DIR}`);
}

generateHooks();
