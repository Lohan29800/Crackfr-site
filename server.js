const express = require('express');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config(); // Charge les variables du fichier .env

const app = express();

// Middleware pour analyser le JSON et les données de formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques de ton projet (index.html, etc.)
app.use(express.static(path.join(__dirname)));

// Connexion sécurisée à Neon PostgreSQL via la variable d'environnement
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Requis pour les connexions cloud sécurisées comme Neon
});

// Initialisation des tables pour les membres et les annonces au démarrage
async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS linked_users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                role VARCHAR(100) NOT NULL
            );
            CREATE TABLE IF NOT EXISTS announcements (
                id SERIAL PRIMARY KEY,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Connecté à Neon PostgreSQL et tables prêtes !");
    } catch (err) {
        console.error("Erreur lors de l'initialisation de la base de données :", err);
    }
}
initDB();

// --- ROUTES API : MEMBRES LIÉS ---

app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM linked_users ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error("Erreur GET /api/users :", err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    const { name, role } = req.body;
    if (!name || !role) {
        return res.status(400).json({ error: "Le nom et le rôle sont obligatoires." });
    }
    try {
        const result = await pool.query(
            'INSERT INTO linked_users (name, role) VALUES ($1, $2) RETURNING *',
            [name, role]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Erreur POST /api/users :", err);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM linked_users WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (err) {
        console.error("Erreur DELETE /api/users :", err);
        res.status(500).json({ error: err.message });
    }
});

// --- ROUTES API : ANNONCES OFFICIELLES ---

app.get('/api/announcements', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM announcements ORDER BY id DESC LIMIT 5');
        res.json(result.rows);
    } catch (err) {
        console.error("Erreur GET /api/announcements :", err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/announcements', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Le message est obligatoire." });
    }
    try {
        const result = await pool.query(
            'INSERT INTO announcements (message) VALUES ($1) RETURNING *',
            [message]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Erreur POST /api/announcements :", err);
        res.status(500).json({ error: err.message });
    }
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré et en écoute sur le port ${PORT}`);
});
