import { ProductEntity } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
