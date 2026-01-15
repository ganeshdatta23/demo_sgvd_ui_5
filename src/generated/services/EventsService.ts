/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BulkEventCreate } from '../models/BulkEventCreate';
import type { EventOut } from '../models/EventOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class EventsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List Events
     * List all published events in descending order (latest first).
     * @returns EventOut Successful Response
     * @throws ApiError
     */
    public listEventsSgvdEventsGet(): CancelablePromise<Array<EventOut>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sgvd/events/',
        });
    }
    /**
     * Create Bulk Events
     * Create multiple events at once.
     * Requires admin authentication.
     * @returns EventOut Successful Response
     * @throws ApiError
     */
    public createBulkEventsSgvdEventsBulkPost({
        requestBody,
    }: {
        requestBody: BulkEventCreate,
    }): CancelablePromise<Array<EventOut>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sgvd/events/bulk',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
