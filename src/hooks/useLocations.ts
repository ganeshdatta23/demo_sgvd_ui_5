import { useQuery } from '@tanstack/react-query';
import { appClient } from '../lib/appClient';
import type { LocationSearchResponse } from '../generated/models/LocationSearchResponse';

export const useGetLocations = () => {
    return useQuery({
        queryKey: ['locations'],
        queryFn: async (): Promise<LocationSearchResponse> => {
            // The generated method name is verbose, usually due to operationId or path usage
            return appClient.locations.getLocationsSgvdLocationsGet();
        },
    });
};
