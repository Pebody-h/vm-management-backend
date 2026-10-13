import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { USERS } from '../store/data.store.js';
import { AuthRequest } from '../types/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'ifx_secret_key_2026_super_secure';

export const login = (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = USERS.find((u) => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, name: user.name },
        JWT_SECRET,
        { expiresIn: '8h' }
    );

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 8 * 60 * 60 * 1000
    });

    return res.json({
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }
    });
};

export const logout = (_req: Request, res: Response) => {
    const isProduction = process.env.NODE_ENV === 'production';
    res.clearCookie('token', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    });
    return res.json({ message: 'Sesión cerrada correctamente' });
};

export const me = (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'No autenticado' });
    }
    return res.json({ user: req.user });
};