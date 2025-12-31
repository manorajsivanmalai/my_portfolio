import { sql } from '@vercel/postgres';

export default async (req, res) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // TODO: Replace with actual database query
    const projects = await sql.query('SELECT * FROM portfolio.projects ORDER BY id');
    // Add cache headers for better performance
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.status(200).json(projects.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};
