import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  monthlyPrice?: number;
  description: string;
  image_url?: string;
  mileage?: number;
  fuelType?: string;
}

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      // Mock data inspired by Mount Vernon
      setCars([
        {
          id: 1,
          make: 'BMW',
          model: '3 Series',
          year: 2022,
          price: 28995,
          monthlyPrice: 299,
          description: 'Luxury sedan with advanced features and premium comfort',
          mileage: 15000,
          fuelType: 'Petrol'
        },
        {
          id: 2,
          make: 'Mercedes-Benz',
          model: 'C-Class',
          year: 2023,
          price: 32995,
          monthlyPrice: 349,
          description: 'Premium comfort and performance with cutting-edge technology',
          mileage: 8500,
          fuelType: 'Hybrid'
        },
        {
          id: 3,
          make: 'Audi',
          model: 'A4',
          year: 2022,
          price: 29995,
          monthlyPrice: 319,
          description: 'Elegant design with cutting-edge technology and superior handling',
          mileage: 12000,
          fuelType: 'Diesel'
        },
        {
          id: 4,
          make: 'Volkswagen',
          model: 'Golf',
          year: 2021,
          price: 18995,
          monthlyPrice: 199,
          description: 'Reliable and efficient compact car with modern features',
          mileage: 22000,
          fuelType: 'Petrol'
        },
        {
          id: 5,
          make: 'Ford',
          model: 'Focus',
          year: 2022,
          price: 16995,
          monthlyPrice: 179,
          description: 'Practical family car with excellent fuel economy',
          mileage: 18000,
          fuelType: 'Petrol'
        },
        {
          id: 6,
          make: 'Land Rover',
          model: 'Range Rover Evoque',
          year: 2023,
          price: 42995,
          monthlyPrice: 449,
          description: 'Luxury SUV with off-road capability and premium interior',
          mileage: 5000,
          fuelType: 'Hybrid'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase());

    if (priceFilter === 'all') return matchesSearch;
    if (priceFilter === '200') return matchesSearch && (car.monthlyPrice || 0) <= 200;
    if (priceFilter === '300') return matchesSearch && (car.monthlyPrice || 0) <= 300;
    if (priceFilter === '400') return matchesSearch && (car.monthlyPrice || 0) <= 400;
    if (priceFilter === '400+') return matchesSearch && (car.monthlyPrice || 0) > 400;

    return matchesSearch;
  });

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <div className="header-top">
            <div className="company-info">
              <h1 className="company-name">AUTOWEBSITE MOTORS</h1>
              <p className="tagline">QUALITY CARS AT GREAT PRICES</p>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <span>📞 0141 555 0123</span>
              </div>
              <div className="contact-item">
                <span>📱 07700 900 123</span>
              </div>
              <div className="contact-item">
                <span>📍 Glasgow, Scotland</span>
              </div>
            </div>
          </div>

          <nav className="navigation">
            <div className="nav-links">
              <a href="#home" className="nav-link active">Home</a>
              <a href="#used-cars" className="nav-link">Used Cars</a>
              <a href="#sell" className="nav-link">Sell Your Car</a>
              <a href="#finance" className="nav-link">Finance</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      <section className="welcome-section">
        <div className="container">
          <h2>Welcome to AutoWebsite Motors</h2>
          <p>If you are looking for great savings on quality used cars in Glasgow, then you have reached the right place.
            We are proud to offer you first-class customer service and very competitive pricing.</p>
        </div>
      </section>

      <section className="search-section">
        <div className="container">
          <div className="search-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by make or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="price-filters">
              <h4>Filter by Monthly Payment:</h4>
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${priceFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setPriceFilter('all')}
                >
                  All Vehicles
                </button>
                <button
                  className={`filter-btn ${priceFilter === '200' ? 'active' : ''}`}
                  onClick={() => setPriceFilter('200')}
                >
                  Up to £200/month
                </button>
                <button
                  className={`filter-btn ${priceFilter === '300' ? 'active' : ''}`}
                  onClick={() => setPriceFilter('300')}
                >
                  Up to £300/month
                </button>
                <button
                  className={`filter-btn ${priceFilter === '400' ? 'active' : ''}`}
                  onClick={() => setPriceFilter('400')}
                >
                  Up to £400/month
                </button>
                <button
                  className={`filter-btn ${priceFilter === '400+' ? 'active' : ''}`}
                  onClick={() => setPriceFilter('400+')}
                >
                  Over £400/month
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        <section className="cars-section">
          <div className="container">
            <div className="section-header">
              <h3>Our Quality Used Cars ({filteredCars.length})</h3>
              <p>Browse our carefully selected range of vehicles</p>
            </div>

            {loading ? (
              <div className="loading">Loading our latest vehicles...</div>
            ) : (
              <div className="cars-grid">
                {filteredCars.map((car) => (
                  <div key={car.id} className="car-card">
                    <div className="car-image">
                      {car.image_url ? (
                        <img src={car.image_url} alt={`${car.make} ${car.model}`} />
                      ) : (
                        <div className="placeholder-image">
                          <span className="car-icon">�</span>
                        </div>
                      )}
                    </div>

                    <div className="car-details">
                      <h4 className="car-title">{car.make} {car.model}</h4>
                      <div className="car-specs">
                        <span className="spec-item">📅 {car.year}</span>
                        {car.mileage && <span className="spec-item">🛣️ {car.mileage.toLocaleString()} miles</span>}
                        {car.fuelType && <span className="spec-item">⛽ {car.fuelType}</span>}
                      </div>

                      <p className="car-description">{car.description}</p>

                      <div className="pricing">
                        <div className="price-main">£{car.price.toLocaleString()}</div>
                        {car.monthlyPrice && (
                          <div className="price-monthly">From £{car.monthlyPrice}/month</div>
                        )}
                      </div>

                      <div className="car-actions">
                        <button className="btn-primary">View Details</button>
                        <button className="btn-secondary">Enquire Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="services-section">
          <div className="container">
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">🔍</div>
                <h4>View Our Cars</h4>
                <p>Browse our extensive range of quality used vehicles</p>
                <button className="service-btn">View Stock</button>
              </div>

              <div className="service-card">
                <div className="service-icon">💰</div>
                <h4>Sell Your Car</h4>
                <p>Get a quick valuation for your vehicle</p>
                <button className="service-btn">Start Valuation</button>
              </div>

              <div className="service-card">
                <div className="service-icon">💳</div>
                <h4>Finance Options</h4>
                <p>Flexible finance packages to suit your budget</p>
                <button className="service-btn">Learn More</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Contact Information</h4>
              <p>📍 123 Main Street, Glasgow, Scotland, G1 1AA</p>
              <p>📞 0141 555 0123</p>
              <p>📱 07700 900 123</p>
              <p>✉️ info@autowebsite.co.uk</p>
            </div>

            <div className="footer-section">
              <h4>Popular Brands</h4>
              <div className="brand-links">
                <a href="#bmw">BMW</a>
                <a href="#mercedes">Mercedes-Benz</a>
                <a href="#audi">Audi</a>
                <a href="#ford">Ford</a>
                <a href="#volkswagen">Volkswagen</a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Customer Reviews</h4>
              <p>⭐⭐⭐⭐⭐ Google Reviews</p>
              <p>⭐⭐⭐⭐⭐ AutoTrader</p>
              <p>Read what our customers say</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 AutoWebsite Motors. All rights reserved.</p>
            <p>Authorized and regulated by the Financial Conduct Authority</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
