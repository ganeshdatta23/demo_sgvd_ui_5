/* generated using generate-hooks.ts -- do not edit */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { appClient } from '../../lib/appClient';
import {
    CancelablePromise,
    
} from '../index';

export const useAdminGetUserSpiritualDetail = (variables: { userId: string, }, options?: UseQueryOptions<any, Error>) => {
    return useQuery({
        queryKey: ['AdminService', 'getUserSpiritualDetailSgvdAdminSpiritualStatsUserIdGet', variables],
        queryFn: () => appClient.admin.getUserSpiritualDetailSgvdAdminSpiritualStatsUserIdGet(variables),
        ...options,
    });
};

