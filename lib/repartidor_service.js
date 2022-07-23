const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getMandados() {
  const result = await prisma.pedidos.findMany({
    where: {
      delivery_id: {
        in: null
      }
    },
    include: {
      cliente: {
        include: {
          users: true
        }
      },
      item: true,
    }
  })
  return { pedidos: result }
}

async function getRepartidor(params) {
  const { id } = params
  const result = await prisma.repartidor.findUnique({
    where: {
      id: id
    }
  })
  return { repartidor: result }
}

async function updateEstadoRepartidor(params) {
  const { id, estado } = params
  const result = await prisma.repartidor.update({
    where: { id: id },
    data: {
      estado: estado
    }
  })
  return { update: result }
}

async function actualizarUbicacionRepartidor(params) {
  const { id, lat, long } = params
  const result = await prisma.repartidor.update({
    where: { id: id },
    data: {
      latitud: lat,
      longitud: long
    }
  })
  return { update: result }
}

module.exports = { getMandados, updateEstadoRepartidor, actualizarUbicacionRepartidor, getRepartidor }