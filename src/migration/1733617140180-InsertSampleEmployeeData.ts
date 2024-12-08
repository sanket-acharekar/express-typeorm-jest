import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertSampleEmployeeData1733617140180 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insert 3 sample records into the Employee table
        console.log('123123')
        await queryRunner.query(`
          INSERT INTO employee (first_name, last_name, seniority, is_mechanic, vehicle_certifications) VALUES
            ('John', 'Doe', 5, true, '{"cert1", "cert2"}'),
            ('Jane', 'Smith', 3, false, '{"cert3", "cert4"}'),
            ('Mike', 'Johnson', 8, true, '{"cert5", "cert6"}');
        `);

        await queryRunner.query(`
          INSERT INTO customer (name, address, phone1, phone2) VALUES
            ('John Doe', '8 Main Street', '321-465-8976', '421-485-8876'),
            ('Jane Smith', '15 Queen St', '421-565-8076', '523-327-9007'),
            ('Mike Johnson', '20 Bayview Ave','527-665-4076', '427-355-7877');
        `);
    
        await queryRunner.query(`
            INSERT INTO vehicle (brand, load_kg, capacity_kg, year_manufactured, num_repairs, VehicleType) VALUES
            ('Ford', 1000, 5000, 2020, 2, 'In-city Truck'),
            ('Volvo', 2000, 10000, 2022, 1, 'Long-haul Truck'),
            ('Boeing 747', 124,000, 397,000, 2018, 6, 'Cargo Planes);
        `);

        await queryRunner.query(`
            INSERT INTO shipment (weight_kg, value_usd, customer_id) VALUES
            (5000, 30000, 2),
            (10000, 75000, 1),
            (7500, 54000, 3),
        `);

        await queryRunner.query(`
            INSERT INTO trip (from_location, to_location) VALUES
            ('New York', 'Toronto'),
            ('New Jersey', 'Montreal'),
            ('Halifax', 'Mississauga'),
        `);

        await queryRunner.query(`
            INSERT INTO trip (from_location, to_location) VALUES
            ('New York', 'Toronto'),
            ('New Jersey', 'Montreal'),
            ('Halifax', 'Mississauga'),
        `);

        await queryRunner.query(`
            INSERT INTO trip_dirver (trip_id, driver_id) VALUES
            (1, 2),
            (2, 3),
            (3, 1),
        `);

        await queryRunner.query(`
            INSERT INTO trip_vehicle (trip_id, vehicle_id) VALUES
            (1, 2),
            (2, 3),
            (3, 1),
        `);

        await queryRunner.query(`
            INSERT INTO trip_shipment (trip_id, shipment_id) VALUES
            (1, 1),
            (1, 3),
            (2, 2),
        `);

        await queryRunner.query(`
           INSERT INTO repair (estimated_days, actual_days, emp_id, vehicle_id) VALUES
            (10, 8, 1, 2),
            (20, 22, 2, 3),
            (6, 4, 1, 1),
        `);
    
        console.log('Sample data inserted');
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the sample data from the Employee table
        await queryRunner.query(`
          DELETE FROM employee WHERE first_name IN ('John', 'Jane', 'Mike');
        `);
    
        console.log('Sample employee data removed');
    }
}
