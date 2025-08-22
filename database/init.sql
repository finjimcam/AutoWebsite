-- Initialize the database with sample data
CREATE DATABASE IF NOT EXISTS autowebsite;
USE autowebsite;

-- Create cars table
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
);

-- Insert sample data
INSERT INTO cars (make, model, year, price, description) VALUES
('BMW', '3 Series', 2022, 45000.00, 'Luxury sedan with advanced features and premium comfort'),
('Mercedes-Benz', 'C-Class', 2023, 52000.00, 'Premium comfort and performance with cutting-edge technology'),
('Audi', 'A4', 2022, 48000.00, 'Elegant design with cutting-edge technology and superior handling'),
('Tesla', 'Model 3', 2023, 55000.00, 'Electric luxury sedan with autopilot and premium interior'),
('Lexus', 'ES', 2022, 42000.00, 'Reliable luxury sedan with exceptional build quality'),
('Porsche', '911', 2023, 125000.00, 'Iconic sports car with unmatched performance and style'),
('Honda', 'Civic', 2023, 28000.00, 'Reliable and fuel-efficient compact car perfect for daily commuting'),
('Toyota', 'Camry', 2022, 32000.00, 'Mid-size sedan with excellent reliability and fuel economy');
