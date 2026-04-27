const express = require('express');
const CPUController = require('../controllers/CPUController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CPU:
 *       type: object
 *       required:
 *         - name
 *         - brand
 *         - price
 *         - cores
 *         - ghz
 *         - socket
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del procesador
 *         brand:
 *           type: string
 *           enum: [Intel, AMD]
 *           description: Marca del procesador
 *         price:
 *           type: number
 *           description: Precio en pesos
 *         cores:
 *           type: number
 *           description: Cantidad de núcleos
 *         ghz:
 *           type: number
 *           description: Velocidad en GHz
 *         socket:
 *           type: string
 *           description: Tipo de socket (ej. LGA1700, AM5)
 */

/**
 * @swagger
 * /cpus:
 *   get:
 *     summary: Obtener todos los CPUs
 *     tags: [CPUs]
 *     responses:
 *       200:
 *         description: Lista de CPUs
 *   post:
 *     summary: Crear un nuevo CPU
 *     tags: [CPUs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CPU'
 *     responses:
 *       201:
 *         description: CPU creado exitosamente
 */

/**
 * @swagger
 * /cpus/{key}/{value}:
 *   get:
 *     summary: Obtener un CPU por campo y valor
 *     tags: [CPUs]
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
 *         description: CPU encontrado
 *       404:
 *         description: CPU no encontrado
 *   put:
 *     summary: Actualizar un CPU
 *     tags: [CPUs]
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
 *             $ref: '#/components/schemas/CPU'
 *     responses:
 *       200:
 *         description: CPU actualizado
 *   delete:
 *     summary: Eliminar un CPU
 *     tags: [CPUs]
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
 *         description: CPU eliminado
 */

router.get('/', CPUController.listall)
      .post('/', CPUController.create)
      .get('/:key/:value', CPUController.find, CPUController.show)
      .put('/:key/:value', CPUController.find, CPUController.update)
      .delete('/:key/:value', CPUController.find, CPUController.destroy)

module.exports = router;