import { prisma } from '../config/prisma.config.js';

const AreaServices = {
    getAll: async () => {
        try {
            const areas = await prisma.areas.findMany({
                where: { status: true },
            });
            if (areas.length === 0) {
                return {
                    message: `No se encontraron registros`,
                    status: 404,
                    data: {
                        areas: [],
                        total: 0
                    },
                };
            }
            return {
                message: `Registros encontrados`,
                status: 200,
                data: {
                    areas,
                    total: areas.length
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
            const areas = await prisma.areas.findUnique({
                where: {
                    id: id,
                    status: true,
                },
                include: {
                    warehause: true,
                },
            });
            if (!areas) {
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
                        area,
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

    create: async (areaData) => {
        try {
            const newArea = await prisma.areas.create({
                data: {
                    name: areaData.name,
                    warehauses_id: areaData.warehauses_id
                },
                include: {
                    warehause: true,
                },
            });
            return {
                message: `Registro creado exitosamente`,
                status: 201,
                data: {
                    areas: newArea,
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

    update: async (id, areaData) => {
        try {
            const area = await prisma.areas.update({
                where: { id: id },
                data: {
                    name: areaData.name,
                    warehauses_id: areaData.warehauses_id,
                    updated_at: new Date(),
                    status: areaData.status !== undefined ? areaData.status : true,
                },
                include: {
                    warehause: true,
                },
            });
            return {
                message: `Registro actualizado exitosamente`,
                status: 200,
                data: {
                    area,
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
            const area = await prisma.areas.update({
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
                    area,
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

    getByName: async (name) => {
            try {
                const area = await prisma.areas.findUnique({
                    where: { name },
                    include: {
                        warehause: true
                    }
                });

                if (!area) {
                    return {
                        message: `Registro no encontrado`,
                        status: 404,
                        data: {
                            area,
                        },
                    };
                } else {
                    return {
                        message: `Registro encontrado`,
                        status: 200,
                        data: {
                            area,
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
    };

    export { AreaServices };
