# 🦩 Sistema de Gestión de Créditos - Flamingo
## Arquitectura de Microservicios

---

## 📋 RESUMEN EJECUTIVO

Sistema de gestión de créditos desarrollado con **arquitectura de microservicios**, implementando las mejores prácticas de desarrollo backend moderno, seguridad y escalabilidad.

**Objetivo:** Demostrar competencias técnicas en:
- Arquitectura de microservicios
- APIs RESTful
- Contenedorización con Docker
- Bases de datos relacionales
- Seguridad web (OWASP)

---

## 🏗️ ARQUITECTURA DEL SISTEMA

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND WEB                     │
│              (HTML5, CSS3, JavaScript)              │
│                  Puerto: 8080                       │
└────────────────────┬────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
┌──────────────────┐      ┌──────────────────┐
│  MS-CLIENTES     │◄────►│  MS-CRÉDITOS     │
│  Puerto: 3001    │      │  Puerto: 3002    │
│                  │      │                  │
│  • CRUD Clientes │      │  • Solicitudes   │
│  • Validaciones  │      │  • Aprobaciones  │
│  • Autenticación │      │  • Consultas     │
└────────┬─────────┘      └────────┬─────────┘
         │                         │
         └─────────┬───────────────┘
                   ▼
          ┌─────────────────┐
          │   PostgreSQL    │
          │   Puerto: 5433  │
          │                 │
          │  • DB: flamingo │
          │  • Tablas:      │
          │    - clientes   │
          │    - creditos   │
          └─────────────────┘
```

---

## 🔧 STACK TECNOLÓGICO

### Backend
- **Runtime:** Node.js v22.x
- **Framework:** Express.js v4.x
- **Base de Datos:** PostgreSQL 16 Alpine
- **ORM/Query:** pg (node-postgres)
- **Validación:** express-validator v7.x
- **HTTP Client:** Axios v1.x

### Seguridad
- **Helmet.js** - Headers de seguridad HTTP
- **CORS** - Control de acceso entre orígenes
- **express-validator** - Validación y sanitización de inputs
- **Parameterized Queries** - Prevención de SQL Injection

### DevOps
- **Docker** - Contenedorización de servicios
- **Docker Compose** - Orquestación de microservicios
- **Git** - Control de versiones

### Frontend
- **HTML5, CSS3, JavaScript Vanilla**
- **Responsive Design**
- **Fetch API** para comunicación con backend

---

## 📦 MICROSERVICIOS IMPLEMENTADOS

### 1. Microservicio de Clientes (MS-Clientes)

**Responsabilidad:** Gestión completa del ciclo de vida de clientes

**Puerto:** 3001

**Endpoints:**
```
GET    /api/clientes          - Listar todos los clientes
GET    /api/clientes/:id      - Obtener cliente por ID
POST   /api/clientes          - Crear nuevo cliente
PUT    /api/clientes/:id      - Actualizar cliente
DELETE /api/clientes/:id      - Eliminar cliente
GET    /health                - Health check
```

**Características:**
- ✅ CRUD completo
- ✅ Validaciones de entrada (cédula única, email válido)
- ✅ Manejo de errores estructurado
- ✅ Respuestas JSON estandarizadas

**Modelo de Datos:**
```javascript
{
  id: SERIAL PRIMARY KEY,
  cedula: VARCHAR(15) UNIQUE NOT NULL,
  nombre: VARCHAR(50) NOT NULL,
  apellido: VARCHAR(50) NOT NULL,
  email: VARCHAR(100) NOT NULL,
  telefono: VARCHAR(15),
  direccion: VARCHAR(200),
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
}
```

---

### 2. Microservicio de Créditos (MS-Créditos)

**Responsabilidad:** Gestión del proceso de créditos (solicitud, aprobación, rechazo)

**Puerto:** 3002

**Endpoints:**
```
GET    /api/creditos                  - Listar todos los créditos
GET    /api/creditos/:id              - Obtener crédito por ID
GET    /api/creditos/cliente/:id      - Créditos de un cliente específico
POST   /api/creditos                  - Crear solicitud de crédito
PUT    /api/creditos/:id/aprobar      - Aprobar crédito
PUT    /api/creditos/:id/rechazar     - Rechazar crédito (con motivo)
DELETE /api/creditos/:id              - Eliminar crédito
GET    /health                        - Health check
```

**Características:**
- ✅ Comunicación con MS-Clientes para verificar existencia del cliente
- ✅ Estados: pendiente, aprobado, rechazado
- ✅ JOIN con tabla clientes para enriquecer respuestas
- ✅ Validaciones de negocio
- ✅ Manejo de errores de servicios externos

**Modelo de Datos:**
```javascript
{
  id: SERIAL PRIMARY KEY,
  cliente_id: INTEGER FK → clientes(id),
  monto_solicitado: DECIMAL(15,2) NOT NULL,
  plazo_meses: INTEGER NOT NULL,
  tasa_interes: DECIMAL(5,2) NOT NULL,
  estado: VARCHAR(20) DEFAULT 'pendiente',
  motivo_rechazo: TEXT,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
}
```

---

## 🔄 FLUJO DE OPERACIÓN

### Caso de Uso: Solicitud de Crédito

```
1. Usuario crea solicitud desde el frontend
   ↓
