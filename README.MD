CONSULTAS DEL PEDIDO COMO CLIENTE

POST= /users/mandadito

body:{\
  "envio_id": 2 -> es el ID del item,\
  "cliente_id": 36,\
  "entrega_estimada": 20 -> minutos en lo que tardara en entregar el producto,\
  "metodo_pago": "Efectivo" || "Tarjeta de Debito",\
  "subtotal": "30.0" -> precio del mandado\
}

POST= /users/item

body:{\
  "tipo_producto": "Comida",\
  "recoger_ubicacion":"5ta Norte",\
  "descripcion": "2 quesadillas y 3 tacos",\
  "precio_producto": "15",\
  "latitud":"16.74602514618138",\
  "longitud": "-93.10425594449045"\
}

POST = /users/mostrarItem

body:{\
    "id": 2 -> ID del item que quieres mostrar  
\}

PUT= /users/vincularRepartidor

body:{\
  "id":6, ->ID del pedido para relacionar\
  "delivery_id":4 -> ID del repartidor\
}

PUT= /users/entrega

body:{\
  "id": 6, -> ID del pedido para relacionar\
}


CONSULTAS DEL PEDIDO COMO REPARTIDOR

GET = /users/mostrarMandados
