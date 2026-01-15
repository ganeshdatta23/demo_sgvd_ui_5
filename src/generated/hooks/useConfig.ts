/* generated using generate-hooks.ts -- do not edit */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { appClient } from '../../lib/appClient';
import {
    CancelablePromise,
    AppConfigOut,
    AppConfigUpdate
} from '../index';

export const useConfigGetAppConfig = (options?: UseQueryOptions<AppConfigOut, Error>) => {
    return useQuery({
        queryKey: ['ConfigService', 'getAppConfigSgvdConfigAppGet'],
        queryFn: () => appClient.config.getAppConfigSgvdConfigAppGet(),
        ...options,
    });
};

export const useConfigUpdateAppConfig = (options?: UseMutationOptions<AppConfigOut, Error, { requestBody: AppConfigUpdate, }>) => {
    return useMutation({
        mutationFn: (variables: { requestBody: AppConfigUpdate, }) => appClient.config.updateAppConfigSgvdConfigAppPut(variables),
        ...options,
    });
};

