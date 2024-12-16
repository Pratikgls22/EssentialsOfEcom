import React from 'react';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <style>
        {`
          /* Global Styles */
          body {
            margin: 0;
            font-family: 'Roboto', sans-serif;
            background-color: #f8f8f8;
          }

          .landing-page {
            text-align: center;
            padding: 0 20px;
          }

          /* Header */
          .landing-header {
            background-color: #ff6347;
            color: white;
            padding: 80px 20px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          }

          .landing-header h1 {
            font-size: 3.5em;
            margin: 0;
            font-weight: bold;
          }

          .landing-header p {
            font-size: 1.2em;
            margin-top: 10px;
            font-weight: 300;
          }

          .cta-button {
            padding: 15px 40px;
            background-color: #ff5722;
            color: white;
            border: none;
            font-size: 1.5em;
            margin-top: 30px;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.3s ease-in-out;
          }

          .cta-button:hover {
            background-color: #e64a19;
          }

          /* Categories Section */
          .categories {
            display: flex;
            justify-content: space-around;
            margin-top: 50px;
            text-align: center;
          }

          .category {
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            width: 25%;
          }

          .category h3 {
            font-size: 1.8em;
            color: #ff6347;
            margin-bottom: 10px;
          }

          .category img {
            width: 100%;
            height: auto;
            border-radius: 4px;
          }

          /* Featured Products Section */
          .featured-products {
            background-color: #fff;
            padding: 50px 0;
            margin-top: 50px;
          }

          .featured-products h2 {
            font-size: 2.5em;
            color: #333;
            margin-bottom: 30px;
          }

          .product-list {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
          }

          .product-card {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            width: 250px;
            text-align: center;
            transition: transform 0.3s ease;
          }

          .product-card:hover {
            transform: translateY(-10px);
          }

          .product-card img {
            width: 100%;
            height: auto;
            border-radius: 4px;
          }

          .product-card h3 {
            font-size: 1.8em;
            margin-top: 10px;
            color: #333;
          }

          .product-card p {
            font-size: 1.2em;
            margin: 10px 0;
            color: #777;
          }

          .product-card .price {
            font-size: 1.4em;
            font-weight: bold;
            color: #ff5722;
          }

          /* Footer */
          .landing-footer {
            background-color: #333;
            color: white;
            padding: 20px;
            margin-top: 50px;
          }

          .footer-links {
            display: flex;
            justify-content: center;
            gap: 40px;
          }

          .footer-links a {
            color: white;
            text-decoration: none;
            font-size: 1.2em;
            transition: color 0.3s;
          }

          .footer-links a:hover {
            color: #ff5722;
          }
        `}
      </style>

      <header className="landing-header">
        <h1>Welcome to Our E-commerce Store</h1>
        <p>Your one-stop destination for quality products</p>
        <button className="cta-button">Shop Now</button>
      </header>

      <section className="categories">
        <div className="category">
          <h3>Samsung</h3>
          {/* Replace with actual image */}
          <img src="https://via.placeholder.com/250x200?text=Electronics" alt="Samsung" />
        </div>
        <div className="category">
          <h3>Apple</h3>
          {/* Replace with actual image */}
          <img src="https://via.placeholder.com/250x200?text=Fashion" alt="Apple" />
        </div>
        <div className="category">
          <h3>Nokia</h3>
          {/* Replace with actual image */}
          <img src="https://via.placeholder.com/250x200?text=Home+Decor" alt="Nokia" />
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-list">
          <div className="product-card">
            <img src="https://via.placeholder.com/250x200?text=Product+1" alt="Product 1" />
            <h3>Product 1</h3>
            <p>High-quality item for everyday use</p>
            <div className="price">$99.99</div>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/250x200?text=Product+2" alt="Product 2" />
            <h3>Product 2</h3>
            <p>Stylish and affordable</p>
            <div className="price">$49.99</div>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/250x200?text=Product+3" alt="Product 3" />
            <h3>Product 3</h3>
            <p>Comfort and luxury combined</p>
            <div className="price">$129.99</div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-links">
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
        <p>&copy; 2024 Your E-commerce Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
