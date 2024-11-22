# book review project

A modern full-stack application built with **React**, **Node.js**, **PostgreSQL**, and **Cloudinary**. This project includes a backend server, a frontend client, and utilizes Prisma for database management.

---

## 🛠️ Prerequisites

Ensure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Cloudinary](https://cloudinary.com/) account

---

## ⚙️ Environment Setup

1. Create a `.env` file in the **root directory** and add the following variables:

   \`\`\`env
   PORT=
   DATABASE_URL=
   JWT_SECRET=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   \`\`\`

---

## 🚀 How to Run the Project

### 1. Install Dependencies

First, install all the required dependencies.

- **In the server directory**:
  \`\`\`bash
  cd server
  npm install
  npx prisma generate
  \`\`\`

- **In the client directory**:
  \`\`\`bash
  cd client
  npm install
  \`\`\`

### 2. Start the Project

This project requires two terminals to run simultaneously:

- **Terminal 1: Run the backend server**

  Navigate to the root directory and start the server:
  \`\`\`bash
  npm run dev
  \`\`\`

- **Terminal 2: Run the frontend client**

  Navigate to the client directory and start the client:
  \`\`\`bash
  cd client
  npm run dev
  \`\`\`

The server will start at \`http://localhost:3000\`, and the frontend will typically run on \`http://localhost:5173\` (default Vite dev server port).

---

## 🏗️ Building the Project

To build the project for production:

1. Run the following command in the **root directory**:
   \`\`\`bash
   npm run build
   \`\`\`

2. This will:
   - Install dependencies for the server
   - Generate Prisma files
   - Install dependencies for the client
   - Build the client for production

---

## 📂 Project Structure

\`\`\`
/client # Frontend React application
/server # Backend Node.js application
package.json # Root package.json with scripts and dependencies
\`\`\`

---

## 🧑‍💻 Scripts

Here are the key npm scripts for development:

- **Root**

  - \`npm run dev\`: Starts the backend server with \`nodemon\`.
  - \`npm run build\`: Builds the entire project (client + server).

- **Server**

  - \`npm run dev\`: Starts the backend server with \`nodemon\`.
  - \`npm run generate\`: Runs Prisma to generate files.

- **Client**
  - \`npm run dev\`: Starts the frontend React application.

---

## 🌐 Technologies Used

- **Frontend**: React, Vite, redux, react router dom
- **Backend**: Node.js, Express
- **Database**: PostgreSQL, Prisma,neon db
- **Image Hosting**: Cloudinary
- **Authentication**: JWT

---
