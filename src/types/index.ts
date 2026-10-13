import { Request } from 'express';

export type Role = 'Administrador' | 'Cliente';
export type VMStatus = 'Encendida' | 'Apagada' | 'Mantenimiento';

export interface User {
    id: string;
    email: string;
    password?: string;
    name: string;
    role: Role;
}

export interface VirtualMachine {
    id: string;
    name: string;
    cores: number;
    ram: number;
    disk: number;
    os: string;
    status: VMStatus;
    createdAt: string;
}

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: Role;
        name: string;
    };
}