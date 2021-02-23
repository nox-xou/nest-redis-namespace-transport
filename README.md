install package
```
yarn add @noxnox/nest-redis-namespace-transport
```
or
```
npm install --save @noxnox/nest-redis-namespace-transport
```
#

strategy options in main.ts
```typescript
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RedisNamespaceServer } from '@noxnox/nest-redis-namespace-transport';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      strategy: new RedisNamespaceServer({
        url: 'redis://localhost:6379',
        namespace: 'TEST'
      })
    },
  );

  app.listen(() => {
    console.log('Microservice is listen');
  });
}
bootstrap();
```

import client proxy in module
```typescript
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RedisNamespaceClient } from '@noxnox/nest-redis-namespace-transport';

@Module({
  imports: [
    ClientsModule.register({
      customClass: RedisNamespaceClient,
      options: {
        url: 'redis://localhost:6379',
        namespace: 'TEST'
      },
    })
  ]
})
export class AppModule {}
```