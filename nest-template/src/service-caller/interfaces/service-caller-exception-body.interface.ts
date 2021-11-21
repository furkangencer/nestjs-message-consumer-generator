export interface IServiceCallerExceptionBody {
  requestId?: string;
  service: string;
  message?: string;
  code?: number;
  data?: any;
}
