import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { generate } from 'openapi-typescript-codegen';
import axios from 'axios';

dotenv.config({ path: '.env.local' });
dotenv.config();

const OPENAPI_PATH = process.env.BE_OPENAPI_PATH || process.env.NEXT_PUBLIC_BE_URL;
const LOCAL_OPENAPI_PATH = path.resolve(process.cwd(), 'openapi.json');
const GENERATED_OUTPUT_DIR = path.resolve(process.cwd(), 'src/generated');

async function main() {
  try {
    let specPath = LOCAL_OPENAPI_PATH;

    if (OPENAPI_PATH && OPENAPI_PATH !== '.') {
      console.log(`Fetching OpenAPI spec from ${OPENAPI_PATH}...`);
      
      const headers: Record<string, string> = {};
      if (process.env.NEXT_PRIVATE_SYSTEM_API_KEY) {
        headers['x-api-key'] = process.env.NEXT_PRIVATE_SYSTEM_API_KEY;
      }

      const response = await axios.get(OPENAPI_PATH, { headers });
      
      // Save to temporary file
      fs.writeFileSync(LOCAL_OPENAPI_PATH, JSON.stringify(response.data, null, 2));
      console.log('OpenAPI spec saved to openapi.json');
    } else {
      console.log('Using local openapi.json');
      if (!fs.existsSync(LOCAL_OPENAPI_PATH)) {
        throw new Error('Local openapi.json not found and no BE_OPENAPI_PATH provided.');
      }
    }

    console.log('Generating client...');
    await generate({
      input: LOCAL_OPENAPI_PATH,
      output: GENERATED_OUTPUT_DIR,
      clientName: 'AppClient',
      httpClient: 'axios',
      useOptions: true,
    });

    console.log('Client generated successfully!');

  } catch (error) {
    console.error('Error generating client:', error);
    process.exit(1);
  } finally {
    // Cleanup temporary file if it was fetched
    if (OPENAPI_PATH && OPENAPI_PATH !== '.' && fs.existsSync(LOCAL_OPENAPI_PATH)) {
      try {
         // The requirement says "Delete temporary openapi.json if generated and the fetch succeeded."
         // But also "from BE OPENAPI PATH... Save fetched spec... and delete it afterward."
         // If we used a local '.' path, we shouldn't delete it?
         // The logic above saves to LOCAL_OPENAPI_PATH only if fetch occurred.
         // However, if OPENAPI_PATH was '.', we used the existing one.
         // So we should only delete if we fetched it.
         fs.unlinkSync(LOCAL_OPENAPI_PATH);
         console.log('Cleaned up temporary openapi.json');
      } catch (e) {
        console.warn('Failed to delete temporary openapi.json', e);
      }
    }
  }
}

main();
