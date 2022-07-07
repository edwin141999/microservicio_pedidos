const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function agregarMandado(...params) {
}

async function agregarItem(tipo_producto, recoger_ubicacion, descripcion) {
  console.log(tipo_producto, recoger_ubicacion, descripcion);
  const result = await prisma.item.create({
    data: {
      tipo_producto: tipo_producto,
      recoger_ubicacion: recoger_ubicacion,
      descripcion: descripcion,
    }
  })
  return { item: result }
}

module.exports = { agregarMandado, agregarItem }