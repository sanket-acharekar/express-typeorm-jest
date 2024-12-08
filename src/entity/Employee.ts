// src/entity/Employee.ts
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trip } from './Trip';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  emp_id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  seniority!: number;

  @Column()
  is_mechanic!: boolean;

  @Column("text", { array: true, default: () => "array[]::text[]" })
  vehicle_certifications?: string[];
}
