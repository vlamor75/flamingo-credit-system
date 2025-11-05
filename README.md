 # 🦩 Sistema de Crédito Flamingo -
  Microservicio de Clientes

  Sistema de gestión de clientes para
  entidad financiera, implementado con
  arquitectura de microservicios.

  ## 🚀 Tecnologías

  - **Backend:** Node.js 22 + Express.js
  - **Base de Datos:** PostgreSQL 16
  - **Contenedores:** Docker + Docker
  Compose
  - **Seguridad:** Helmet.js, CORS,
  express-validator
  - **Arquitectura:** MVC
  (Model-View-Controller)

  ## 📋 Requisitos Previos

  - Docker y Docker Compose instalados
  - Puerto 3001 disponible
  (microservicio)
  - Puerto 5433 disponible (PostgreSQL)

  ## 🔧 Instalación y Ejecución

  ### 1. Clonar el repositorio

  ```bash
  git clone <tu-repo>
  cd flamingo-credit-system

  2. Levantar servicios con Docker

  docker-compose up --build

  3. Verificar que está corriendo

  curl http://localhost:3001/health

  Respuesta esperada:
  {
    "success": true,
    "message": "Microservicio de
  Clientes - OK",
    "timestamp": "..."
  }

  📡 API Endpoints

  Base URL: http://localhost:3001/api

  | Método | Endpoint      | Descripción
                  |
  |--------|---------------|------------
  ----------------|
  | GET    | /clientes     | Obtener
  todos los clientes |
  | GET    | /clientes/:id | Obtener
  cliente por ID     |
  | POST   | /clientes     | Crear nuevo
   cliente        |
  | PUT    | /clientes/:id | Actualizar
  cliente         |
  | DELETE | /clientes/:id | Eliminar
  cliente           |

  Ejemplos de uso

  Obtener todos los clientes:
  curl
  http://localhost:3001/api/clientes

  Crear nuevo cliente:
  curl -X POST
  http://localhost:3001/api/clientes \
    -H "Content-Type: application/json"
  \
    -d '{
      "cedula": "1234567890",
      "nombre": "Juan",
      "apellido": "Pérez",
      "email": "juan@example.com",
      "telefono": "3001234567",
      "direccion": "Calle 123"
    }'

  Actualizar cliente:
  curl -X PUT
  http://localhost:3001/api/clientes/1 \
    -H "Content-Type: application/json"
  \
    -d '{
      "nombre": "Juan Carlos",
      "email": "juancarlos@example.com"
    }'

  Eliminar cliente:
  curl -X DELETE
  http://localhost:3001/api/clientes/1

  🗄️ Estructura del Proyecto

  flamingo-credit-system/
  ├── docker-compose.yml
  ├── init-db/
  │   └── 01-create-tables.sql
  └── microservicio-clientes/
      ├── Dockerfile
      ├── package.json
      └── src/
          ├── config/
          │   └── database.js
          ├── models/
          │   └── cliente.model.js
          ├── controllers/
          │   └── clientes.controller.js
          ├── routes/
          │   └── clientes.routes.js
          ├── middleware/
          │   └──
  validator.middleware.js
          └── index.js

  🔒 Seguridad

  - ✅ Validación de inputs con
  express-validator
  - ✅ Protección de headers con
  Helmet.js
  - ✅ CORS configurado
  - ✅ Queries parametrizadas
  (prevención SQL Injection)
  - ✅ Sanitización de datos

  🧪 Testing

  Health Check

  curl http://localhost:3001/health

  Datos de prueba

  La base de datos se inicializa con 3
  clientes de ejemplo:
  - Juan Pérez (cédula: 1234567890)
  - María González (cédula: 9876543210)
  - Carlos Rodríguez (cédula:
  5555555555)

  🛠️ Comandos Útiles

  Ver logs:
  docker-compose logs -f

  Detener servicios:
  docker-compose down

  Reconstruir imágenes:
  docker-compose up --build

  Acceder a PostgreSQL:
  docker exec -it flamingo-postgres psql
   -U postgres -d flamingo

  📚 Próximos Pasos

  - Microservicio de Créditos
  - Autenticación JWT
  - Rate limiting
  - Logging avanzado
  - Tests unitarios

  👨‍💻 Autor

  Desarrollado como parte del proceso de
   preparación técnica para Flamingo.

  ---
  Stack: Node.js 22 | Express |
  PostgreSQL 16 | Docker

  ---

  Guarda (Ctrl+O, Enter, Ctrl+X)

  ---

  ### Haz commit del README:

  ```bash
  git add README.md
  git commit -m "docs: agregar README
  con documentación completa"
  git log --oneline

  ---