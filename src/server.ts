import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import vmRoutes from './routes/vm.routes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const PORT = process.env.PORT || 4000;

app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

const io = new Server(server, {
    cors: {
        origin: FRONTEND_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

app.set('io', io);

io.on('connection', (socket) => {
    socket.on('disconnect', () => { });
});

app.use('/api/auth', authRoutes);
app.use('/api/vms', vmRoutes);

app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

server.listen(PORT, () => {
    console.log(`Backend Server iniciado en el puerto ${PORT}`);
});