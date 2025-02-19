# Shopify Cashback Application

This is a Shopify Cashback Application built with **React.js**, **Node.js**, and **MySQL**.


## 🛠️ Setup Instructions

### 📥 Clone the Repository
```bash
git clone https://github.com/AlfinAkash/Shopify.git
cd Shopify
```

---

## 🚀 Frontend Setup
```bash
cd frontend
npm install
npm start
```


---

## 🔧 Backend Setup
```bash
cd backend
npm install
npm run dev
```


---

## 🗄️ Database Setup (MySQL)
1. Create a MySQL database:
```sql
CREATE DATABASE shopify_cashback;
```
2. Import the SQL schema (if available):
```bash
mysql -u your_username -p shopify_cashback < database/schema.sql
```
3. Update your `.env` file with database credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=shopify_cashback
```

---

## 🔌 API Routes
### 🔑 Authentication
- `POST /api/auth/signup` - User Signup
- `POST /api/auth/login` - User Login

### 🛍️ Products
- `GET /api/products` - Fetch all products
- `POST /api/products` - Add a new product

### 💰 Payments
- `POST /api/payments` - Process a payment

---

## 🌍 Deployment
### 📦 Frontend Deployment
```bash
npm run build
```
Upload the `build` folder to **Vercel** or **Netlify**.

### 🔥 Backend Deployment
Use **Railway.app**, **Render**, or **AWS** for backend deployment.

---

## 🤝 Contributing
Feel free to contribute! Create a pull request or report issues.

---

## 📜 License
MIT License

---

🚀 **Developed by [AlfinAkash](https://github.com/AlfinAkash)**
