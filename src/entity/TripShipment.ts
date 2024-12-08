// src/entity/TripShipment.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Trip } from './Trip';
import { Shipment } from './Shipment';

@Entity()
export class TripShipment {
  @PrimaryGeneratedColumn()
  id!: number;

  // A trip can have multiple shipments
  @ManyToOne(() => Trip, (trip) => trip.tripShipments, { nullable: false })
  @JoinColumn({ name: 'trip_id' })
  trip_id!: number;

  // A shipment can belong to only one trip
  @ManyToOne(() => Shipment, { nullable: false })
  @JoinColumn({ name: 'shipment_id' })
  shipment_id!: number;
}
