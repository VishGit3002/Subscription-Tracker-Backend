import express from "express";
import { PORT } from './config/env.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import connectToDatabase from "./database/mongoDb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

// Initialize app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);

app.use(errorMiddleware);

// Default Route
app.get('/', (req, res) => res.send("Welcome to the Subscription Tracker API"));

// Server
app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    await connectToDatabase();
});