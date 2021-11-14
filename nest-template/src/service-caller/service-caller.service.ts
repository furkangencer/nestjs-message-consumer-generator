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
    axios.interceptors.response.use((response) => {
      const { config, data, status } = response;
      const endedAt = new Date();
      config['metadata'] = { ...config['metadata'], endedAt };

      const startedAt = config['metadata'].startedAt;
      const duration = endedAt.getTime() - startedAt.getTime();

      const { method, url } = config;

      this.logger.debug(
        {
          service: config['metadata'].service,
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
        service: config['metadata'].service,
        message: data['message'] || 'Microservice error!',
        isService: true,
        ...(data['code']
          ? {
              code: data['code'],
              data: data['data'],
            }
          : undefined),
      });
    });
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
      })
      .pipe(map((res) => res.data));

    return lastValueFrom(response).catch((err) => {
      this.logger.error(err, '[ServiceCallerError]');
      throw new ServiceCallerException(err);
    });
  }
}
