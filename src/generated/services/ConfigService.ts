/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppConfigOut } from '../models/AppConfigOut';
import type { AppConfigUpdate } from '../models/AppConfigUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ConfigService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get App Config
     * Get current app configuration (version and expiry date).
     *
     * This endpoint is publicly accessible and returns the current app version
     * and expiry date if set.
     * @returns AppConfigOut Successful Response
     * @throws ApiError
     */
    public getAppConfigSgvdConfigAppGet(): CancelablePromise<AppConfigOut> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sgvd/config/app',
        });
    }
    /**
     * Update App Config
     * Update app configuration (admin only).
     *
     * This endpoint requires admin authentication and allows updating:
     * - app_version: The current version of the app
     * - expiry_date: Optional expiry date for the app
     *
     * Only provided fields will be updated.
     * @returns AppConfigOut Successful Response
     * @throws ApiError
     */
    public updateAppConfigSgvdConfigAppPut({
        requestBody,
    }: {
        requestBody: AppConfigUpdate,
    }): CancelablePromise<AppConfigOut> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/sgvd/config/app',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
