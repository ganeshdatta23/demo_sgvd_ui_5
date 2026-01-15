/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LogActivityRequest } from '../models/LogActivityRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SpiritualService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Log Japa
     * Log japa (chanting) activity.
     *
     * - Aggregates multiple logs on the same day
     * - Updates existing day's record, doesn't create duplicates
     * - Tracks last update time
     * @returns any Successful Response
     * @throws ApiError
     */
    public logJapaSgvdSpiritualJapaPost({
        requestBody,
    }: {
        requestBody: LogActivityRequest,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sgvd/spiritual/japa',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Log Pranayama
     * Log pranayama (breathing exercise) activity.
     *
     * - Aggregates multiple logs on the same day
     * - Updates existing day's record, doesn't create duplicates
     * - Tracks last update time
     * @returns any Successful Response
     * @throws ApiError
     */
    public logPranayamaSgvdSpiritualPranayamaPost({
        requestBody,
    }: {
        requestBody: LogActivityRequest,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sgvd/spiritual/pranayama',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Log Darshan
     * Log darshan (spiritual viewing/witnessing) activity.
     *
     * **IMPORTANT: Darshan is LIMITED to 1 per day ONLY**
     *
     * Rules:
     * - User can log darshan only ONCE per day
     * - Multiple attempts same day: Updates timestamp only, keeps count as 1
     * - Regardless of count value sent, only 1 is recorded per day
     * - Next day: can log 1 again (total becomes 2)
     *
     * Examples:
     * Day 1: Log darshan → darshan_count = 1
     * Day 1 (again): Log darshan (count=10000) → darshan_count = 1, timestamp updated
     * Day 2: Log darshan → darshan_count = 2 (total)
     * @returns any Successful Response
     * @throws ApiError
     */
    public logDarshanSgvdSpiritualDarshanPost({
        requestBody,
    }: {
        requestBody: LogActivityRequest,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sgvd/spiritual/darshan',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Spiritual Stats
     * Get aggregated spiritual activity statistics for current user.
     *
     * Returns:
     * - Total counts for each activity type
     * - Last update times
     * - Daily breakdown
     * - Active days count
     * @returns any Successful Response
     * @throws ApiError
     */
    public getSpiritualStatsSgvdSpiritualStatsGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sgvd/spiritual/stats',
        });
    }
    /**
     * Get Spiritual Stats Today
     * Get today's spiritual activity statistics for current user.
     * @returns any Successful Response
     * @throws ApiError
     */
    public getSpiritualStatsTodaySgvdSpiritualStatsTodayGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sgvd/spiritual/stats/today',
        });
    }
}
