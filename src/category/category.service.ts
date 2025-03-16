import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repo: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const oldCategory = await this.repo.findOneBy({
      name: createCategoryDto.name,
    });

    if (oldCategory) {
      throw new ConflictException('Name already exisist');
    }

    return await this.repo.save(createCategoryDto);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const category = await this.repo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Not found');
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.repo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Not found');
    }
    if (updateCategoryDto?.name) {
      const oldCategory = await this.repo.findOneBy({
        name: updateCategoryDto.name,
      });
      if (oldCategory) {
        throw new ConflictException('Name already exisist');
      }
    }
    await this.repo.update(id, updateCategoryDto);

    // Object.assign(category, updateCategoryDto);
    return { ...category, ...updateCategoryDto };
  }

  async remove(id: string) {
    const category = await this.repo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Not found');
    }
    await this.repo.delete(id);

    return {
      message: 'success',
    };
  }
}
