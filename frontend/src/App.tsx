import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  description: string;
  image_url?: string;
}

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      // Mock data for development
      setCars([
        {
          id: 1,
          make: 'BMW',
          model: '3 Series',
          year: 2022,
          price: 45000,
          description: 'Luxury sedan with advanced features'
        },
        {
          id: 2,
          make: 'Mercedes',
          model: 'C-Class',
          year: 2023,
          price: 52000,
          description: 'Premium comfort and performance'
        },
        {
          id: 3,
          make: 'Audi',
          model: 'A4',
          year: 2022,
          price: 48000,
          description: 'Elegant design with cutting-edge technology'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>🚗 AutoWebsite</h1>
          <p>Your Premium Car Dealership</p>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <div className="container">
            <h2>Find Your Dream Car</h2>
            <p>Discover our collection of premium vehicles</p>
          </div>
        </section>

        <section className="cars-section">
          <div className="container">
            <h3>Featured Cars</h3>
            {loading ? (
              <div className="loading">Loading cars...</div>
            ) : (
              <div className="cars-grid">
                {cars.map((car) => (
                  <div key={car.id} className="car-card">
                    <div className="car-image">
                      {car.image_url ? (
                        <img src={car.image_url} alt={`${car.make} ${car.model}`} />
                      ) : (
                        <div className="placeholder-image">📷</div>
                      )}
                    </div>
                    <div className="car-info">
                      <h4>{car.make} {car.model}</h4>
                      <p className="year">{car.year}</p>
                      <p className="price">${car.price.toLocaleString()}</p>
                      <p className="description">{car.description}</p>
                      <button className="contact-btn">Contact Us</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 AutoWebsite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
