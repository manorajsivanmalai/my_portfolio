// Example API endpoint: GET /api/experiences
import { sql } from '@vercel/postgres'


export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // TODO: Replace with actual database query
    const experiences = await sql.query('SELECT * FROM portfolio.experiences');

    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
    res.status(200).json(experiences.rows);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
};
