# 🛍️ API E-Commerce — Node.js / Express / MongoDB

## 🚀 Description
Cette API e-commerce permet de gérer :
- des **utilisateurs** (authentification JWT, rôles admin/user)
- des **produits**
- des **commandes (orders)**
- des **wishlists (favoris)**
- l’**upload d’images de profil utilisateur**
- et l’**upload d’images produits (admin uniquement)**

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
```

---

## Exemple de .env

```
PORT=4612
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ecommerce
JWT_SECRET=ton_secret_jwt
JWT_EXPIRES_IN=1h
```

---

## 🧱 Structure du projet

```
📦 ecommerce/
├── controllers/
│   ├── userController.js
│   ├── productController.js
│   ├── orderController.js
│   └── wishlistController.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Wishlist.js
│
├── middlewares/
│   ├── verifyToken.js
│   ├── requireRole.js
│   └── upload.js
│
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   └── wishlistRoutes.js
│
├── uploads/ ← images de profil stockées ici
├── .env
├── index.js
└── package.json
```

---

## 👤 Utilisateurs (Users)
### 🔹 Endpoints principaux

| Méthode  | Route                    | Description                         | Auth    |
| -------- | ------------------------ | ----------------------------------- | ------- |
| `POST`   | `/api/users/`            | Créer un utilisateur                | ❌       |
| `POST`   | `/api/users/login`       | Connexion (JWT)                     | ❌       |
| `GET`    | `/api/users/`            | Voir tous les utilisateurs          | ✅ admin |
| `GET`    | `/api/users/:id`         | Voir un utilisateur par ID          | ✅       |
| `PATCH`  | `/api/users/:id`         | Modifier un utilisateur             | ✅       |
| `PATCH`  | `/api/users/profile-pic` | Upload / modifier l’image de profil | ✅       |
| `DELETE` | `/api/users/:id`         | Supprimer un utilisateur            | ✅       |
