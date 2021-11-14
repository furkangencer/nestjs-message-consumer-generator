import { Method } from 'axios';
import { Service } from '../../common/enums';

export interface IAxiosRequest {
  service: Service;
  path: string;
  method: Method;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
  timeout?: number;
}
