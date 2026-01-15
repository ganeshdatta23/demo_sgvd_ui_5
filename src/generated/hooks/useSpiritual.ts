/* generated using generate-hooks.ts -- do not edit */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { appClient } from '../../lib/appClient';
import {
    CancelablePromise,
    LogActivityRequest
} from '../index';

export const useSpiritualLogJapa = (options?: UseMutationOptions<any, Error, { requestBody: LogActivityRequest, }>) => {
    return useMutation({
        mutationFn: (variables: { requestBody: LogActivityRequest, }) => appClient.spiritual.logJapaSgvdSpiritualJapaPost(variables),
        ...options,
    });
};

export const useSpiritualLogPranayama = (options?: UseMutationOptions<any, Error, { requestBody: LogActivityRequest, }>) => {
    return useMutation({
        mutationFn: (variables: { requestBody: LogActivityRequest, }) => appClient.spiritual.logPranayamaSgvdSpiritualPranayamaPost(variables),
        ...options,
    });
};

export const useSpiritualLogDarshan = (options?: UseMutationOptions<any, Error, { requestBody: LogActivityRequest, }>) => {
    return useMutation({
        mutationFn: (variables: { requestBody: LogActivityRequest, }) => appClient.spiritual.logDarshanSgvdSpiritualDarshanPost(variables),
        ...options,
    });
};

export const useSpiritualGetSpiritualStats = (options?: UseQueryOptions<any, Error>) => {
    return useQuery({
        queryKey: ['SpiritualService', 'getSpiritualStatsSgvdSpiritualStatsGet'],
        queryFn: () => appClient.spiritual.getSpiritualStatsSgvdSpiritualStatsGet(),
        ...options,
    });
};

export const useSpiritualGetSpiritualStatsToday = (options?: UseQueryOptions<any, Error>) => {
    return useQuery({
        queryKey: ['SpiritualService', 'getSpiritualStatsTodaySgvdSpiritualStatsTodayGet'],
        queryFn: () => appClient.spiritual.getSpiritualStatsTodaySgvdSpiritualStatsTodayGet(),
        ...options,
    });
};

