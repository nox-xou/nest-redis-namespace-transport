import { ClientRedis, ReadPacket } from "@nestjs/microservices";
import { RedisNamespaceOptions } from "./redis-namespace-options.interface";

export class RedisNamespaceClient extends ClientRedis {
  private namespace = '';

  constructor(options: RedisNamespaceOptions) {
    super(options);
    if (options.namespace) {
      this.namespace = options.namespace + ':';
    }
  }

  getRequestPattern(pattern: string) {
    const _pattern = this.namespace + pattern;
    return _pattern;
  }

  getReplyPattern(pattern: string) {
    const _pattern = this.namespace + pattern;
    return `${_pattern}.reply`;
  }

  protected async dispatchEvent(packet: ReadPacket) {
    const { pattern } = packet;
    packet.pattern = this.namespace + pattern;
    return super.dispatchEvent(packet);
  }
}
