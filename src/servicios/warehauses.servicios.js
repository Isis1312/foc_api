import { prisma } from '../config/prisma.config.js';

const WarehausesServices = {
    getAll: async () => {
        try {
            const warehauses = await prisma.warehauses.findMany({
                where: { status: true },
            });
            if (warehauses.length === 0) {
                return {
                    message: `No se encontraron registros`,
                    status: 404,
                    data: {
                        warehauses: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Registros encontrados`,
                status: 200,
                data: {
                    warehauses,
                    total: warehauses.length
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Por favor contacte al administrador`,
                status: 500,
            };
        }
    },

    getById: async (id) => {
        try {
            const warehause = await prisma.warehauses.findUnique({
                where: {
                    id: id,
                    status: true,
                },
            });
            if (!warehause) {
                return {
                    message: `Registro no encontrado`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Registro encontrado`,
                    status: 200,
                    data: {
                        warehause,
                    },
                };
            }
        } catch (error) {
            console.log(error);
            return {
                message: `Por favor contacte al administrador`,
                status: 500,
            };
        }
    },

    create: async (warehauseData) => {
        try {
            const newWarehause = await prisma.warehauses.create({
                data: {
                    name: warehauseData.name,
                },
            });
            return {
                message: `Registro creado exitosamente`,
                status: 201,
                data: {
                    warehause: newWarehause,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Por favor contacte al administrador`,
                status: 500,
            };
        }
    },

    update: async (id, warehauseData) => {
        try {
            const warehause = await prisma.warehauses.update({
                where: { id: id },
                data: {
                    name: warehauseData.name,
                    updated_at: new Date(),
                    status: warehauseData.status !== undefined ? warehauseData.status : true,
                },
            });
            return {
                message: `Registro actualizado exitosamente`,
                status: 200,
                data: {
                    warehause,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Por favor contacte al administrador`,
                status: 500,
            };
        }
    },

    delete: async (id) => {
        try {
            const warehause = await prisma.warehauses.update({
                where: { id: id },
                data: {
                    status: false,
                    deleted_at: new Date(),
                },
            });
            return {
                message: `Registro eliminado exitosamente`,
                status: 204,
                data: {
                    warehause,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Por favor contacte al administrador`,
                status: 500,
            };
        }
    },
};

export { WarehausesServices };
