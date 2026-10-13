import { Response } from 'express';
import { VMS, setVMs } from '../store/data.store.js';
import { AuthRequest, VirtualMachine } from '../types/index.js';
import { Server } from 'socket.io';

export const getVMs = (_req: AuthRequest, res: Response) => {
    return res.json(VMS);
};

export const createVM = (req: AuthRequest, res: Response) => {
    const { name, cores, ram, disk, os, status } = req.body;

    if (!name || cores <= 0 || ram <= 0 || disk <= 0 || !os || !status) {
        return res.status(400).json({ message: 'Datos de la máquina virtual inválidos' });
    }

    const newVM: VirtualMachine = {
        id: `vm-${Date.now()}`,
        name,
        cores: Number(cores),
        ram: Number(ram),
        disk: Number(disk),
        os,
        status,
        createdAt: new Date().toISOString()
    };

    VMS.push(newVM);

    const io: Server = req.app.get('io');
    if (io) {
        io.emit('vm_created', newVM);
    }

    return res.status(201).json(newVM);
};

export const updateVM = (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { name, cores, ram, disk, os, status } = req.body;

    const index = VMS.findIndex((v) => v.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Máquina virtual no encontrada' });
    }

    const updatedVM: VirtualMachine = {
        ...VMS[index],
        name: name ?? VMS[index].name,
        cores: cores ? Number(cores) : VMS[index].cores,
        ram: ram ? Number(ram) : VMS[index].ram,
        disk: disk ? Number(disk) : VMS[index].disk,
        os: os ?? VMS[index].os,
        status: status ?? VMS[index].status
    };

    VMS[index] = updatedVM;

    const io: Server = req.app.get('io');
    if (io) {
        io.emit('vm_updated', updatedVM);
    }

    return res.json(updatedVM);
};

export const deleteVM = (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const index = VMS.findIndex((v) => v.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Máquina virtual no encontrada' });
    }

    const deletedVM = VMS[index];
    const filtered = VMS.filter((v) => v.id !== id);
    setVMs(filtered);

    const io: Server = req.app.get('io');
    if (io) {
        io.emit('vm_deleted', { id });
    }

    return res.json({ message: 'Máquina virtual eliminada', id: deletedVM.id });
};