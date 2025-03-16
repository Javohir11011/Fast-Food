import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo: Repository<OrderEntity>,
  ) {}
  async create(createOrderDto: CreateOrderDto, user_id: string) {
    return await this.repo.save({ ...createOrderDto, user_id });
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    const order = await this.repo.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Not Found');
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {}

  async remove(id: string) {
    const order = await this.repo.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Not Found');
    }
    await this.repo.delete(id);

    return {
      message: 'success',
    };
  }
}
