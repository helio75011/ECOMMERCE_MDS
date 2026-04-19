## 🛍️ API E-Commerce — Node.js / Express / MongoDB

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
- **swagger-ui-express** + **yaml** → documentation API interactive (Swagger)
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

```

## 🐳 Démarrer avec Docker

### Prérequis
- Docker Desktop installé et démarré
- Fichier `/.env.docker` présent à la racine (fourni)

### Lancer les services
```powershell
# À la racine du projet
docker compose up -d --build

# Vérifier l'état des conteneurs
docker compose ps

```

### URLs utiles
- Frontend: `http://localhost:5173`
- API: `http://localhost:4612`
- Swagger: `http://localhost:4612/api-docs`
- MongoDB: `localhost:27017` (conteneur `mongo`)

### Logs
```powershell
│   ├── User.js
docker compose logs -f api
# Frontend
docker compose logs -f front
# MongoDB
docker compose logs -f mongodb
```

### Arrêt et nettoyage
```powershell
│   ├── Product.js
docker compose down
# Arrêter et supprimer les volumes (données Mongo)
docker compose down -v
```

### Variables d'environnement
- L'API charge `/.env.docker`. Par défaut `MONGO_URI` pointe vers MongoDB Atlas.
- Pour utiliser le MongoDB du compose, remplacez dans `/.env.docker`:
	- `MONGO_URI=mongodb://mongo:27017/ecommerce`
	- puis relancez: `docker compose up -d --build`
- Frontend: la variable `VITE_API_URI` est définie dans `docker-compose.yml`.
	- Si l'API n'est pas en HTTPS, utilisez `http://localhost:4612/api/`.

### Développement
- Front: hot reload actif via le volume `./frontend:/usr/src/app`.
- API: le conteneur tourne avec `nodemon`, mais sans volume hôte → pour refléter vos changements, reconstruisez l'image ou ajoutez un volume de dev si nécessaire.

---

## 🧩 Stack technique
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

---

## 📦 Produits (Products)

| Méthode  | Route                     | Description                         | Auth    |
| -------- | ------------------------- | ----------------------------------- | ------- |
| `GET`    | `/api/products/`          | Voir tous les produits              | ❌       |
| `POST`   | `/api/products/`          | Créer un produit                    | ✅ admin |
| `PATCH`  | `/api/products/:id`       | Modifier un produit                 | ✅ admin |
| `DELETE` | `/api/products/:id`       | Supprimer un produit                | ✅ admin |
| `POST`   | `/api/products/:id/image` | Upload d’image produit (via Multer) | ✅ admin |

---

## 🛒 Commandes (Orders)

| Méthode | Route         | Description                                  | Auth |
| ------- | ------------- | -------------------------------------------- | ---- |
| `GET`   | `/api/orders` | Voir les commandes de l’utilisateur connecté | ✅    |
| `POST`  | `/api/orders` | Créer une nouvelle commande                  | ✅    |

---

## 💖 Wishlist (Favoris)

| Méthode  | Route            | Description                   | Auth |
| -------- | ---------------- | ----------------------------- | ---- |
| `GET`    | `/api/wishlists` | Voir la wishlist              | ✅    |
| `POST`   | `/api/wishlists` | Ajouter un produit à la liste | ✅    |
| `DELETE` | `/api/wishlists` | Supprimer la wishlist         | ✅    |
