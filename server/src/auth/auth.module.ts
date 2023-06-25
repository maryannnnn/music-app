import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Roles} from "../roles/roles.entity";
import {Users} from "../users/users.entity";
import {AuthController} from "./auth.controller";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport';
import {LocalStrategy} from "./localStrategy";

@Module({
  imports: [
      TypeOrmModule.forFeature([Roles, Users]),
    PassportModule,
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
