/* generated using generate-hooks.ts -- do not edit */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { appClient } from '../../lib/appClient';
import {
    CancelablePromise,
    
} from '../index';

export const useDefaultHealthHealth = (options?: UseQueryOptions<any, Error>) => {
    return useQuery({
        queryKey: ['DefaultService', 'healthHealthGet'],
        queryFn: () => appClient.default.healthHealthGet(),
        ...options,
    });
};

