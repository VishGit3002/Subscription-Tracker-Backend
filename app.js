import express from "express";
import { PORT } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';

const app = express();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);

app.get('/', (req, res) => res.send("Welcome to the Subscription Tracker API"));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})