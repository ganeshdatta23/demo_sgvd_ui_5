/* generated using generate-hooks.ts -- do not edit */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { appClient } from '../../lib/appClient';
import {
    CancelablePromise,
    BulkEventCreate,
    EventOut
} from '../index';

export const useEventsListEvents = (options?: UseQueryOptions<Array<EventOut>, Error>) => {
    return useQuery({
        queryKey: ['EventsService', 'listEventsSgvdEventsGet'],
        queryFn: () => appClient.events.listEventsSgvdEventsGet(),
        ...options,
    });
};

export const useEventsCreateBulkEvents = (options?: UseMutationOptions<Array<EventOut>, Error, { requestBody: BulkEventCreate, }>) => {
    return useMutation({
        mutationFn: (variables: { requestBody: BulkEventCreate, }) => appClient.events.createBulkEventsSgvdEventsBulkPost(variables),
        ...options,
    });
};

