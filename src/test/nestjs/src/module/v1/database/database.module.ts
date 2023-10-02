import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ENVIRONMENT } from 'src/common/configs/environment';

@Module({
  imports: [MongooseModule.forRoot(ENVIRONMENT.DB.URL)],
})
export class DatabaseModule {}

// import { Module } from '@nestjs/common';
// import { ENVIRONMENT } from 'src/common/configs/environment';
// import { TypeOrmModule } from '@nestjs/typeorm';
//
// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//     }),
//   ],
// })
// export class DatabaseModule {}
