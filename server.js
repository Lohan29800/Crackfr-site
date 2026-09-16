const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir ton fichier index.html et tes assets statiques
app.use(express.static(path.join(__dirname)));

// Connexion à ta base de données Neon PostgreSQL
const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_gdoy8h1Hzqcs@ep-mute-snow-zaj1bbca-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
});

// Initialiser les tables de la base de données au démarrage
async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS linked_users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                role VARCHAR(100) NOT NULL
            );
        `);
        console.log("Connecté à Neon PostgreSQL et table 'linked_users' prête !");
    } catch (err) {
        console.error("Erreur de connexion à la base de données :", err);
    }
}
initDB();

// --- ROUTES API POUR TON PANEL ---

// Récupérer les membres liés
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM linked_users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ajouter un membre lié depuis le panel admin
app.post('/api/users', async (req, res) => {
    const { name, role } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO linked_users (name, role) VALUES ($1, $2) RETURNING *',
            [name, role]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Supprimer un membre lié
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM linked_users WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