2. Frontend → POST /api/creditos (MS-Créditos)
   ↓
3. MS-Créditos valida datos de entrada
   ↓
4. MS-Créditos → GET /api/clientes/:id (MS-Clientes)
   ↓
5. MS-Clientes verifica existencia del cliente
   ↓
6. Si existe: MS-Créditos crea registro en PostgreSQL
   ↓
7. Respuesta al frontend con estado 'pendiente'
   ↓
8. Analista aprueba/rechaza desde el frontend
   ↓
9. Frontend → PUT /api/creditos/:id/aprobar o rechazar
   ↓
10. MS-Créditos actualiza estado en BD
    ↓
11. Respuesta exitosa al frontend
```

---

## 🐳 CONTENEDORIZACIÓN CON DOCKER

### Arquitectura de Contenedores

```yaml
version: '3.8'

services:
  postgres:           # Base de datos compartida
  microservicio-clientes:  # Servicio independiente
  microservicio-creditos:  # Servicio independiente

networks:
  flamingo-network:  # Red privada entre servicios

volumes:
  postgres_data:     # Persistencia de datos
```

### Ventajas de esta Arquitectura

✅ **Escalabilidad Independiente:** Cada servicio puede escalar según demanda
✅ **Despliegue Independiente:** Actualizar un servicio sin afectar otros
✅ **Aislamiento:** Cada servicio en su propio contenedor
✅ **Portabilidad:** "Build once, run anywhere"
✅ **Desarrollo Local:** Entorno idéntico a producción

---

## 🔒 SEGURIDAD IMPLEMENTADA

### 1. SQL Injection Prevention
```javascript
// ❌ VULNERABLE
const query = `SELECT * FROM clientes WHERE id = ${id}`;

// ✅ IMPLEMENTADO (Parameterized Queries)
const query = 'SELECT * FROM clientes WHERE id = $1';
await pool.query(query, [id]);
```

### 2. Headers de Seguridad (Helmet.js)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security`

### 3. CORS Configurado
```javascript
app.use(cors({
  origin: '*', // En producción: dominio específico
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
```

### 4. Validación de Entrada
```javascript
// express-validator en todas las rutas
[
  body('cedula').notEmpty().isLength({ min: 6, max: 15 }),
  body('email').isEmail(),
  body('monto_solicitado').isFloat({ min: 100000 })
]
```

---

## 🎯 RELACIÓN CON FLAMINGO

### Tecnologías Requeridas vs Implementadas

| Requerimiento Flamingo | Implementado | Nivel |
|------------------------|--------------|-------|
| APIs RESTful | ✅ | Avanzado |
| Microservicios | ✅ | Intermedio-Avanzado |
| Docker | ✅ | Intermedio |
| PostgreSQL | ✅ | Avanzado |
| Oracle (objetivo) | 📚 | En aprendizaje |
| Seguridad OWASP | ✅ | Intermedio |
| Git | ✅ | Intermedio |
| Scrum/Agile | ✅ | Experiencia previa |

---

## 💡 DECISIONES TÉCNICAS CLAVE

### ¿Por qué Microservicios?
- **Separación de responsabilidades:** Clientes y Créditos son dominios independientes
- **Escalabilidad:** El módulo de créditos puede tener más carga
- **Mantenibilidad:** Cambios en un servicio no afectan al otro
- **Aprendizaje:** Demostrar conocimiento de arquitecturas modernas

