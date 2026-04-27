const express = require('express');
const RAMController = require('../controllers/RAMController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RAM:
 *       type: object
 *       required:
 *         - name
 *         - brand
 *         - price
 *         - capacity
 *         - speed
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del módulo de RAM
 *         brand:
 *           type: string
 *           description: Marca de la RAM
 *         price:
 *           type: number
 *           description: Precio en pesos
 *         capacity:
 *           type: number
 *           description: Capacidad en GB
 *         speed:
 *           type: number
 *           description: Velocidad en MHz
 *         type:
 *           type: string
 *           enum: [DDR4, DDR5]
 *           description: Tipo de memoria
 */

/**
 * @swagger
 * /rams:
 *   get:
 *     summary: Obtener todas las RAMs
 *     tags: [RAMs]
 *     responses:
 *       200:
 *         description: Lista de RAMs
 *   post:
 *     summary: Crear una nueva RAM
 *     tags: [RAMs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RAM'
 *     responses:
 *       201:
 *         description: RAM creada exitosamente
 */

/**
 * @swagger
 * /rams/{key}/{value}:
 *   get:
 *     summary: Obtener una RAM por campo y valor
 *     tags: [RAMs]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Campo a buscar (ej. name, brand)
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *         description: Valor a buscar
 *     responses:
 *       200:
 *         description: RAM encontrada
 *       404:
 *         description: RAM no encontrada
 *   put:
 *     summary: Actualizar una RAM
 *     tags: [RAMs]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RAM'
 *     responses:
 *       200:
 *         description: RAM actualizada
 *   delete:
 *     summary: Eliminar una RAM
 *     tags: [RAMs]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: RAM eliminada
 */

router.get('/', RAMController.listall)
      .post('/', RAMController.create)
      .get('/:key/:value', RAMController.find, RAMController.show)
      .put('/:key/:value', RAMController.find, RAMController.update)
      .delete('/:key/:value', RAMController.find, RAMController.destroy)

module.exports = router;