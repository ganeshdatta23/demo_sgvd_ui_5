/* generated using generate-hooks.ts -- do not edit */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { appClient } from '../../lib/appClient';
import {
    CancelablePromise,
    AppConfigOut,
    AppConfigUpdate
} from '../index';

export const useConfigGetAppConfig = (options?: Partial<UseQueryOptions<AppConfigOut, Error>>) => {
    return useQuery({
        queryKey: ['Config', 'getAppConfigSgvdConfigAppGet'],
        queryFn: () => appClient.config.getAppConfigSgvdConfigAppGet(),
        ...options,
    } as UseQueryOptions<AppConfigOut, Error>);
};

export const useConfigUpdateAppConfig = (options?: UseMutationOptions<AppConfigOut, Error, { requestBody: AppConfigUpdate, }>) => {
    return useMutation({
        mutationFn: (variables: { requestBody: AppConfigUpdate, }) => appClient.config.updateAppConfigSgvdConfigAppPut(variables),
        ...options,
    });
};

