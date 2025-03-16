import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CustomJwtModule } from './config/jwt/jwt.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    CustomJwtModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
