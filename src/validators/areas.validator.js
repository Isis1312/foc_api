import { body, param, query } from 'express-validator';
import { prisma } from '../config/prisma.config.js';

export const createAreaValidator = [
  body('name')
    .notEmpty().withMessage('El nombre del área es requerido')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .custom(async (name) => {
      const existingArea = await prisma.areas.findUnique({
        where: { name }
      });
      if (existingArea) {
        throw new Error('El nombre del área ya existe');
      }
      return true;
    }),
  
  body('warehouse_id')
    .isInt({ min: 1 }).withMessage('El ID del almacén debe ser un número válido')
    .custom(async (warehouse_id) => {
      const warehouse = await prisma.warehouses.findUnique({
        where: { id: warehouse_id, status: true }
      });
      if (!warehouse) {
        throw new Error('El almacén seleccionado no existe o está inactivo');
      }
      return true;
    })
];

export const updateAreaValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número válido'),
  
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .custom(async (name, { req }) => {
      if (name) {
        const existingArea = await prisma.areas.findFirst({
          where: { 
            name,
            id: { not: parseInt(req.params.id) }
          }
        });
        if (existingArea) {
          throw new Error('El nombre del área ya existe');
        }
      }
      return true;
    }),
  
  body('warehouse_id')
    .optional()
    .isInt({ min: 1 }).withMessage('El ID del almacén debe ser un número válido')
    .custom(async (warehouse_id) => {
      if (warehouse_id) {
        const warehouse = await prisma.warehouses.findUnique({
          where: { id: warehouse_id, status: true }
        });
        if (!warehouse) {
          throw new Error('El almacén seleccionado no existe o está inactivo');
        }
      }
      return true;
    }),
  
  body('status')
    .optional()
    .isBoolean().withMessage('El estado debe ser un valor booleano')
];

export const getAreaByIdValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número válido')
];

export const deleteAreaValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número válido')
];