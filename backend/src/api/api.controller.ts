import { Controller, Get } from '@nestjs/common';

@Controller('api') // กำหนดเส้นทางหลักที่ /api
export class ApiController {
  @Get()
  getHello(): string {
    return 'Hello from the API!'; // ข้อมูลที่คุณต้องการให้ API ส่งกลับ
  }

  @Get('data') // เส้นทาง /api/data
  getData(): object {
    return { message: 'This is some data from the API' };
  }
}
