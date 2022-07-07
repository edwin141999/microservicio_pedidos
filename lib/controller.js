const express = require('express');
const router = express.Router()

router.post('/mandadito', registrarMandado)
router.post('/item', registrarItem)
const pedidoService = require('./pedido_service')

function registrarMandado(req, res, next) {
  const { delivery_id, envio_id, cliente_id, fecha_solicitada, hora_solicitada, hora_entregada, entrega_estimada, metodo_pago, subtotal } = req.body
}

function registrarItem(req, res, next) {
  const { tipo_producto, recoger_ubicacion, descripcion } = req.body
  pedidoService.agregarItem(tipo_producto, recoger_ubicacion, descripcion)
    .then(item => item
      ? res.json(item)
      : res.status(400).json({ message: 'Item already exists' })
    )
    .catch(err => next(err))
}

module.exports = router