// src/entity/TripVehicle.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Trip } from './Trip';
import { Vehicle } from './Vehicle';

@Entity()
export class TripVehicle {
  @PrimaryColumn()
  @ManyToOne(() => Trip, { nullable: false })
  @JoinColumn({ name: 'trip_id' })
  trip_id!: number;

  // A vehicle can participate in multiple trips
  @PrimaryColumn()
  @ManyToOne(() => Vehicle, { nullable: false })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle_id!: number;
}
