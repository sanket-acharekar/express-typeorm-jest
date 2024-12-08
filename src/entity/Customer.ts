// src/entity/Customer.ts
import { Entity, PrimaryGeneratedColumn, Column, IntegerType, OneToMany } from 'typeorm';
import { Shipment } from './Shipment';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column()
  phone1!: string;

  @Column()
  phone2!: string;

  @OneToMany(() => Shipment, (shipment) => shipment.customer)
  shipments!: Shipment[];

}

