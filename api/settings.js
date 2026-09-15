const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const result = await pool.query('SELECT * FROM portal_settings');
            const settings = {};
            result.rows.forEach(row => { settings[row.key] = row.value; });
            return res.status(200).json(settings);
        }

        if (req.method === 'POST') {
            const settings = req.body;
            for (const [key, value] of Object.entries(settings)) {
                await pool.query(
                    `INSERT INTO portal_settings (key, value) VALUES ($1, $2) 
                     ON CONFLICT (key) DO UPDATE SET value = $2`,
                    [key, value]
                );
            }
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Méthode non autorisée' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
