/* generated using generate-hooks.ts -- do not edit */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { appClient } from '../../lib/appClient';
import {
    CancelablePromise,
    Body_login_for_access_token_sgvd_auth_token_post,
    GoogleAuthResponse,
    GoogleTokenRequest,
    Token,
    UserLogin,
    UserOut,
    UserRegister
} from '../index';

export const useAuthRegister = (options?: UseMutationOptions<UserOut, Error, { requestBody: UserRegister, }>) => {
    return useMutation({
        mutationFn: (variables: { requestBody: UserRegister, }) => appClient.auth.registerSgvdAuthRegisterPost(variables),
        ...options,
    });
};

export const useAuthLogin = (options?: UseMutationOptions<Token, Error, { requestBody: UserLogin, }>) => {
    return useMutation({
        mutationFn: (variables: { requestBody: UserLogin, }) => appClient.auth.loginSgvdAuthLoginPost(variables),
        ...options,
    });
};

export const useAuthLoginForAccessToken = (options?: UseMutationOptions<Token, Error, { formData: Body_login_for_access_token_sgvd_auth_token_post, }>) => {
    return useMutation({
        mutationFn: (variables: { formData: Body_login_for_access_token_sgvd_auth_token_post, }) => appClient.auth.loginForAccessTokenSgvdAuthTokenPost(variables),
        ...options,
    });
};

export const useAuthGoogleAuth = (options?: UseMutationOptions<GoogleAuthResponse, Error, { requestBody: GoogleTokenRequest, }>) => {
    return useMutation({
        mutationFn: (variables: { requestBody: GoogleTokenRequest, }) => appClient.auth.googleAuthSgvdAuthGooglePost(variables),
        ...options,
    });
};

