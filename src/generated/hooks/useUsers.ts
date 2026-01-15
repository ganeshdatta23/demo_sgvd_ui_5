/* generated using generate-hooks.ts -- do not edit */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { appClient } from '../../lib/appClient';
import {
    CancelablePromise,
    UserOut
} from '../index';

export const useUsersGetProfile = (variables: { userId: string, }, options?: Partial<UseQueryOptions<UserOut, Error>>) => {
    return useQuery({
        queryKey: ['Users', 'getProfileSgvdUsersProfileUserIdGet', variables],
        queryFn: () => appClient.users.getProfileSgvdUsersProfileUserIdGet(variables),
        ...options,
    } as UseQueryOptions<UserOut, Error>);
};

