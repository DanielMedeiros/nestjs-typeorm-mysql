import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserIdCheckMiddlaware } from '../middlewares/user-id-check.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddlaware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
