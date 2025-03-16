import { OrderEntity } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity;
}
