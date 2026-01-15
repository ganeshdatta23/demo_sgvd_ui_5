import { AppClient } from '../generated';

export const appClient = new AppClient({
    BASE: import.meta.env.VITE_API_URL || import.meta.env.VITE_BE_URL || process.env.NEXT_PUBLIC_BE_URL || 'http://localhost:8000',
    TOKEN: async () => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('access_token');
        return token || '';
    },
});

// The TOKEN function will be called automatically by the generated client
// to add the Authorization header to authenticated requests
