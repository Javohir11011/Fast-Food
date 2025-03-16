import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserID } from 'src/config/userID';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto, @UserID() id: string) {
    return this.orderService.create(createOrderDto, id);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
