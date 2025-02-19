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
CREATE DATABASE shopify;
```

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isVerified BOOLEAN DEFAULT FALSE
);
```

```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```sql
INSERT INTO products (id, name, description, price, stock) VALUES
(1, 'Smartphone', 'Latest 5G smartphone with high-resolution camera', 14999.99, 50),
(5, 'Laptop', 'Powerful laptop with Intel i7 processor and 16GB RAM', 59999.99, 30),
(6, 'Headphones', 'Wireless Bluetooth headphones with noise cancellation', 1999.99, 100),
(7, 'Smartwatch', 'Feature-rich smartwatch with heart rate monitor', 4999.99, 40),
(8, 'Tablet', '10-inch tablet with high-resolution display and 128GB storage', 24999.99, 25),
(9, 'Gaming Console', 'Next-gen gaming console with ultra-fast loading', 39999.99, 15),
(10, 'Wireless Speaker', 'Portable speaker with deep bass and long battery life', 2999.99, 80),
(11, 'Monitor', '24-inch Full HD monitor with high refresh rate', 12999.99, 20),
(12, 'Keyboard & Mouse Combo', 'Ergonomic keyboard and mouse combo with RGB lighting', 1999.99, 70),
(13, 'External Hard Drive', '1TB external HDD for data storage and backup', 6999.99, 60);
```

```sql
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending'
);
```

```sql
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1
);
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
