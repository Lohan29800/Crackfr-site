# ⚡ CrackFR — Hub Communautaire & Projets

[![GitHub Pages Status](https://img.shields.io/badge/GitHub%20Pages-Online-emerald?style=for-the-badge&logo=github)](https://github.com)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20TailwindCSS%20%7C%20JS-blueviolet?style=for-the-badge)](https://tailwindcss.com)

Bienvenue sur le dépôt officiel du **Hub Communautaire CrackFR** ! Ce projet regroupe une interface web moderne au design cyberpunk/néon, un système de panel administrateur interconnecté, des statuts de serveurs en direct et un mur de discussion persistant.

---

## 🚀 Fonctionnalités Principales

* **🎨 Interface Cyberpunk Moderne :** Design sombre avec effets néons (`cyan`, `purple`, `pink`), typographie soignée, animations de particules fluides sur canvas HTML5 et composants responsives construits avec **Tailwind CSS**.
* **🔐 Panel Administrateur (`panel.html`) :** Un tableau de bord complet permettant de :
  * Changer le mode du site (Actif / Maintenance).
  * Modifier en temps réel le statut des services et bots (Opérationnel, En Ligne, Maintenance, Hors Ligne).
  * Envoyer des alertes globales (Toasts) à tous les visiteurs connectés en direct.
  * Réinitialiser ou purger le mur des visiteurs.
* **💬 Mur des Visiteurs (Live Global) :** Espace de discussion interactif et persistant géré via le `localStorage` du navigateur.
* **🟢 Compteur de Présence Temps Réel :** Suivi dynamique des utilisateurs actifs en ligne sur le site.
* **🛡️ Redirection de Maintenance :** Basculement automatique vers une page de maintenance dédiée si le mode admin l'active.

---

## 📂 Structure du Projet

```text
├── index.html        # Page d'accueil principale du Hub
├── panel.html        # Tableau de bord administrateur sécurisé
├── maintenance.html  # Page affichée en cas de maintenance du site
└── README.md         # Documentation du projet
