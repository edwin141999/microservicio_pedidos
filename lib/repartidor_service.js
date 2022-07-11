const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getMandados() {
  const result = await prisma.pedidos.findMany()
  return { pedidos: result }
}

module.exports = { getMandados }