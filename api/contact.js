// Example API endpoint: POST /api/contact
// Handles contact form submissions
import { sql } from "@vercel/postgres";

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    console.log(name,email,message);
    
    // TODO: Save to database
    await sql.query(
    'INSERT INTO portfolio.messages (name, email, message) VALUES ($1, $2, $3)',
    [name, email, message]
    );

    // TODO: Send email notification
    // await sendEmail({
    //   to: 'your-email@example.com',
    //   subject: `New portfolio contact: ${name}`,
    //   body: message
    // });

    res.status(200).json({
      success: true,
      message: 'Message received! I\'ll get back to you soon.',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
};
