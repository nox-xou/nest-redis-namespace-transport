import { RedisOptions } from '@nestjs/microservices';

export declare type RedisNamespaceOptions = RedisOptions['options'] &
  NamespaceOption;

interface NamespaceOption {
  namespace?: string;
}
