RetailPulse 🛒📊


RetailPulse is a robust full-stack web application designed to optimize pantry management and drive revenue acceleration for small-to-medium retail businesses. By leveraging the MERN stack, the platform bridges the gap between real-time inventory tracking and actionable financial analytics, minimizing waste while maximizing profitability.
 vercel link - https://retail-pulse-eta.vercel.app
🚀 Features
📦 Smart Pantry & Inventory Management
Real-Time Stock Tracking: Dynamic monitoring of inventory levels with automated low-stock indicators.

Waste Reduction Analytics: Expiry date tracking and predictive alerts to minimize perishable losses.

Automated Reordering Logic: Algorithmic suggestions for optimal restocking quantities based on historical velocity.

💰 Revenue Management & Insights
Sales Velocity Tracking: Visual dashboards capturing daily, weekly, and monthly revenue metrics.

Profit Margin Analysis: Breakdown of cost vs. retail price to pinpoint high-yield inventory items.

Demand Forecasting: Data-driven insights helping business owners align purchasing patterns with consumer trends.

🔒 Enterprise-Grade Architecture
Secure Authentication: JWT-based user authorization with role-based access control.

Responsive UI: A clean, professional, and accessible dashboard built with Tailwind CSS.

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS, Context API / Redux Toolkit

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JSON Web Tokens (JWT) & bcrypt

📐 System Architecture
[ Client / React.js ] ──( HTTP / REST API )──> [ Backend / Express.js & Node.js ]
         │                                                      │
(Tailwind CSS UI)                                      (Mongoose ODM)
         │                                                      │
         ▼                                                      ▼
   [ User Dashboard ]                                    [ MongoDB Cloud Atlas ]
⚙️ Installation & Setup
Prerequisites
Node.js (v18+ recommended)

MongoDB Atlas account or a local MongoDB instance

1. Clone the Repository
Bash
git clone https://github.com/your-username/retailpulse.git
cd retailpulse
2. Backend Setup
Navigate to the server directory:

Bash
cd server
Install dependencies:

Bash
npm install
Create a .env file in the root of the server directory and add the following:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the development server:

Bash
npm run dev
3. Frontend Setup
Navigate to the client directory:

Bash
cd ../client
Install dependencies:

Bash
npm install
Start the React application:

Bash
npm start
📈 Business Impact & Value Proposition
As a project built at the intersection of Software Engineering and Business Analysis, RetailPulse addresses critical operational pain points:

Capital Efficiency: Reduces tied-up capital in overstocked inventory by aligning pantry levels with actual consumer demand.

Data-Driven Decisons: Empowers small business owners with the same analytical clarity utilized by enterprise-level retail chains.

Operational Velocity: Speeds up the daily audit process from hours to a few automated clicks.

👥 Authors & Contribution
Aditi Verma – Full-Stack Developer & Business Analyst (Architecture, Backend APIs, Database Design, UX Research)

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
