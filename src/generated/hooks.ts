/* generated using generate-hooks.ts -- do not edit */
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { appClient } from '../lib/appClient';
import * as Models from './models';
import { GoogleTokenRequest } from './models/GoogleTokenRequest';

export const useAdminGetUserSpiritualDetailSgvdAdminSpiritualStatsUserIdGet = (variables: {
    userId: string,
}, options?: UseQueryOptions<any, Error>) => {
    return useQuery({
        queryKey: ['AdminService', 'getUserSpiritualDetailSgvdAdminSpiritualStatsUserIdGet', variables],
        queryFn: () => appClient.admin.getUserSpiritualDetailSgvdAdminSpiritualStatsUserIdGet(variables),
        ...options,
    });
};

export const useAuthRegisterSgvdAuthRegisterPost = (options?: UseMutationOptions<UserOut, Error, {
    requestBody: UserRegister,
}>) => {
    return useMutation({
        mutationFn: (variables: {
            requestBody: UserRegister,
        }) => appClient.auth.registerSgvdAuthRegisterPost(variables),
        ...options,
    });
};

export const useAuthLoginSgvdAuthLoginPost = (options?: UseMutationOptions<Token, Error, {
    requestBody: UserLogin,
}>) => {
    return useMutation({
        mutationFn: (variables: {
            requestBody: UserLogin,
        }) => appClient.auth.loginSgvdAuthLoginPost(variables),
        ...options,
    });
};

export const useAuthLoginForAccessTokenSgvdAuthTokenPost = (options?: UseMutationOptions<Token, Error, {
    formData: Body_login_for_access_token_sgvd_auth_token_post,
}>) => {
    return useMutation({
        mutationFn: (variables: {
            formData: Body_login_for_access_token_sgvd_auth_token_post,
        }) => appClient.auth.loginForAccessTokenSgvdAuthTokenPost(variables),
        ...options,
    });
};

export const useAuthGoogleAuthSgvdAuthGooglePost = (options?: UseMutationOptions<GoogleAuthResponse, Error, {
    requestBody: GoogleTokenRequest,
}>) => {
    return useMutation({
        mutationFn: (variables: {
            requestBody: GoogleTokenRequest,
        }) => appClient.auth.googleAuthSgvdAuthGooglePost(variables),
        ...options,
    });
};

export const useCompassBearingSgvdCompassBearingPost = (options?: UseMutationOptions<BearingResponse, Error, {
    requestBody: BearingRequest,
}>) => {
    return useMutation({
        mutationFn: (variables: {
            requestBody: BearingRequest,
        }) => appClient.compass.bearingSgvdCompassBearingPost(variables),
        ...options,
    });
};

export const useConfigGetAppConfigSgvdConfigAppGet = (variables: any, options?: UseQueryOptions<AppConfigOut, Error>) => {
    return useQuery({
        queryKey: ['ConfigService', 'getAppConfigSgvdConfigAppGet', variables],
        queryFn: () => appClient.config.getAppConfigSgvdConfigAppGet(variables),
        ...options,
    });
};

export const useConfigUpdateAppConfigSgvdConfigAppPut = (options?: UseMutationOptions<AppConfigOut, Error, {
    requestBody: AppConfigUpdate,
}>) => {
    return useMutation({
        mutationFn: (variables: {
            requestBody: AppConfigUpdate,
        }) => appClient.config.updateAppConfigSgvdConfigAppPut(variables),
        ...options,
    });
};

export const useDefaultHealthHealthGet = (variables: any, options?: UseQueryOptions<any, Error>) => {
    return useQuery({
        queryKey: ['DefaultService', 'healthHealthGet', variables],
        queryFn: () => appClient.default.healthHealthGet(variables),
        ...options,
    });
};

export const useEventsListEventsSgvdEventsGet = (variables: any, options?: UseQueryOptions<Array<EventOut, Error>) => {
    return useQuery({
        queryKey: ['EventsService', 'listEventsSgvdEventsGet', variables],
        queryFn: () => appClient.events.listEventsSgvdEventsGet(variables),
        ...options,
    });
};

export const useEventsCreateBulkEventsSgvdEventsBulkPost = (options?: UseMutationOptions<Array<EventOut, Error, {
    requestBody: BulkEventCreate,
}>) => {
    return useMutation({
        mutationFn: (variables: {
            requestBody: BulkEventCreate,
        }) => appClient.events.createBulkEventsSgvdEventsBulkPost(variables),
        ...options,
    });
};

export const useLocationsGetLocationsSgvdLocationsGet = (variables: any, options?: UseQueryOptions<LocationSearchResponse, Error>) => {
    return useQuery({
        queryKey: ['LocationsService', 'getLocationsSgvdLocationsGet', variables],
        queryFn: () => appClient.locations.getLocationsSgvdLocationsGet(variables),
        ...options,
    });
};

export const useLocationsUpdateLocationSgvdLocationsUpdatePost = (options?: UseMutationOptions<LocationUpdateResponse, Error, {
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
}>) => {
    return useMutation({
        mutationFn: (variables: {
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
        }) => appClient.locations.updateLocationSgvdLocationsUpdatePost(variables),
        ...options,
    });
};

export const useSpiritualLogJapaSgvdSpiritualJapaPost = (options?: UseMutationOptions<any, Error, {
    requestBody: LogActivityRequest,
}>) => {
    return useMutation({
        mutationFn: (variables: {
            requestBody: LogActivityRequest,
        }) => appClient.spiritual.logJapaSgvdSpiritualJapaPost(variables),
        ...options,
    });
};

export const useSpiritualLogPranayamaSgvdSpiritualPranayamaPost = (options?: UseMutationOptions<any, Error, {
    requestBody: LogActivityRequest,
}>) => {
    return useMutation({
        mutationFn: (variables: {
            requestBody: LogActivityRequest,
        }) => appClient.spiritual.logPranayamaSgvdSpiritualPranayamaPost(variables),
        ...options,
    });
};

export const useSpiritualLogDarshanSgvdSpiritualDarshanPost = (options?: UseMutationOptions<any, Error, {
    requestBody: LogActivityRequest,
}>) => {
    return useMutation({
        mutationFn: (variables: {
            requestBody: LogActivityRequest,
        }) => appClient.spiritual.logDarshanSgvdSpiritualDarshanPost(variables),
        ...options,
    });
};

export const useSpiritualGetSpiritualStatsSgvdSpiritualStatsGet = (variables: any, options?: UseQueryOptions<any, Error>) => {
    return useQuery({
        queryKey: ['SpiritualService', 'getSpiritualStatsSgvdSpiritualStatsGet', variables],
        queryFn: () => appClient.spiritual.getSpiritualStatsSgvdSpiritualStatsGet(variables),
        ...options,
    });
};

export const useSpiritualGetSpiritualStatsTodaySgvdSpiritualStatsTodayGet = (variables: any, options?: UseQueryOptions<any, Error>) => {
    return useQuery({
        queryKey: ['SpiritualService', 'getSpiritualStatsTodaySgvdSpiritualStatsTodayGet', variables],
        queryFn: () => appClient.spiritual.getSpiritualStatsTodaySgvdSpiritualStatsTodayGet(variables),
        ...options,
    });
};

export const useUsersGetProfileSgvdUsersProfileUserIdGet = (variables: {
    userId: string,
}, options?: UseQueryOptions<UserOut, Error>) => {
    return useQuery({
        queryKey: ['UsersService', 'getProfileSgvdUsersProfileUserIdGet', variables],
        queryFn: () => appClient.users.getProfileSgvdUsersProfileUserIdGet(variables),
        ...options,
    });
};

