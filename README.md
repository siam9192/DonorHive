# 🌍 Donation Campaign Website

A web platform designed to raise awareness and gather donations for important social, environmental, and humanitarian causes.

## 📌 Overview

This website allows :
- Launch and manage donation campaigns
- Accept contributions securely
- Track fundraising progress
- Raise awareness through stories, images, and progress updates

## 💡 Features

- 🔒 **Secure Authentication & Authorization**  
  Supports user login via email/password and Google OAuth.

- ✅ **Campaign Creation & Management**  
  Admin can create, edit, and manage donation campaigns with ease.

- 💳 **Secure Donation Processing**  
  Integrated with Stripe or SSLCommerze for fast, reliable transactions.

- 🕵️ **Guest & Anonymous Donations**  
  Allows visitors to contribute without creating an account or revealing identity.

- 🧾 **Downloadable Donation Receipts**  
  Donors can easily download receipts for their contributions.

- 🔔 **Donor Notifications & Email Acknowledgments**  
  Automated alerts and thank-you messages via email and in-app notifications.

- 📱 **Responsive Design**  
  Fully optimized for mobile, tablet, and desktop devices for a seamless user experience.
## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| Frontend   | React |
| Backend    | Express js |
| Database   | MongoDB |
| Payment    | Stripe | SSLCommerze |


## 🚀 Getting Started

### Prerequisites

- Node.js and npm/yarn installed
- MongoDB setup (locally or cloud-based)
- Stripe/SSLCommerze API keys (for payment functionality)

### Project Installation 

```bash
git clone https://github.com/your-username/donation-campaign-website.git
npm install
```
### How to run backend ?

``bash 
cd backend
npm install
``
- Create a .env file inside the backend/ folder (not the project root unless specified).
- Copy the variables from .env.local (if provided) and paste them into your .env file.
- Set appropriate values for each environment variable 

### 🔧 Start the Backend Server

``bash 
npm run dev
# or
yarn dev
``
Once the command runs successfully, backend server should be up and running (typically on http://localhost:5000 or whichever port is set in .env).


### How to run client

``bash 
cd backend
npm install
``

### 🔧 Start the client Server

``bash 
npm run dev
# or
yarn dev
``

Once the command runs successfully, client server should be up and running (typically on http://localhost:5173 or whichever  port  is free).








