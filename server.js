const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connexion à la base de données Neon PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// 1. Récupérer les réglages du portail
app.get('/api/settings', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM portal_settings');
        const settings = {};
        result.rows.forEach(row => { settings[row.key] = row.value; });
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Sauvegarder les réglages du portail
app.post('/api/settings', async (req, res) => {
    const settings = req.body;
    try {
        for (const [key, value] of Object.entries(settings)) {
            await pool.query(
                `INSERT INTO portal_settings (key, value) VALUES ($1, $2) 
                 ON CONFLICT (key) DO UPDATE SET value = $2`,
                [key, value]
            );
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Récupérer les Logs EC
app.get('/api/logs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ec_logs ORDER BY id DESC LIMIT 50');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Ajouter un Log EC
app.post('/api/logs', async (req, res) => {
    const { timestamp, action } = req.body;
    try {
        await pool.query('INSERT INTO ec_logs (timestamp, action) VALUES ($1, $2)', [timestamp, action]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Effacer les Logs EC
app.delete('/api/logs', async (req, res) => {
    try {
        await pool.query('DELETE FROM ec_logs');
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
