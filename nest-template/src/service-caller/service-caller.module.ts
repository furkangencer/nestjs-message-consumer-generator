import { DynamicModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ServiceCallerService } from './service-caller.service';
import { SERVICE_CALLER_OPTIONS } from './constants';
import { IServiceCallerOptions } from './interfaces';

@Module({})
export class ServiceCallerModule {
  static registerAsync({
    imports = [],
    useFactory,
    inject,
  }: {
    imports?: any[];
    useFactory: (...args: any[]) => Promise<IServiceCallerOptions>;
    inject?: any[];
  }): DynamicModule {
    return {
      module: ServiceCallerModule,
      global: true,
      imports: [HttpModule, ...imports],
      providers: [
        {
          provide: SERVICE_CALLER_OPTIONS,
          useFactory,
          inject,
        },
        ServiceCallerService,
      ],
      exports: [ServiceCallerService],
    };
  }
}
