/* generated using generate-hooks.ts -- do not edit */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { appClient } from '../../lib/appClient';
import {
    CancelablePromise,
    LocationSearchResponse,
    LocationUpdateResponse
} from '../index';

export const useLocationsGetLocations = (options?: Partial<UseQueryOptions<LocationSearchResponse, Error>>) => {
    return useQuery({
        queryKey: ['Locations', 'getLocationsSgvdLocationsGet'],
        queryFn: () => appClient.locations.getLocationsSgvdLocationsGet(),
        ...options,
    } as UseQueryOptions<LocationSearchResponse, Error>);
};

export const useLocationsUpdateLocation = (options?: UseMutationOptions<LocationUpdateResponse, Error, { /** * Location name */ name: string, /** * Google Maps URL to extract coordinates */ googleMapsUrl: string, /** * Location description */ description: string, }>) => {
    return useMutation({
        mutationFn: (variables: { /** * Location name */ name: string, /** * Google Maps URL to extract coordinates */ googleMapsUrl: string, /** * Location description */ description: string, }) => appClient.locations.updateLocationSgvdLocationsUpdatePost(variables),
        ...options,
    });
};

