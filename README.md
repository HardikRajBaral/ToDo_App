# ToDo List API

A RESTful API for managing todo tasks with user authentication. Built with Express.js, TypeScript, and MongoDB.

## 📋 Project Roadmap

This project is based on the [Todo List API Roadmap](https://roadmap.sh/projects/todo-list-api) from roadmap.sh. Follow this roadmap to understand the project structure and implementation details.

## 🚀 Features

- User authentication with JWT (JSON Web Tokens)
- Secure password hashing with bcrypt
- Todo CRUD operations
- User management
- Middleware-based request handling
- MongoDB database integration

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Development**: nodemon, ts-node

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## ⚙️ Installation & Setup

### 1. Clone or Navigate to the Project

```bash
cd ToDo_App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/todo-app

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=7d
```

### 4. Database Setup

Ensure MongoDB is running:

```bash
# For local MongoDB
mongod
```

Or use MongoDB Atlas for cloud database.

## 🚀 Running the Project

### Development Mode

```bash
npm run dev
```

This will start the server with hot-reload enabled using nodemon.

### Production Mode

Build the TypeScript:

```bash
npx tsc
```

Then run the compiled JavaScript:

```bash
node server.js
```

## 📁 Project Structure

```
todo-app/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts              # Server entry point
│   ├── config/
│   │   ├── config.ts          # Configuration settings
│   │   └── db.ts              # Database connection
│   ├── middleware/
│   │   ├── Authenticate.ts    # JWT authentication middleware
│   │   ├── globalmiddleware.ts # Global middleware setup
│   │   └── routerMiddleware.ts # Router-specific middleware
│   ├── user/
│   │   ├── userController.ts  # User business logic
│   │   ├── userModel.ts       # User schema/model
│   │   └── userRouter.ts      # User routes
│   └── todo/
│       ├── todoController.ts  # Todo business logic
│       ├── todoModel.ts       # Todo schema/model
│       └── todoRouter.ts      # Todo routes
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🔌 API Endpoints

### User Routes

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (requires authentication)
- `PUT /api/users/profile` - Update user profile (requires authentication)
- `DELETE /api/users/profile` - Delete user account (requires authentication)

### Todo Routes

- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## 🔐 Authentication

The API uses JWT for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🧪 Development Workflow

1. **Make changes** to TypeScript files in the `src/` directory
2. **nodemon** automatically recompiles and restarts the server
3. **Test endpoints** using Postman, Insomnia, or curl

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot-reload |

## 🤝 Contributing

To contribute to this project:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

ISC License - See LICENSE file for details

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Documentation](https://jwt.io/)
- [Roadmap.sh - Todo List API](https://roadmap.sh/projects/todo-list-api)

## 🆘 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify network access if using MongoDB Atlas

### Port Already in Use
- Change the PORT in .env file
- Or kill the process using the port

### TypeScript Errors
- Run `npm install` to ensure all types are installed
- Check tsconfig.json for compiler options

---

**Last Updated**: May 2026
