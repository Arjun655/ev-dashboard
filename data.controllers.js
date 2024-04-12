import { Pool } from 'pg';

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'website_test',
  password: '12345678',
  port: 3600, 
});


const createRecord = async (req, res) => {
  try {
    const { LicensePlate , make, VIN, model, type, date, milesDriven } = req.body;
    const query = 'INSERT INTO mytable (make, model, type, date, "miles driven") VALUES ($1, $2, $3, $4, $5)';
    await pool.query(query, [ LicensePlate , make, VIN, model, type, date, milesDriven]);
    res.status(201).json({ message: 'Record created successfully' });
  } catch (error) {
    console.error('Error creating record:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getAllRecords = async (req, res) => {
  try {
    const query = 'SELECT * FROM mytable';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM mytable WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Record not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching record:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { LicensePlate , make, VIN, model, type, date, milesDriven } = req.body;
    const query = 'UPDATE mytable SET make = $1, model = $2, type = $3, date = $4, "miles driven" = $5 WHERE id = $6';
    await pool.query(query, [LicensePlate , make, VIN, model, type, date, milesDriven]);
    res.json({ message: 'Record updated successfully' });
  } catch (error) {
    console.error('Error updating record:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM mytable WHERE id = $1';
    await pool.query(query, [id]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};
