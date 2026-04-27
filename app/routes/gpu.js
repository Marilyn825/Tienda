const express = require('express');
const GPUController = require('../controllers/GPUController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     GPU:
 *       type: object
 *       required:
 *         - name
 *         - brand
 *         - price
 *         - vram
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de la tarjeta gráfica
 *         brand:
 *           type: string
 *           enum: [NVIDIA, AMD, Intel]
 *           description: Marca de la GPU
 *         price:
 *           type: number
 *           description: Precio en pesos
 *         vram:
 *           type: number
 *           description: Memoria de video en GB
 *         type:
 *           type: string
 *           enum: [Gaming, Workstation, Budget]
 *           description: Tipo de uso
 */

/**
 * @swagger
 * /gpus:
 *   get:
 *     summary: Obtener todas las GPUs
 *     tags: [GPUs]
 *     responses:
 *       200:
 *         description: Lista de GPUs
 *   post:
 *     summary: Crear una nueva GPU
 *     tags: [GPUs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GPU'
 *     responses:
 *       201:
 *         description: GPU creada exitosamente
 */

/**
 * @swagger
 * /gpus/{key}/{value}:
 *   get:
 *     summary: Obtener una GPU por campo y valor
 *     tags: [GPUs]
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
 *         description: GPU encontrada
 *       404:
 *         description: GPU no encontrada
 *   put:
 *     summary: Actualizar una GPU
 *     tags: [GPUs]
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
 *             $ref: '#/components/schemas/GPU'
 *     responses:
 *       200:
 *         description: GPU actualizada
 *   delete:
 *     summary: Eliminar una GPU
 *     tags: [GPUs]
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
 *         description: GPU eliminada
 */

router.get('/', GPUController.listall)
      .post('/', GPUController.create)
      .get('/:key/:value', GPUController.find, GPUController.show)
      .put('/:key/:value', GPUController.find, GPUController.update)
      .delete('/:key/:value', GPUController.find, GPUController.destroy)

module.exports = router;