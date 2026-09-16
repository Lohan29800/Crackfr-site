const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();

// Middleware pour analyser le JSON et les données de formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques de ton projet (index.html, etc.)
app.use(express.static(path.join(__dirname)));

// Connexion à ta base de données Neon PostgreSQL
const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_gdoy8h1Hzqcs@ep-mute-snow-zaj1bbca-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
});

// Initialisation de la table pour les membres liés au démarrage du serveur
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
        console.error("Erreur lors de l'initialisation de la base de données :", err);
    }
}
initDB();

// --- ROUTES API POUR LE PANEL ADMIN ET LE SITE ---

// 1. Récupérer la liste de tous les membres liés
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM linked_users ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error("Erreur GET /api/users :", err);
        res.status(500).json({ error: err.message });
    }
});

// 2. Ajouter un nouveau membre lié depuis le panel admin
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

// 3. Supprimer un membre lié
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

// Lancement du serveur sur le port 3000 (ou celui de ton hébergeur)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré et en écoute sur le port ${PORT}`);
});
