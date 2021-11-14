export interface IServiceCallerExceptionBody {
  service: string;
  message?: string;
  code?: number;
  data?: any;
  isService?: boolean;
}
