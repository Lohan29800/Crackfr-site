# ⚡ CrackFR - Hub Communautaire & Serveur Discord

Bienvenue sur le dépôt officiel du site web et du panneau de contrôle de la communauté **CrackFR**. Ce projet offre une vitrine moderne, interactive et entièrement administrable pour le serveur Discord.

---

## 🚀 Fonctionnalités du Projet

### 🌐 1. Site Vitrine Principal (`index.html`)
* **Accueil & Présentation :** Hero section dynamique avec compteur de membres en ligne en temps réel et bouton d'invitation direct vers le serveur Discord.
* **Rubriques complètes :** Sections **À propos**, **FAQ (Foire Aux Questions)** et **Blog / Actualités** pour tenir la communauté informée.
* **Espace de Discussions interactif :** Un fil de discussion intégré où les visiteurs peuvent poster et partager des messages directement depuis le navigateur.
* **Mode Maintenance Intelligent :** Redirection automatique vers une page de maintenance si le mode est activé depuis l'admin.

### 🔐 2. Panneau d'Administration (`panel.html`)
* **Sécurité :** Espace protégé par identifiant et mot de passe administrateur.
* **Tableau de bord statistique :** Suivi en temps réel des passages (visites du jour, visites totales), du nombre de personnes bloquées/redirigées en maintenance et du compteur d'erreurs capturées.
* **Configuration dynamique :** Modification en direct du mode du site, du nombre de membres affichés et activation/personnalisation du bandeau de notification d'accueil.
* **Éditeur de code JSON :** Un éditeur intégré permettant de visualiser et copier rapidement la configuration pour la mettre à jour.

---

## 📂 Structure des Fichiers

```text
├── index.html       # Page d'accueil, sections vitrine et fil de discussion
├── panel.html       # Panneau d'administration sécurisé et statistiques
├── maintenance.html # Page affichée en cas de maintenance du site
└── data.json        # Fichier de configuration central (mode, membres, alertes)
