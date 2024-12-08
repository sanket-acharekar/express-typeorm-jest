// src/entity/Shipment.ts
import { Entity, PrimaryGeneratedColumn, Column, IntegerType, Double, ManyToOne, JoinColumn} from 'typeorm';
import { Customer } from './Customer';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  shipment_id!: number;

  @Column()
  weight_kg!: number;

  @Column()
  value_usd!: number;

  // @Column()
  // capacity_kg!: number;

  // @Column()
  // origin!: string;

  // @Column()
  // destination!: string;

  @ManyToOne(() => Customer, (customer) => customer.shipments, { nullable: false})
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;

}

