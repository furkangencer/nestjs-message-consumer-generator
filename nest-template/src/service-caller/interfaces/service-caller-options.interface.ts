import { Service } from '../../common/enums';

export interface IServiceCallerOptions {
  urls: IServiceURLs;
  timeout?: number;
}

type IServiceURLs = {
  [key in Service]: string;
};
