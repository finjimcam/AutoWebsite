import express, { Request, Response } from 'express';
import { pool } from '../database/connection';

const router = express.Router();

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  description: string;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
}

// GET /api/cars - Get all cars
router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM cars ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/cars/:id - Get a specific car
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM cars WHERE id = ?', [id]);
    const cars = rows as Car[];

    if (cars.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(cars[0]);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/cars - Create a new car
router.post('/', async (req: Request, res: Response) => {
  try {
    const { make, model, year, price, description, image_url } = req.body;

    if (!make || !model || !year || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const [result] = await pool.execute(
      'INSERT INTO cars (make, model, year, price, description, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [make, model, year, price, description, image_url]
    );

    const insertResult = result as { insertId: number };
    res.status(201).json({ message: 'Car created successfully', id: insertResult.insertId });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/cars/:id - Update a car
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { make, model, year, price, description, image_url } = req.body;

    const [result] = await pool.execute(
      'UPDATE cars SET make = ?, model = ?, year = ?, price = ?, description = ?, image_url = ? WHERE id = ?',
      [make, model, year, price, description, image_url, id]
    );

    const updateResult = result as { affectedRows: number };

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({ message: 'Car updated successfully' });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /api/cars/:id - Delete a car
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute('DELETE FROM cars WHERE id = ?', [id]);
    const deleteResult = result as { affectedRows: number };

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
