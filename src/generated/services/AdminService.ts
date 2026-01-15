/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AdminService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get All Spiritual Stats
     * Get all users' spiritual statistics with optional filtering.
     *
     * **Admin only endpoint**
     *
     * Filters:
     * - `filter_by=username&filter_value=gane` - Search by username (contains)
     * - `filter_by=japa_count&filter_value=min:100` - Min japa count
     * - `filter_by=japa_count&filter_value=max:50` - Max japa count
     * - `filter_by=total_activities&filter_value=min:50&sort_by=total_activities&sort_order=DESC`
     *
     * Examples:
     * ```
     * GET /sgvd/admin/spiritual-stats?filter_by=username&filter_value=gane
     * GET /sgvd/admin/spiritual-stats?filter_by=japa_count&filter_value=min:100&sort_by=total_japa&sort_order=DESC
     * GET /sgvd/admin/spiritual-stats?sort_by=last_activity_at&limit=100
     * ```
     * @returns any Successful Response
     * @throws ApiError
     */
    public getAllSpiritualStatsSgvdAdminSpiritualStatsGet({
        filterBy,
        filterValue,
        sortBy,
        sortOrder,
        limit = 50,
        offset,
    }: {
        /**
         * Filter field: 'username', 'japa_count', 'pranayama_count', 'darshan_count', 'total_activities'
         */
        filterBy?: (string | null),
        /**
         * Filter value. For count filters use: 'min:100' or 'max:50' or '100'
         */
        filterValue?: (string | null),
        /**
         * Sort by field: 'total_activities', 'total_japa', 'username', 'last_activity_at'
         */
        sortBy?: (string | null),
        /**
         * 'ASC' or 'DESC'
         */
        sortOrder?: (string | null),
        /**
         * Max results to return
         */
        limit?: number,
        /**
         * Offset for pagination
         */
        offset?: number,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sgvd/admin/spiritual-stats',
            query: {
                'filter_by': filterBy,
                'filter_value': filterValue,
                'sort_by': sortBy,
                'sort_order': sortOrder,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get User Spiritual Detail
     * Get detailed spiritual activity for a specific user (admin view).
     *
     * Includes daily breakdown and all timestamps.
     * @returns any Successful Response
     * @throws ApiError
     */
    public getUserSpiritualDetailSgvdAdminSpiritualStatsUserIdGet({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sgvd/admin/spiritual-stats/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
