import { ServerRedis, MessageHandler } from '@nestjs/microservices';
import { RedisNamespaceOptions } from './redis-namespace-options.interface';
import { transformPatternToRoute } from './utiles/transform-pattern.utils';

export class RedisNamespaceServer extends ServerRedis {
  private namespace = '';

  constructor(options: RedisNamespaceOptions) {
    super(options);
    if (options.namespace) {
      this.namespace = `${options.namespace}`;
    }
  }

  addHandler(pattern: any, callback: MessageHandler, isEventHandler?: boolean) {
    if (typeof pattern === 'string' || typeof pattern === 'number') {
      pattern = `${this.namespace}:${pattern}`;
    } else if (typeof pattern === 'object' && pattern !== null) {
      pattern = { namespace: this.namespace, ...pattern };
    }

    pattern = transformPatternToRoute(pattern);
    console.log('addHandler', pattern);

    super.addHandler(pattern, callback, isEventHandler);
  }

  getRequestPattern(pattern: string): string {
    pattern = super.getRequestPattern(pattern);
    console.log('getRequestPattern', pattern);

    return pattern;
  }
  getReplyPattern(pattern: string): string {
    pattern = super.getReplyPattern(pattern);
    console.log('getReplyPattern', pattern);

    return pattern;
  }
}
