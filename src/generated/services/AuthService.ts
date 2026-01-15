/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_for_access_token_sgvd_auth_token_post } from '../models/Body_login_for_access_token_sgvd_auth_token_post';
import type { GoogleAuthResponse } from '../models/GoogleAuthResponse';
import type { GoogleTokenRequest } from '../models/GoogleTokenRequest';
import type { Token } from '../models/Token';
import type { UserLogin } from '../models/UserLogin';
import type { UserOut } from '../models/UserOut';
import type { UserRegister } from '../models/UserRegister';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Register
     * Register a new user.
     * @returns UserOut Successful Response
     * @throws ApiError
     */
    public registerSgvdAuthRegisterPost({
        requestBody,
    }: {
        requestBody: UserRegister,
    }): CancelablePromise<UserOut> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sgvd/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Login
     * Login a user and return access token.
     * @returns Token Successful Response
     * @throws ApiError
     */
    public loginSgvdAuthLoginPost({
        requestBody,
    }: {
        requestBody: UserLogin,
    }): CancelablePromise<Token> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sgvd/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Login For Access Token
     * OAuth2 compatible token endpoint for Swagger UI.
     *
     * Use email as username field.
     * Accepts form data: username (email) and password
     * @returns Token Successful Response
     * @throws ApiError
     */
    public loginForAccessTokenSgvdAuthTokenPost({
        formData,
    }: {
        formData: Body_login_for_access_token_sgvd_auth_token_post,
    }): CancelablePromise<Token> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sgvd/auth/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Google Auth
     * Authenticate user with Google OAuth token.
     * Creates new user if doesn't exist.
     * @returns GoogleAuthResponse Successful Response
     * @throws ApiError
     */
    public googleAuthSgvdAuthGooglePost({
        requestBody,
    }: {
        requestBody: GoogleTokenRequest,
    }): CancelablePromise<GoogleAuthResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sgvd/auth/google',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
