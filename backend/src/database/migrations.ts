import { pool } from './connection';

export const initializeDatabase = async () => {
  try {
    // Create cars table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS cars (
        id INT AUTO_INCREMENT PRIMARY KEY,
        make VARCHAR(50) NOT NULL,
        model VARCHAR(50) NOT NULL,
        year INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Insert sample data
    const [existing] = await pool.execute('SELECT COUNT(*) as count FROM cars');
    const count = (existing as any[])[0].count;

    if (count === 0) {
      await pool.execute(`
        INSERT INTO cars (make, model, year, price, description) VALUES
        ('BMW', '3 Series', 2022, 45000.00, 'Luxury sedan with advanced features and premium comfort'),
        ('Mercedes-Benz', 'C-Class', 2023, 52000.00, 'Premium comfort and performance with cutting-edge technology'),
        ('Audi', 'A4', 2022, 48000.00, 'Elegant design with cutting-edge technology and superior handling'),
        ('Tesla', 'Model 3', 2023, 55000.00, 'Electric luxury sedan with autopilot and premium interior'),
        ('Lexus', 'ES', 2022, 42000.00, 'Reliable luxury sedan with exceptional build quality'),
        ('Porsche', '911', 2023, 125000.00, 'Iconic sports car with unmatched performance and style')
      `);
      console.log('Sample data inserted successfully');
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

// Run migrations if this file is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Migration completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}
