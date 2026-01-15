/* generated using generate-hooks.ts -- do not edit */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { appClient } from '../../lib/appClient';
import {
    CancelablePromise,
    BearingRequest,
    BearingResponse
} from '../index';

export const useCompassBearing = (options?: UseMutationOptions<BearingResponse, Error, { requestBody: BearingRequest, }>) => {
    return useMutation({
        mutationFn: (variables: { requestBody: BearingRequest, }) => appClient.compass.bearingSgvdCompassBearingPost(variables),
        ...options,
    });
};

