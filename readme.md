# 🛍️ API E-Commerce — Node.js / Express / MongoDB

## 🚀 Description
Cette API e-commerce permet de gérer :
- des **utilisateurs** (authentification JWT, rôles admin/user)
- des **produits**
- des **commandes (orders)**
- des **wishlists (favoris)**
- et l’**upload d’images de profil utilisateur**

Le backend est construit avec **Express** et **MongoDB (Mongoose)**.

---

## 🧩 Stack technique
- **Node.js** + **Express**
- **MongoDB Atlas** + **Mongoose**
- **bcrypt** → hashage des mots de passe
- **jsonwebtoken** → authentification par token
- **dotenv** → variables d'environnement
- **multer** → upload de fichiers (images)
- **cors**, **nodemon** → confort dev

---

## ⚙️ Installation

```bash
# 1. Cloner le projet
git clone https://github.com/<user>/ecommerce-api.git
cd ecommerce-api

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d’environnement
touch .env
