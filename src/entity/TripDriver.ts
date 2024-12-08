// src/entity/TripDriver.ts
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Trip } from './Trip';
import { Employee } from './Employee';

@Entity()
export class TripDriver {
  @PrimaryColumn()
  @ManyToOne(() => Trip, { nullable: false })
  @JoinColumn({ name: 'trip_id' })
  trip_id!: number;

  @PrimaryColumn()
  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'driver_id' })
  driver_id!: number;
}
