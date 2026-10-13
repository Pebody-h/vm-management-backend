import { User, VirtualMachine } from '../types/index.js';

export const USERS: User[] = [
    {
        id: 'usr-1',
        email: 'admin@ifx.com',
        password: 'admin123password',
        name: 'Administrador IFX',
        role: 'Administrador'
    },
    {
        id: 'usr-2',
        email: 'cliente@ifx.com',
        password: 'cliente123password',
        name: 'Cliente Corporativo',
        role: 'Cliente'
    }
];

export let VMS: VirtualMachine[] = [
    {
        id: 'vm-101',
        name: 'SRV-PROD-DB-01',
        cores: 16,
        ram: 64,
        disk: 500,
        os: 'Ubuntu 22.04 LTS',
        status: 'Encendida',
        createdAt: new Date().toISOString()
    },
    {
        id: 'vm-102',
        name: 'SRV-WEB-FRONT-01',
        cores: 4,
        ram: 16,
        disk: 100,
        os: 'Debian 12',
        status: 'Encendida',
        createdAt: new Date().toISOString()
    },
    {
        id: 'vm-103',
        name: 'SRV-DEV-TEST-02',
        cores: 2,
        ram: 8,
        disk: 80,
        os: 'CentOS Stream 9',
        status: 'Apagada',
        createdAt: new Date().toISOString()
    }
];

export const setVMs = (newVMs: VirtualMachine[]) => {
    VMS = newVMs;
};