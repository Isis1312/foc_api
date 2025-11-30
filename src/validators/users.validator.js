import { body, param } from 'express-validator';
import { prisma } from '../config/prisma.config.js';

export const createUserValidator = [
  body('name')
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  
  body('email')
    .isEmail().withMessage('El email debe ser válido')
    .custom(async (email) => {
      const existingUser = await prisma.users.findUnique({
        where: { email }
      });
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }
      return true;
    }),
  
  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  
  body('role_id')
    .isInt({ min: 1 }).withMessage('El ID del rol debe ser un número válido')
    .custom(async (role_id) => {
      const role = await prisma.roles.findUnique({
        where: { id: role_id, status: true }
      });
      if (!role) {
        throw new Error('El rol seleccionado no existe o está inactivo');
      }
      return true;
    })
];

export const updateUserValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número válido'),
  
  body('email')
    .optional()
    .isEmail().withMessage('El email debe ser válido')
    .custom(async (email, { req }) => {
      if (email) {
        const existingUser = await prisma.users.findFirst({
          where: { 
            email,
            id: { not: parseInt(req.params.id) }
          }
        });
        if (existingUser) {
          throw new Error('El email ya está registrado');
        }
      }
      return true;
    }),
  
  body('role_id')
    .optional()
    .isInt({ min: 1 }).withMessage('El ID del rol debe ser un número válido')
    .custom(async (role_id) => {
      if (role_id) {
        const role = await prisma.roles.findUnique({
          where: { id: role_id, status: true }
        });
        if (!role) {
          throw new Error('El rol seleccionado no existe o está inactivo');
        }
      }
      return true;
    })
];