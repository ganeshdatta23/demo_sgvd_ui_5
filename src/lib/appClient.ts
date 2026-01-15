import { AppClient } from '../generated';

export const appClient = new AppClient({
    BASE: import.meta.env.VITE_BE_URL || process.env.NEXT_PUBLIC_BE_URL || 'http://localhost:8000',
    // TOKEN: async () => { ... } // implementations for token if needed
});

// If you need to add interceptors, you might need to access appClient.request
// But generated client with axios usually allows passing axios config or has a request property.
// However, openapi-typescript-codegen with axios client typically generates a class that uses a shared 'request' function or internal axios instance.
// If customization is needed (like interceptors), we might need to access the underlying axios instance if exposed,
// or pass a custom axios instance if the generator supports it (usually it generates its own).
// With 'useOptions: true', the methods take an options object.

// For now, basic initialization:
