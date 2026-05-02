# 📝 MERN Blog Application

A full-stack blog application built with MongoDB, Express, React, and Node.js (MERN stack). Features include user authentication with JWT, full CRUD operations for blog posts, and a modern, responsive UI.

## 🚀 Features has added new from database

### Backend Features
- RESTful API built with Express.js
- MongoDB database with Mongoose ODM
- JWT-based authentication
- Password hashing with bcrypt
- Input validation with express-validator
- Protected routes for authenticated users
- CORS enabled for cross-origin requests

### Frontend Features
- React 18 with Vite for fast development
- React Router for navigation
- Context API for state management
- Axios for API calls
- Responsive design with modern CSS
- Loading states and error handling
- Private routes protection

### Core Functionality
- **User Authentication**
  - Register new account
  - Login with email and password
  - JWT token management
  - Persistent login sessions

- **Blog Management**
  - Create new blog posts
  - View all blog posts
  - View single blog post details
  - Edit your own blog posts
  - Delete your own blog posts
  - View your personal blog collection
  - Search functionality
  - Tag support

## 📁 Project Structure

```
exc1/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── blogController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Blog.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── blog.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── BlogCard.jsx
    │   │   ├── BlogCard.css
    │   │   ├── Navbar.jsx
    │   │   ├── Navbar.css
    │   │   └── PrivateRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Home.css
    │   │   ├── BlogDetails.jsx
    │   │   ├── BlogDetails.css
    │   │   ├── CreateBlog.jsx
    │   │   ├── EditBlog.jsx
    │   │   ├── BlogForm.css
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Auth.css
    │   │   ├── MyBlogs.jsx
    │   │   └── MyBlogs.css
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .gitignore
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🛠️ Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - Already installed locally
  - Running on: `localhost:27017`
  - Authentication: Disabled (default for local development)
- **npm** or **yarn** package manager (comes with Node.js)

## ⚙️ Installation & Setup

### 1. Clone or Navigate to the Project

```bash
cd /Users/developer/Ashish/Devops/practice/exc1
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start MongoDB (if not already running)
# On macOS with Homebrew:
brew services start mongodb-community

# Or run MongoDB manually:
mongod

# Start the backend server
npm run dev
```

The backend server will start on **http://localhost:8080**

### 3. Frontend Setup

Open a **new terminal window** and run:

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will start on **http://localhost:3000**

## 🎯 Usage

### Accessing the Application

1. Open your browser and navigate to: **http://localhost:3000**
2. You'll see the home page with all blog posts

### Creating an Account

1. Click on **"Sign Up"** in the navigation bar
2. Fill in the registration form:
   - Username (minimum 3 characters)
   - Email address
   - Password (minimum 6 characters)
   - Confirm password
3. Click **"Sign Up"** button
4. You'll be automatically logged in and redirected to the home page

### Logging In

1. Click on **"Login"** in the navigation bar
2. Enter your email and password
3. Click **"Login"** button

### Creating a Blog Post

1. Make sure you're logged in
2. Click on **"Create Blog"** in the navigation bar
3. Fill in the blog form:
   - **Title**: Your blog title (required)
   - **Excerpt**: A brief description (optional, auto-generated if empty)
   - **Content**: Your blog content (required)
   - **Tags**: Comma-separated tags (optional)
4. Click **"Create Blog"** button
5. You'll be redirected to the home page with your new blog

### Viewing Blogs

- **Home Page**: Shows all blog posts from all users
- **Search**: Use the search bar to find specific blogs
- **Blog Details**: Click on any blog title or "Read More" to view full content

### Managing Your Blogs

1. Click on **"My Blogs"** to see all your blog posts
2. From there you can:
   - **View**: See the full blog post
   - **Edit**: Modify your blog content
   - **Delete**: Remove the blog post (requires confirmation)

### Editing a Blog Post

1. Go to "My Blogs" or open one of your blog posts
2. Click the **"Edit"** button
3. Modify the content
4. Click **"Update Blog"** to save changes

### Deleting a Blog Post

1. Go to "My Blogs" or open one of your blog posts
2. Click the **"Delete"** button
3. Confirm the deletion in the popup dialog

## 🔐 Environment Variables

### Backend (.env)

The backend uses the following environment variables (already configured in `backend/.env`):

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

**Note**: For production, enable MongoDB authentication and update the connection string to:
```
MONGODB_URI=mongodb://username:password@host:port/database
```

**Important**: Change `JWT_SECRET` to a secure random string for production use.

## 📡 API Endpoints

### Authentication Routes

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/me` - Get current user (Protected)

### Blog Routes

- **GET** `/api/blogs` - Get all blogs (supports search query parameter)
- **GET** `/api/blogs/:id` - Get single blog by ID
- **GET** `/api/blogs/my-blogs` - Get current user's blogs (Protected)
- **POST** `/api/blogs` - Create new blog (Protected)
- **PUT** `/api/blogs/:id` - Update blog (Protected, author only)
- **DELETE** `/api/blogs/:id` - Delete blog (Protected, author only)

## 🎨 Features Breakdown

### Authentication
- Secure password hashing using bcryptjs
- JWT tokens with 7-day expiration
- Automatic token storage in localStorage
- Protected routes redirect to login if not authenticated

### Blog Posts
- Rich text content support
- Auto-generated excerpts
- Tag system for categorization
- Author attribution
- Timestamps (created and updated)
- Search functionality across title and content

### User Interface
- Modern, clean design
- Fully responsive (mobile, tablet, desktop)
- Loading states for async operations
- Error handling with user-friendly messages
- Smooth transitions and hover effects
- Intuitive navigation

## 🔧 Scripts

### Backend

```bash
npm start       # Start server in production mode
npm run dev     # Start server with nodemon (auto-reload)
```

### Frontend

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

If you see "MongoDB connection error":
1. Make sure MongoDB is running: `brew services list` (macOS)
2. Start MongoDB: `brew services start mongodb-community`
3. Check the connection string in `backend/.env`
4. For local development, use: `mongodb://localhost:27017/mern-blog` (no auth)
5. If using authentication, verify your credentials are correct

### Port Already in Use

If port 8080 or 3000 is already in use:
1. **Backend**: Change `PORT` in `backend/.env`
2. **Frontend**: Change `port` in `frontend/vite.config.js`

### CORS Issues

If you experience CORS errors:
1. Make sure the backend is running
2. Check that the proxy is configured in `frontend/vite.config.js`

### Authentication Not Working

1. Clear browser localStorage
2. Check if JWT_SECRET is set in backend `.env`
3. Verify the token is being sent in the Authorization header

## 🚀 Production Deployment

### Backend Deployment

1. Set environment variables on your hosting platform
2. Change `JWT_SECRET` to a secure random string
3. Update `MONGODB_URI` to your production MongoDB connection string
4. Set `NODE_ENV=production`
5. Run `npm start`

### Frontend Deployment

1. Update API base URL in `frontend/src/services/api.js`
2. Run `npm run build`
3. Deploy the `dist` folder to your hosting platform

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built with ❤️ using the MERN stack

## 🙏 Acknowledgments

- React Team for React and Vite
- Express.js community
- MongoDB team
- All open-source contributors

---

**Happy Blogging! 🎉**
