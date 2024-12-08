// src/entity/Vehicle.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trip } from './Trip';

export enum VehicleType {
  cargo = 'Cargo Planes',
  inCity = 'In-city Truck',
  longHaul = 'Long-haul Truck'
}

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  vehicle_id!: number;

  @Column()
  brand!: string;

  @Column()
  load_kg!: number;

  @Column()
  capacity_kg!: number;

  @Column()
  year_manufactured!: number;

  @Column()
  num_repairs!: number;

  
  @Column({
    type: 'enum',
    enum: VehicleType, // Specify the enum here
  })
  type!: VehicleType;
}
