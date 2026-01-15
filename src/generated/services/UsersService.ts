/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserOut } from '../models/UserOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Profile
     * Get user profile by ID.
     * @returns UserOut Successful Response
     * @throws ApiError
     */
    public getProfileSgvdUsersProfileUserIdGet({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<UserOut> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sgvd/users/profile/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
