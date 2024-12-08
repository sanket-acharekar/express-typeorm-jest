// src/entity/Repair.ts
import { Entity, PrimaryGeneratedColumn, Column, IntegerType, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { Employee } from './Employee';
import { Vehicle } from './Vehicle';


@Entity()
export class Repair {
  @PrimaryGeneratedColumn()
  repair_id!: number;

  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'emp_id' })
  emp_id!: Employee;

  @ManyToOne(() => Vehicle, { nullable: false })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle_id!: Vehicle;

  @Column()
  estimated_days!: number;

  @Column()
  actual_days!: number;

}

