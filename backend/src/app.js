import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { router as userRoutes } from './routes/user.routes.js';
import { router as eventRoutes } from './routes/event.routes.js';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], 
}))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

// api routes


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/event', eventRoutes);

// routes declaration
export default app;
