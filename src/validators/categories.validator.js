import { body, param } from 'express-validator';
import { prisma } from '../config/prisma.config.js';

export const createCategoryValidator = [
  body('name')
    .notEmpty().withMessage('El nombre de la categoría es requerido')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .custom(async (name) => {
      const existingCategory = await prisma.categories.findUnique({
        where: { name }
      });
      if (existingCategory) {
        throw new Error('El nombre de la categoría ya existe');
      }
      return true;
    })
];

export const updateCategoryValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número válido'),
  
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .custom(async (name, { req }) => {
      if (name) {
        const existingCategory = await prisma.categories.findFirst({
          where: { 
            name,
            id: { not: parseInt(req.params.id) }
          }
        });
        if (existingCategory) {
          throw new Error('El nombre de la categoría ya existe');
        }
      }
      return true;
    })
];