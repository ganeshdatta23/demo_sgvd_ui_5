/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationSearchResponse } from '../models/LocationSearchResponse';
import type { LocationUpdateResponse } from '../models/LocationUpdateResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class LocationsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Locations
     * Get all available locations from database.
     * @returns LocationSearchResponse Successful Response
     * @throws ApiError
     */
    public getLocationsSgvdLocationsGet(): CancelablePromise<LocationSearchResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sgvd/locations',
        });
    }
    /**
     * Update Location
     * Create or update location with coordinates from Google Maps URL.
     * Requires admin authentication.
     *
     * Query Parameters:
     * - name: Location name (mandatory)
     * - google_maps_url: Google Maps URL to extract coordinates (mandatory)
     * - description: Location description (mandatory)
     * - is_global: Always set to true
     *
     * Supports Google Maps URL formats:
     * - https://www.google.com/maps?q=40.7128,-74.0060
     * - https://www.google.com/maps/place/40.7128,-74.0060
     * - https://maps.google.com/?q=40.7128,-74.0060
     * - https://www.google.com/maps/place/Empire+State+Building/@40.7128,-74.0060
     * @returns LocationUpdateResponse Successful Response
     * @throws ApiError
     */
    public updateLocationSgvdLocationsUpdatePost({
        name,
        googleMapsUrl,
        description,
    }: {
        /**
         * Location name
         */
        name: string,
        /**
         * Google Maps URL to extract coordinates
         */
        googleMapsUrl: string,
        /**
         * Location description
         */
        description: string,
    }): CancelablePromise<LocationUpdateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sgvd/locations/update',
            query: {
                'name': name,
                'google_maps_url': googleMapsUrl,
                'description': description,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
