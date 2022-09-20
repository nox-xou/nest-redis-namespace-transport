import { ClientRedis, ReadPacket } from '@nestjs/microservices';
import { RedisNamespaceOptions } from './redis-namespace-options.interface';
import { transformPatternToRoute } from './utiles/transform-pattern.utils';

export class RedisNamespaceClient extends ClientRedis {
  private namespace = '';

  constructor(options: RedisNamespaceOptions) {
    super(options);
    if (options.namespace) {
      this.namespace = `${options.namespace}`;
    }
  }

  getRequestPattern(pattern: string): string {
    try {
      if (Number(pattern) && typeof Number(pattern) === 'number') {
        throw new Error('pattern isInteger');
      }

      let obj = JSON.parse(pattern);

      pattern = transformPatternToRoute({ namespace: this.namespace, ...obj });
    } catch (error) {
      pattern = `${this.namespace}:${pattern}`;
    }

    pattern = super.getRequestPattern(pattern);

    return pattern;
  }

  getReplyPattern(pattern: string): string {
    try {
      if (Number(pattern) && typeof Number(pattern) === 'number') {
        throw new Error('pattern isInteger');
      }

      let obj = JSON.parse(pattern);
      pattern = transformPatternToRoute({ namespace: this.namespace, ...obj });
    } catch (error) {
      pattern = `${this.namespace}:${pattern}`;
    }

    pattern = super.getReplyPattern(pattern);

    return pattern;
  }

  protected async dispatchEvent(packet: ReadPacket) {
    let { pattern } = packet;

    if (typeof pattern === 'string' || typeof pattern === 'number') {
      pattern = `${this.namespace}:${pattern}`;
    } else if (typeof pattern === 'object' && pattern !== null) {
      pattern = { namespace: this.namespace, ...pattern };
    }

    pattern = transformPatternToRoute(pattern);

    packet.pattern = pattern;
    return super.dispatchEvent(packet);
  }
}
