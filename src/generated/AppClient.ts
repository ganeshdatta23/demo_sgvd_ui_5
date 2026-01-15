/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';
import { AdminService } from './services/AdminService';
import { AuthService } from './services/AuthService';
import { CompassService } from './services/CompassService';
import { ConfigService } from './services/ConfigService';
import { DefaultService } from './services/DefaultService';
import { EventsService } from './services/EventsService';
import { LocationsService } from './services/LocationsService';
import { SpiritualService } from './services/SpiritualService';
import { UsersService } from './services/UsersService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class AppClient {
    public readonly admin: AdminService;
    public readonly auth: AuthService;
    public readonly compass: CompassService;
    public readonly config: ConfigService;
    public readonly default: DefaultService;
    public readonly events: EventsService;
    public readonly locations: LocationsService;
    public readonly spiritual: SpiritualService;
    public readonly users: UsersService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.0.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.admin = new AdminService(this.request);
        this.auth = new AuthService(this.request);
        this.compass = new CompassService(this.request);
        this.config = new ConfigService(this.request);
        this.default = new DefaultService(this.request);
        this.events = new EventsService(this.request);
        this.locations = new LocationsService(this.request);
        this.spiritual = new SpiritualService(this.request);
        this.users = new UsersService(this.request);
    }
}

