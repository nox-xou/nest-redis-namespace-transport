import { ServerRedis, MessageHandler } from "@nestjs/microservices";
import { RedisNamespaceOptions } from "./redis-namespace-options.interface";

export class RedisNamespaceServer extends ServerRedis {
  private namespace = '';

  constructor(options: RedisNamespaceOptions) {
    super(options);
    if (options.namespace) {
      this.namespace = options.namespace + ':';
    }
  }

  addHandler(pattern: any, callback: MessageHandler, isEventHandler?: boolean) {
    const _pattern = this.namespace + pattern;
    super.addHandler(_pattern, callback, isEventHandler);
  }
}