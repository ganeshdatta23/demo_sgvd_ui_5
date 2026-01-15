/* generated using generate-hooks.ts -- do not edit */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { appClient } from '../../lib/appClient';
import {
    CancelablePromise
} from '../index';

export const useAdminGetAllSpiritualStats = (variables: { /** * Filter field: 'username', 'japa_count', 'pranayama_count', 'darshan_count', 'total_activities' */ filterBy?: (string | null), /** * Filter value. For count filters use: 'min:100' or 'max:50' or '100' */ filterValue?: (string | null), /** * Sort by field: 'total_activities', 'total_japa', 'username', 'last_activity_at' */ sortBy?: (string | null), /** * 'ASC' or 'DESC' */ sortOrder?: (string | null), /** * Max results to return */ limit?: number, /** * Offset for pagination */ offset?: number, }, options?: Partial<UseQueryOptions<any, Error>>) => {
    return useQuery({
        queryKey: ['Admin', 'getAllSpiritualStatsSgvdAdminSpiritualStatsGet', variables],
        queryFn: () => appClient.admin.getAllSpiritualStatsSgvdAdminSpiritualStatsGet(variables),
        ...options,
    } as UseQueryOptions<any, Error>);
};

export const useAdminGetUserSpiritualDetail = (variables: { userId: string, }, options?: Partial<UseQueryOptions<any, Error>>) => {
    return useQuery({
        queryKey: ['Admin', 'getUserSpiritualDetailSgvdAdminSpiritualStatsUserIdGet', variables],
        queryFn: () => appClient.admin.getUserSpiritualDetailSgvdAdminSpiritualStatsUserIdGet(variables),
        ...options,
    } as UseQueryOptions<any, Error>);
};

