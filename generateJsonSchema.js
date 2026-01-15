import { createGenerator } from 'ts-json-schema-generator';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function main() {
    const config = {
        path: path.resolve(__dirname, 'src/schema.ts'),
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        type: 'AttributeViewConstraint',
    };

    const outputPath = path.resolve(__dirname, 'src/generated/FE/ViewConstraintSchema.json');
    const outputDir = path.dirname(outputPath);

    if (!fs.existsSync(config.path)) {
        console.warn(`Schema file not found at ${config.path}. Skipping specific schema generation.`);
        return;
    }

    try {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const schema = createGenerator(config).createSchema(config.type);
        const schemaString = JSON.stringify(schema, null, 2);

        fs.writeFileSync(outputPath, schemaString);
        console.log(`JSON schema generated at ${outputPath}`);
    } catch (error) {
        console.error('Error generating JSON schema:', error);
        // If the type is missing, we might want to just warn?
        // But let's exit 0 if it's just missing file/type to avoid breaking the build flow if it's optional.
        // However, I'll keep exit 1 if it fails for other reasons.
        if (error instanceof Error && error.message.includes('No root type')) {
            console.warn('Type AttributeViewConstraint not found. Skipping.');
            return;
        }
        process.exit(1);
    }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main();
}
