# Backend API

Node.js + Express + TypeScript Backend for proj_02

## Features

- Express.js REST API
- TypeScript for type safety
- MongoDB integration (optional)
- JWT authentication
- Security with Helmet
- CORS enabled
- Request logging with Morgan
- Error handling middleware

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/proj_02
JWT_SECRET=your_secret_key
```

## Scripts

```bash
npm run dev      # Start development server with auto-reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled server
npm test         # Run tests
```

## Project Structure

```
src/
├── server.ts           # Main Express app
├── middleware/         # Custom middleware
│   ├── auth.ts        # JWT authentication
│   └── errorHandler.ts # Error handling
├── routes/            # API routes
│   └── index.ts       # Main routes
├── config/            # Configuration
│   └── db.ts          # MongoDB connection
└── models/            # MongoDB models (optional)
```

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product

### Auth
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

## Development

Start the development server with auto-reload:

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## Building for Production

```bash
npm run build
npm start
```

## License

ISC
