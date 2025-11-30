import { body, param } from 'express-validator';
import { prisma } from '../config/prisma.config.js';

export const createRoleValidator = [
  body('name')
    .notEmpty().withMessage('El nombre del rol es requerido')
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .custom(async (name) => {
      const existingRole = await prisma.roles.findUnique({
        where: { name }
      });
      if (existingRole) {
        throw new Error('El nombre del rol ya existe');
      }
      return true;
    })
];

export const updateRoleValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número válido'),
  
  body('name')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .custom(async (name, { req }) => {
      if (name) {
        const existingRole = await prisma.roles.findFirst({
          where: { 
            name,
            id: { not: parseInt(req.params.id) }
          }
        });
        if (existingRole) {
          throw new Error('El nombre del rol ya existe');
        }
      }
      return true;
    }),
  
  body('status')
    .optional()
    .isBoolean().withMessage('El estado debe ser un valor booleano')
];

export const getRoleByIdValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número válido')
];

export const deleteRoleValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número válido')
];