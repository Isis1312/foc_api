import { body, param } from 'express-validator';
import { prisma } from '../config/prisma.config.js';

export const createProductValidator = [
  body('name')
    .notEmpty().withMessage('El nombre del producto es requerido')
    .isLength({ min: 2, max: 200 }).withMessage('El nombre debe tener entre 2 y 200 caracteres'),
  
  body('price')
    .isFloat({ min: 0.01 }).withMessage('El precio debe ser un número mayor a 0'),
  
  body('quantity')
    .isInt({ min: 0 }).withMessage('La cantidad debe ser un número entero mayor o igual a 0'),
  
  body('category_id')
    .isInt({ min: 1 }).withMessage('El ID de categoría debe ser un número válido')
    .custom(async (category_id) => {
      const category = await prisma.categories.findUnique({
        where: { id: category_id, status: true }
      });
      if (!category) {
        throw new Error('La categoría seleccionada no existe o está inactiva');
      }
      return true;
    }),
  
  body('area_id')
    .isInt({ min: 1 }).withMessage('El ID del área debe ser un número válido')
    .custom(async (area_id) => {
      const area = await prisma.areas.findUnique({
        where: { id: area_id, status: true }
      });
      if (!area) {
        throw new Error('El área seleccionada no existe o está inactiva');
      }
      return true;
    })
    .custom(async (area_id, { req }) => {
      // Validar constraint único: nombre único por área
      const { name } = req.body;
      if (name) {
        const existingProduct = await prisma.products.findFirst({
          where: { 
            name,
            area_id: area_id,
            status: true
          }
        });
        if (existingProduct) {
          throw new Error('Ya existe un producto con este nombre en el área seleccionada');
        }
      }
      return true;
    })
];

export const updateProductValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número válido'),
  
  body('name')
    .optional()
    .isLength({ min: 2, max: 200 }).withMessage('El nombre debe tener entre 2 y 200 caracteres'),
  
  body('price')
    .optional()
    .isFloat({ min: 0.01 }).withMessage('El precio debe ser un número mayor a 0'),
  
  body('quantity')
    .optional()
    .isInt({ min: 0 }).withMessage('La cantidad debe ser un número entero mayor o igual a 0'),
  
  body('category_id')
    .optional()
    .isInt({ min: 1 }).withMessage('El ID de categoría debe ser un número válido')
    .custom(async (category_id) => {
      if (category_id) {
        const category = await prisma.categories.findUnique({
          where: { id: category_id, status: true }
        });
        if (!category) {
          throw new Error('La categoría seleccionada no existe o está inactiva');
        }
      }
      return true;
    }),
  
  body('area_id')
    .optional()
    .isInt({ min: 1 }).withMessage('El ID del área debe ser un número válido')
    .custom(async (area_id) => {
      if (area_id) {
        const area = await prisma.areas.findUnique({
          where: { id: area_id, status: true }
        });
        if (!area) {
          throw new Error('El área seleccionada no existe o está inactiva');
        }
      }
      return true;
    })
    .custom(async (area_id, { req }) => {
      // Validar constraint único: nombre único por área (en update)
      if (area_id && req.body.name) {
        const existingProduct = await prisma.products.findFirst({
          where: { 
            name: req.body.name,
            area_id: area_id,
            id: { not: parseInt(req.params.id) },
            status: true
          }
        });
        if (existingProduct) {
          throw new Error('Ya existe un producto con este nombre en el área seleccionada');
        }
      }
      return true;
    }),
  
  body('status')
    .optional()
    .isBoolean().withMessage('El estado debe ser un valor booleano')
];

export const getProductByIdValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número válido')
];

export const deleteProductValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número válido')
];