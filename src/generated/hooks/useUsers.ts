/* generated using generate-hooks.ts -- do not edit */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { appClient } from '../../lib/appClient';
import {
    CancelablePromise,
    UserOut
} from '../index';

export const useUsersGetProfile = (variables: { userId: string, }, options?: UseQueryOptions<UserOut, Error>) => {
    return useQuery({
        queryKey: ['UsersService', 'getProfileSgvdUsersProfileUserIdGet', variables],
        queryFn: () => appClient.users.getProfileSgvdUsersProfileUserIdGet(variables),
        ...options,
    });
};

