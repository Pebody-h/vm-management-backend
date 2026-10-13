import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, Role } from '../types/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'ifx_secret_key_2026_super_secure';

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado: Token ausente' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            id: string;
            email: string;
            role: Role;
            name: string;
        };
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

export const requireRole = (roles: Role[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acceso denegado: Permisos insuficientes' });
        }
        next();
    };
};