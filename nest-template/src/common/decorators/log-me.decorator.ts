import { Logger } from '@nestjs/common';

export const LogMe =
  () =>
  (target: any, methodName: string, descriptor: any): void => {
    const className = target.constructor.name;
    const original = descriptor.value;
    const logger = new Logger(`[${className}] ${methodName}`);

    descriptor.value = new Proxy(original, {
      apply: async (target, thisArg, args) => {
        logger.debug({ args });

        return await target.apply(thisArg, args);
      },
    });
  };
