const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getMandados() {
  const result = await prisma.pedidos.findMany({
    include: {
      cliente: {
        include: {
          users: {
            include:{
              tipopago: true
            }
          }
        }
      },
      item: true,
    }
  })
  return { pedidos: result }
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

module.exports = { getMandados, updateEstadoRepartidor }