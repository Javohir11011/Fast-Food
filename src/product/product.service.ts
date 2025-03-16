import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { validate } from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const oldProduct = await this.repo.findOneBy({
      name: createProductDto.name,
    });

    if (oldProduct) {
      throw new ConflictException('Name already exisist');
    }
    if (!validate(createProductDto.category_id)) {
      throw new HttpException('Invalid category_id', 400);
    }
    return await this.repo.save(createProductDto);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    const product = await this.repo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Not found');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.repo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Not found');
    }
    if (updateProductDto?.name) {
      const oldCategory = await this.repo.findOneBy({
        name: updateProductDto.name,
      });
      if (oldCategory) {
        throw new ConflictException('Name already exisist');
      }
    }

    // if (!validate(updateProductDto?.category_id)) {
    //   throw new HttpException('Invalid category_id', 400);
    // }
    await this.repo.update(id, updateProductDto);

    // Object.assign(product, updateProductDto);
    return { ...product, ...updateProductDto };
  }

  async remove(id: string) {
    const product = await this.repo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Not found');
    }
    await this.repo.delete(id);

    return {
      message: 'success',
    };
  }
}
