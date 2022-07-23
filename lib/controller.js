const express = require('express');
const router = express.Router()
const pedidoService = require('./pedido_service');
const repartidorService = require('./repartidor_service')

router.post('/mandadito', registrarMandado)
router.post('/item', registrarItem)
router.put('/vincularRepartidor', vincularRepartidor)
router.put('/entrega', actualizarEntrega)
router.get('/mostrarMandados', verMandados)
router.post('/mostrarItem', mostrarItem)
router.post('/cambiarEstado', cambiarEstado)
router.post('/mandadosCliente', verMandadosCliente)
router.put('/actualizarUbicacion', actualizarUbicacion)
router.post('/getRepartidor', getRepartidor)

function registrarMandado(req, res, next) {
  const { envio_id, cliente_id, entrega_estimada, metodo_pago, subtotal } = req.body
  pedidoService.agregarMandado(envio_id, cliente_id, entrega_estimada, metodo_pago, subtotal)
    .then(mandado => mandado
      ? res.json(mandado)
      : res.status(400).json({ message: 'No se registro el mandado' })
    )
    .catch(err => next(err))
}

function vincularRepartidor(req, res, next) {
  const { id, delivery_id } = req.body
  pedidoService.actualizarMandadadoRepartidor(id, delivery_id)
    .then(update => update
      ? res.json(update)
      : res.status(400).json({ message: 'El mandado ya tiene un repartidor asignado' })
    )
    .catch(err => next(err))
}

function actualizarEntrega(req, res, next) {
  const { id } = req.body
  pedidoService.actualizarMandadoHoraEntrega(id)
    .then(update => update
      ? res.json(update)
      : res.status(400).json({ message: 'No se actualizo la hora de entrega' })
    ).catch(err => next(err))
}

function registrarItem(req, res, next) {
  pedidoService.agregarItem(req.body)
    .then(item => item
      ? res.json(item)
      : res.status(400).json({ message: 'No se registro el item' })
    )
    .catch(err => next(err))
}

function mostrarItem(req, res, next) {
  pedidoService.mostrarItem(req.body)
    .then(item => item
      ? res.json(item)
      : res.status(400).json({ message: 'No se encontro el item' })
    )
    .catch(err => next(err))
}

function verMandados(_req, res, next) {
  repartidorService.getMandados()
    .then(mandados => mandados
      ? res.json(mandados)
      : res.status(400).json({ message: 'No se encontraron mandados' })
    )
    .catch(err => next(err))
}

function cambiarEstado(req, res, next) {
  repartidorService.updateEstadoRepartidor(req.body)
    .then(update => update
      ? res.json(update)
      : res.status(400).json({ message: 'No se actualizo el estado del repartidor' }))
    .catch(err => next(err))
}

function verMandadosCliente(req, res, next) {
  pedidoService.verMandadosCliente(req.body)
    .then(mandadosCliente => mandadosCliente
      ? res.json(mandadosCliente)
      : res.status(400).json({ message: 'No se encontraron mandados' })
    )
    .catch(err => next(err))
}

function actualizarUbicacion(req,res,next) {
  repartidorService.actualizarUbicacionRepartidor(req.body)
    .then(update => update
      ? res.json(update)
      : res.status(400).json({ message: 'No se actualizo la ubicacion del repartidor' }))
    .catch(err => next(err))
}

function getRepartidor(req,res,next) {
  repartidorService.getRepartidor(req.body)
    .then(repartidor => repartidor
      ? res.json(repartidor)
      : res.status(400).json({ message: 'No se encontro el repartidor' }))
    .catch(err => next(err))
}

module.exports = router