import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { SERVICE_CALLER_OPTIONS } from './constants';
import { IAxiosRequest, IServiceCallerOptions } from './interfaces';
import { ServiceCallerException } from './exceptions';

@Injectable()
export class ServiceCallerService {
  private logger: Logger;
  constructor(
    @Inject(SERVICE_CALLER_OPTIONS) private services: IServiceCallerOptions,
    private readonly httpService: HttpService,
  ) {
    this.logger = new Logger('ServiceCaller');
    const axios = this.httpService.axiosRef;
    axios.defaults.timeout = this.services.timeout;
    axios.interceptors.request.use(
      (config) => {
        const startedAt = new Date();
        const { method, url, headers } = config;
        this.logger.debug(
          { service: headers.service, method, url, startedAt },
          '[ServiceCallerRequest]',
        );
        config['metadata'] = { startedAt, service: headers.service };
        delete headers.service;
        return config;
      },
      (err) => {
        this.logger.error(err, '[ServiceCallerError]');
        return Promise.reject(err);
      },
    );
    axios.interceptors.response.use(
      (response) => {
        const {
          config: {
            method,
            url,
            metadata: { service, startedAt },
          },
          data: { message, code, data },
          status,
        }: any = response;

        const duration = new Date().getTime() - startedAt.getTime();

        this.logger.debug(
          {
            service,
            method,
            url,
            startedAt,
            duration,
            status,
            response: data,
          },
          '[ServiceCallerResponse]',
        );

        if (status === 200) {
          return response;
        }

        return Promise.reject({
          service,
          message: message || 'Microservice error!',
          code,
          data,
        });
      },
      (err) => {
        return Promise.reject({
          service: err?.config?.metadata?.service,
          message: err?.message || 'Microservice error!',
          code: err?.code,
        });
      },
    );
  }

  public async call({
    service,
    path,
    method,
    headers,
    params,
    data,
    timeout,
  }: IAxiosRequest): Promise<any> {
    const baseURL = this.services.urls[service];
    const url = `${baseURL}${path}`;

    const response: Observable<AxiosResponse> = this.httpService
      .request({
        url,
        method,
        data,
        params,
        headers: { ...headers, service },
        timeout,
        validateStatus: () => true,
        transitional: {
          clarifyTimeoutError: true,
        },
      })
      .pipe(map((res) => res.data));

    return lastValueFrom(response).catch((err) => {
      throw new ServiceCallerException(err);
    });
  }
}
