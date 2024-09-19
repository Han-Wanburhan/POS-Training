import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors()); // เปิดใช้งาน CORS
  await app.listen(3001); // เปลี่ยนพอร์ตให้ต่างจาก React (3000)
}
bootstrap();
