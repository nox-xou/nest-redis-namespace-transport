import { RedisOptions } from '@nestjs/microservices';

interface NamespaceOption {
  namespace?: string;
}

export declare type RedisNamespaceOptions = RedisOptions['options'] &
  NamespaceOption;
