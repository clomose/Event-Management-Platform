import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { router as userRoutes } from './routes/user.routes.js';
import { router as eventRoutes } from './routes/event.routes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const server = createServer(app);


const io = new Server(server,{
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["*"], 

    },
});

app.set('io', io);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

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
export { app, server, io };
