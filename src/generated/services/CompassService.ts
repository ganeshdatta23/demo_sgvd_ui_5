/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BearingRequest } from '../models/BearingRequest';
import type { BearingResponse } from '../models/BearingResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CompassService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Bearing
     * Calculate bearing and distance to the location in saved_location table.
     *
     * Parameters:
     * - current_lat: Current latitude
     * - current_lon: Current longitude
     *
     * The target coordinates are automatically fetched from the latest saved location.
     * @returns BearingResponse Successful Response
     * @throws ApiError
     */
    public bearingSgvdCompassBearingPost({
        requestBody,
    }: {
        requestBody: BearingRequest,
    }): CancelablePromise<BearingResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sgvd/compass/bearing',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
