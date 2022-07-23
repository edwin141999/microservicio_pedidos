const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function agregarMandado(envio_id, cliente_id, entrega_estimada, metodo_pago, subtotal) {
  const result = await prisma.pedidos.create({
    data: {
      envio_id: envio_id,
      cliente_id: cliente_id,
      entrega_estimada: entrega_estimada,
      metodo_pago: metodo_pago,
      subtotal: subtotal,
    }
    // {
    //   "envio_id": 2,
    //   "cliente_id": 36,
    //   "entrega_estimada": 50,
    //   "metodo_pago": "Efectivo",
    //   "subtotal": "100.0"
    // }
  })
  return { mandado: result }
}

async function actualizarMandadadoRepartidor(id, repartidor_id) {
  const checarMandado = await prisma.pedidos.findUnique({
    where: { id: id },
  })
  if (checarMandado.repartidor_id === null) {
    const updatePedido = await prisma.pedidos.update({
      where: { id: id },
      data: {
        delivery_id: repartidor_id
      }
    })
    return { update: updatePedido }
  }
}

async function actualizarMandadoHoraEntrega(id) {
  var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds

  const updatePedido = await prisma.pedidos.update({
    where: { id: id },
    data: {
      hora_entregada: new Date(Date.now() - tzoffset)
    }
  })
  return { update: updatePedido }
}

async function agregarItem(params) {
  let { tipo_producto, recoger_ubicacion, descripcion, precio_producto, latitud, longitud } = params
  if (precio_producto === '') {
    precio_producto = '0'
  }
  const result = await prisma.item.create({
    data: {
      tipo_producto: tipo_producto,
      recoger_ubicacion: recoger_ubicacion,
      descripcion: descripcion,
      precio_producto: precio_producto,
      latitud: latitud,
      longitud: longitud
    }
  })
  return { item: result }
}

async function mostrarItem(params) {
  const { id } = params
  const result = await prisma.item.findUnique({
    where: { id: id },
  })
  return { item: result }
}

module.exports = { agregarMandado, agregarItem, actualizarMandadadoRepartidor, actualizarMandadoHoraEntrega, mostrarItem }