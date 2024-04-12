import express from 'express';
import { createPool } from 'mysql';

const app = express();
const port = 3600;


const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'website_test',
  connectionLimit: 10 
});


app.post('/api/totalMiles', async (req, res) => {
  const { startDate, endDate } = req.body;
  try {
    const query = `
      SELECT SUM(\`Miles Driven\`) AS totalMiles
      FROM mytable
      WHERE \`Date\` BETWEEN ? AND ?;
    `;
    pool.query(query, [startDate, endDate], (error, results) => {
      if (error) {
        console.error('Error fetching total miles:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      res.json(results[0]);
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.post('/api/dailyMiles', async (req, res) => {
  const { startDate, endDate } = req.body;
  try {
    const query = `
      SELECT DATE(\`Date\`) AS date, SUM(\`Miles Driven\`) AS totalMiles
      FROM mytable
      WHERE \`Date\` BETWEEN ? AND ?
      GROUP BY DATE(\`Date\`);
    `;
    pool.query(query, [startDate, endDate], (error, results) => {
      if (error) {
        console.error('Error fetching daily miles:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.post('/api/customReport', async (req, res) => {
  const { frequency, startDate, endDate } = req.body;
  let dateFilter = '';
  
  switch (frequency) {
    case 'Daily':
      dateFilter = 'DATE(\`Date\`)';
      break;
    case 'Weekly':
      dateFilter = 'TO_CHAR(\`Date\`, \'IYYY-IW\')';
      break;
    case 'Monthly':
      dateFilter = 'TO_CHAR(\`Date\`, \'YYYY-MM\')';
      break;
    case 'Yearly':
      dateFilter = 'EXTRACT(YEAR FROM \`Date\`)';
      break;
    default:
      return res.status(400).json({ message: 'Invalid frequency' });
  }

  try {
    const query = `
      SELECT ${dateFilter} AS timeframe, SUM(\`Miles Driven\`) AS totalMiles
      FROM mytable
      WHERE \`Date\` BETWEEN ? AND ?
      GROUP BY ${dateFilter};
    `;
    pool.query(query, [startDate, endDate], (error, results) => {
      if (error) {
        console.error('Error fetching custom report data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