### ¿Por qué PostgreSQL?
- **Gratuito y open source**
- **Muy similar a Oracle** (ambos son RDBMS)
- **Excelente para aprender conceptos** que aplican a Oracle
- **PL/pgSQL similar a PL/SQL**

### ¿Por qué Docker?
- **Reproducibilidad:** Mismo entorno en desarrollo y producción
- **Facilidad de despliegue**
- **Aislamiento de dependencias**
- **Estándar de la industria**

---

## 📊 MÉTRICAS DEL PROYECTO

- **Líneas de código:** ~2,500
- **Endpoints API:** 13
- **Microservicios:** 2
- **Tablas BD:** 2 (con relación FK)
- **Contenedores:** 3 (PostgreSQL + 2 servicios)
- **Tiempo de desarrollo:** 3 días
- **Cobertura de seguridad OWASP:** Top 3

---

## 🚀 CÓMO EJECUTAR EL PROYECTO

### Requisitos Previos
- Docker Desktop instalado
- Puerto 3001, 3002, 5433, 8080 disponibles

### Comandos
```bash
# Clonar repositorio
git clone <url>
cd flamingo-credit-system

# Levantar todos los servicios
docker-compose up -d

# Verificar que estén corriendo
docker ps

# Ver logs
docker-compose logs -f

# Acceder al frontend
http://localhost:8080

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v
```

---

## 🎓 CONCEPTOS DEMOSTRADOS

### Backend
✅ Arquitectura de Microservicios
✅ API RESTful Design
✅ MVC Pattern
✅ Service Layer Pattern
✅ Comunicación entre servicios (HTTP)
✅ Manejo de errores estructurado
✅ Validación de entrada

### Base de Datos
✅ Diseño de esquema relacional
✅ Foreign Keys y relaciones
✅ Índices para performance
✅ Queries JOIN
✅ Parameterized Queries

### DevOps
✅ Contenedorización con Docker
✅ Orquestación con Docker Compose
✅ Health Checks
✅ Volúmenes para persistencia
✅ Redes Docker

### Seguridad
✅ SQL Injection Prevention
✅ Headers de seguridad (Helmet)
✅ CORS
✅ Input Validation
✅ Error Handling sin exponer info sensible

---

## 🔮 PRÓXIMOS PASOS (Mejoras Futuras)

### Seguridad
- [ ] Implementar JWT para autenticación
- [ ] Rate Limiting
- [ ] HTTPS/SSL en producción
- [ ] Encriptación de datos sensibles
- [ ] Logging de auditoría

### Funcionalidad
- [ ] Cálculo automático de cuotas
- [ ] Historial de cambios de estado
- [ ] Notificaciones (email/SMS)
- [ ] Reportes y dashboard analytics

### Testing
- [ ] Unit Tests (Jest)
- [ ] Integration Tests
- [ ] E2E Tests (Cypress)

### DevOps
- [ ] CI/CD Pipeline (GitHub Actions)
- [ ] Kubernetes deployment
- [ ] Monitoring (Prometheus + Grafana)
- [ ] Logging centralizado (ELK Stack)

---

## 📞 PUNTOS CLAVE PARA LA ENTREVISTA

### ¿Qué te hace destacar con este proyecto?

1. **Arquitectura moderna:** No es un monolito, es microservicios reales
2. **Funcional end-to-end:** Frontend + Backend + BD + Docker todo integrado
3. **Seguridad desde el diseño:** No es un "agregado después"
4. **Escalable:** Preparado para crecer
5. **Documentado:** Código limpio y estructurado

### Frase de cierre para entrevista:

> "Este proyecto demuestra mi capacidad para diseñar e implementar soluciones backend modernas y escalables. Aunque lo desarrollé con PostgreSQL, entiendo que Flamingo usa Oracle, y estoy entusiasmado por aplicar estos mismos principios de arquitectura, seguridad y buenas prácticas en su stack tecnológico. Mi experiencia con bases de datos relacionales y PL/pgSQL me da una base sólida para aprender rápidamente PL/SQL y Oracle."

---

**Desarrollado por:** [Tu Nombre]
**Fecha:** Noviembre 2025
**Stack:** Node.js 22 + Express + PostgreSQL 16 + Docker
**Propósito:** Demostración técnica para Flamingo
