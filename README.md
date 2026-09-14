# ⚡ CrackFR - Portail Communautaire Gaming & Panel Admin

**CrackFR** est un site web moderne, léger et responsive conçu pour présenter une communauté de jeux vidéo et un serveur gaming. Il intègre un lecteur audio dynamique (lofi/chill) personnalisable et un panneau d'administration sécurisé permettant de gérer en temps réel les annonces du site et la playlist musicale.

---

## 🚀 Fonctionnalités Principales

### 🌐 Page d'Accueil (`index.html`)
* **Présentation Gaming :** Sections détaillées mettant en avant l'aspect multi-gaming, l'ambiance chill et l'équipe du serveur.
* **Bannière d'Annonce Dynamique :** Affiche en haut de page les messages et actualités importants publiés instantanément depuis le panel admin.
* **Lecteur Audio Intégré :** Un player discret et stylisé en haut de page permettant de diffuser de la musique en arrière-plan (lecture en boucle, support des liens directs MP3).
* **Design Moderne :** Interface sombre (Dark Mode) réalisée avec **Tailwind CSS**, fluide et adaptée à tous les types d'écrans (PC et mobile).

### 🛠️ Panneau d'Administration (`login.html`)
* **Sécurité Admin :** Espace de connexion protégé par identifiant et mot de passe.
* **Gestion des Annonces :** Permet de publier ou de retirer la bannière d'information affichée sur la page d'accueil en un clic.
* **Gestionnaire de Playlist Audio :** 
  * Ajout de musiques par lien direct (recommandé pour la stabilité).
  * Système de sélection de la piste active par défaut.
  * Suppression de pistes de la playlist.
* **Persistance des Données :** Utilise le stockage local du navigateur (`localStorage`) pour synchroniser les modifications entre la page d'administration et la page d'accueil instantanément.

---

## 📂 Structure du Projet

```text
/
├── index.html       # Page d'accueil du site (Présentation & Lecteur)
├── login.html       # Panel d'administration sécurisé
└── README.md        # Documentation du projet
