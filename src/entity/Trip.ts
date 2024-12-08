// src/entity/Trip.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Employee } from './Employee';
import { Vehicle } from './Vehicle';
import { TripShipment } from './TripShipment';
import { TripVehicle } from './TripVehicle';
import { TripDriver } from './TripDriver';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  trip_id!: number;

  @Column()
  from_location!: string;

  @Column()
  to_location!: string;

  // A trip can have multiple shipments
  @OneToMany(() => TripVehicle, (tripVehicle) =>tripVehicle.trip_id)
  @JoinColumn({ name: 'trip_id' })
  tripVehicles!: TripVehicle[];


  // A trip can have multiple shipments
  @OneToMany(() => TripDriver, (tripDriver) => tripDriver.trip_id)
  @JoinColumn({ name: 'trip_id' })
  tripDrivers!: TripDriver[];


  // A trip can have multiple shipments
  @OneToMany(() => TripShipment, (tripShipment) => tripShipment.trip_id)
  @JoinColumn({ name: 'trip_id' })
  tripShipments!: TripShipment[];
}
