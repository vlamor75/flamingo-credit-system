# 🦩 PLAN DE PREPARACIÓN - ENTREVISTA FLAMINGO
## Analista de Desarrollo TI - Sistema de Crédito

**Fecha entrevista:** Miércoles 5 de Noviembre 2025  
**Tiempo disponible:** 
- Hoy Domingo: 3:00 PM - 5:00 PM (2 horas)
- Lunes: 4-5 horas
- Martes: 4-5 horas

---

## 📋 TU PERFIL ACTUAL (Fortalezas y Gaps)

### ✅ FORTALEZAS
- **APIs RESTful:** 4/5 - Dominas CRUD y múltiples APIs
- **Bases de datos:** MySQL/PostgreSQL dominados
- **Git:** 3/5 - Conoces lo básico
- **Scrum/Agile:** 3/5 - Has trabajado con metodologías ágiles

### 🔴 GAPS CRÍTICOS (PRIORIDAD ALTA)
1. **Oracle/PL-SQL:** 0/5 → Necesitas sintaxis y conceptos básicos
2. **Docker/Contenedores:** 1/5 → Conoces el concepto pero no has implementado
3. **Microservicios:** 2/5 → Has implementado sin saberlo conscientemente
4. **Seguridad OWASP:** 2/5 → Has trabajado pero no en detalle

---

## 🎯 OBJETIVOS DEL PROYECTO PRÁCTICO

### Proyecto: **Mini Sistema de Crédito Flamingo**

#### Arquitectura a implementar:
```
┌─────────────────────────────────────────────┐
│         ARQUITECTURA DE MICROSERVICIOS       │
└─────────────────────────────────────────────┘

    ┌──────────────────┐      ┌──────────────────┐
    │  MS-CLIENTES     │      │  MS-CRÉDITOS     │
    │  Puerto: 3001    │◄─────┤  Puerto: 3002    │
    │                  │      │                  │
    │  • CRUD Clientes │      │  • Solicitudes   │
    │  • Validaciones  │      │  • Aprobaciones  │
    │  • JWT Auth      │      │  • Consultas     │
    └────────┬─────────┘      └────────┬─────────┘
             │                         │
             └─────────┬───────────────┘
                       ▼
              ┌─────────────────┐
              │   PostgreSQL    │
              │   (Docker)      │
              │                 │
              │  • DB: flamingo │
              │  • Port: 5432   │
              └─────────────────┘
```

---

## 🛠️ STACK TECNOLÓGICO DEL PROYECTO

### Backend
- **Node.js v22** + Express
- **PostgreSQL** (simulando lógica Oracle)
- **Docker** para contenedores
- **Docker Compose** para orquestación

### Seguridad
- **Helmet.js** - Headers seguros
- **express-validator** - Validación de inputs
- **JWT** - Autenticación
- **bcryptjs** - Hash de contraseñas (futuro)

### Dependencias principales:
```json
{
  "express": "^4.18.0",
  "pg": "^8.11.0",
  "dotenv": "^16.0.0",
  "helmet": "^7.1.0",
  "cors": "^2.8.5",
  "express-validator": "^7.0.0",
  "jsonwebtoken": "^9.0.0",
  "axios": "^1.6.0"
}
```

---

## 📂 ESTRUCTURA DEL PROYECTO

```
flamingo-credit-system/
│
├── README.md
├── .gitignore
├── docker-compose.yml
│
├── microservicio-clientes/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── index.js
│       ├── config/
│       │   └── database.js
│       ├── models/
│       │   └── cliente.model.js
│       ├── controllers/
│       │   └── clientes.controller.js
│       ├── routes/
│       │   └── clientes.routes.js
│       └── middleware/
│           └── validator.middleware.js
│
└── microservicio-creditos/
    ├── Dockerfile
    ├── .dockerignore
    ├── package.json
    ├── .env
    └── src/
        ├── index.js
        ├── config/
        │   └── database.js
        ├── models/
        │   └── credito.model.js
        ├── controllers/
        │   └── creditos.controller.js
        ├── routes/
        │   └── creditos.routes.js
        └── services/
            └── clientes.service.js
```

---

## 📅 CRONOGRAMA DETALLADO

### 🗓️ **DOMINGO (COMPLETADO ✅)**

#### **Bloque 1: Microservicio Clientes (1 hora) - 3:00-4:00 PM**
- [x] Estructura de carpetas
- [x] Configuración de base de datos
- [x] Modelo de Cliente
- [x] Controller con CRUD
- [x] Routes con validaciones
- [x] index.js principal
- [x] Dockerfile

#### **Bloque 2: Docker Compose + PostgreSQL (45 min) - 4:00-4:45 PM**
- [x] Crear docker-compose.yml
- [x] Configurar PostgreSQL
- [x] Levantar servicios
- [x] Probar conexión a BD
- [x] Crear tabla clientes

#### **Bloque 3: Testing + Git (15 min) - 4:45-5:00 PM**
- [x] Probar endpoints con curl/Postman
- [x] Commits organizados
- [x] Documentar en README

---

### 🗓️ **LUNES 3 NOV (4-5 horas) - EN PROGRESO 🔄**

#### **Bloque 1: Microservicio Créditos (2 horas) ✅ COMPLETADO**
- [x] Estructura completa (config, models, controllers, routes, services)
- [x] Modelo de Crédito (CRUD + findByCliente)
- [x] Comunicación con MS-Clientes (axios) - services/clientes.service.js
- [x] Lógica de aprobación/rechazo
- [x] Dockerfile + .dockerignore
- [x] Actualizar docker-compose.yml con MS-Créditos
- [x] Actualizar init-db/01-create-tables.sql con tabla creditos

**PROGRESO: 100% del Bloque 1**

#### **Bloque 2: Integración y Testing (1.5 horas) 🔄 EN PROGRESO**
- [ ] Detener servicios anteriores
- [ ] Levantar todos los servicios con docker-compose up --build
- [ ] Verificar logs de los 3 servicios (PostgreSQL, MS-Clientes, MS-Créditos)
- [ ] Probar flujo completo:
  - Crear cliente en MS-Clientes
  - Crear crédito en MS-Créditos (verificando cliente)
  - Aprobar/Rechazar crédito
  - Consultar créditos por cliente
- [ ] Casos de prueba con curl
- [ ] Validar manejo de errores (cliente inexistente, servicio caído)
- [ ] Git commit del MS-Créditos

**PROGRESO: 0% del Bloque 2 - SIGUIENTE PASO**

#### **Bloque 3: Oracle - Teoría Aplicada (1.5 horas) ⏳ PENDIENTE**
- [ ] Comparativa PostgreSQL vs Oracle
- [ ] Traducir queries del proyecto a Oracle
- [ ] PL/SQL básico (procedimientos, funciones)
- [ ] Procedures y Functions aplicados al proyecto
- [ ] Triggers y secuencias

**PROGRESO: 0% del Bloque 3**

---

### 🗓️ **MARTES 4 NOV (4-5 horas)**

#### **Bloque 1: Seguridad en Profundidad (1.5 horas)**
- [ ] OWASP Top 10 aplicado
- [ ] Implementar JWT en el proyecto
- [ ] SQL Injection - ejemplos y prevención
- [ ] XSS y CSRF
- [ ] Encriptación de datos sensibles

#### **Bloque 2: Mock Interview (2 horas)**
- [ ] Simulacro de entrevista técnica
- [ ] Preguntas sobre el proyecto
- [ ] Live coding
- [ ] Diseño de arquitectura
- [ ] Preguntas comportamentales

#### **Bloque 3: Repaso Final (1 hora)**
- [ ] Cheat sheets
- [ ] Respuestas preparadas
- [ ] Preguntas para el entrevistador
- [ ] Preparación mental

---

## 🎓 CONCEPTOS TÉCNICOS CLAVE PARA DOMINAR

### 1. **Microservicios**

**Definición:**
- Arquitectura donde la aplicación se divide en servicios pequeños e independientes
- Cada servicio tiene su propia responsabilidad
- Se comunican mediante APIs (generalmente REST)

**Ventajas:**
- ✅ Escalabilidad independiente
- ✅ Despliegue independiente
- ✅ Flexibilidad tecnológica
- ✅ Resiliencia (si un servicio cae, los demás siguen)

**Desventajas:**
- ❌ Mayor complejidad operacional
- ❌ Comunicación de red
- ❌ Transacciones distribuidas
- ❌ Testing más complejo

**Diferencia con Monolito:**
```
MONOLITO                    MICROSERVICIOS
┌─────────────────┐        ┌────┐ ┌────┐ ┌────┐
│   TODO JUNTO    │        │ A  │ │ B  │ │ C  │
│                 │   VS   │    │ │    │ │    │
│  UI + API + DB  │        └────┘ └────┘ └────┘
└─────────────────┘           ▼      ▼      ▼
                           ┌──────────────────┐
                           │    Base Datos    │
                           └──────────────────┘
```

---

### 2. **Docker y Contenedores**

**¿Qué es Docker?**
- Plataforma para crear, desplegar y ejecutar aplicaciones en contenedores
- Contenedor = Paquete ligero que incluye código + dependencias

**Conceptos clave:**
- **Imagen:** Template inmutable (receta)
- **Contenedor:** Instancia ejecutable de una imagen
- **Dockerfile:** Archivo con instrucciones para crear imagen
- **Docker Compose:** Herramienta para orquestar múltiples contenedores

**Comandos esenciales:**
```bash
# Construir imagen
docker build -t nombre-imagen .

# Listar imágenes
docker images

# Ejecutar contenedor
docker run -p 3001:3001 nombre-imagen

# Listar contenedores
docker ps

# Ver logs
docker logs nombre-contenedor

# Detener contenedor
docker stop nombre-contenedor

# Docker Compose
docker-compose up        # Levantar servicios
docker-compose down      # Detener servicios
docker-compose logs      # Ver logs
```

---

### 3. **APIs RESTful**

**Principios REST:**
1. **Stateless:** Cada petición es independiente
2. **Client-Server:** Separación de responsabilidades
3. **Cacheable:** Respuestas deben indicar si son cacheables
4. **Uniform Interface:** Interfaz consistente

**Métodos HTTP:**
| Método | Uso | Idempotente |
|--------|-----|-------------|
| GET | Obtener recursos | ✅ |
| POST | Crear recurso | ❌ |
| PUT | Actualizar completo | ✅ |
| PATCH | Actualizar parcial | ❌ |
| DELETE | Eliminar | ✅ |

**Status Codes importantes:**
- **200 OK:** Exitoso
- **201 Created:** Recurso creado
- **400 Bad Request:** Datos inválidos
- **401 Unauthorized:** No autenticado
- **403 Forbidden:** No autorizado
- **404 Not Found:** No existe
- **500 Internal Server Error:** Error del servidor

**Diseño de endpoints:**
```
✅ BUENO                      ❌ MALO
GET    /api/clientes         GET    /api/getClientes
POST   /api/clientes         POST   /api/createCliente
GET    /api/clientes/123     GET    /api/cliente?id=123
PUT    /api/clientes/123     POST   /api/updateCliente
DELETE /api/clientes/123     POST   /api/deleteCliente
```

---

### 4. **Seguridad Web (OWASP Top 10 - 2021)**

#### **1. SQL Injection**
**Problema:**
```javascript
// ❌ VULNERABLE
const query = `SELECT * FROM users WHERE id = ${userId}`;
```

**Solución:**
```javascript
// ✅ SEGURO - Parameterized queries
const query = 'SELECT * FROM users WHERE id = $1';
await pool.query(query, [userId]);
```

#### **2. XSS (Cross-Site Scripting)**
**Problema:** Inyección de scripts maliciosos
**Solución:**
- Escapar output
- Content Security Policy headers
- Usar helmet.js

#### **3. CSRF (Cross-Site Request Forgery)**
**Solución:**
- Tokens CSRF
- SameSite cookies
- Verificar origin/referer

#### **4. Autenticación rota**
**Buenas prácticas:**
- Hash de contraseñas (bcrypt)
- JWT con expiración
- Rate limiting
- 2FA cuando sea posible

#### **5. Exposición de datos sensibles**
**Solución:**
- HTTPS siempre
- Encriptar datos en BD
- No logear información sensible
- Máscaras en respuestas (últimos 4 dígitos tarjeta)

---

### 5. **Git y Control de Versiones**

**Flujo básico:**
```bash
# Inicializar repositorio
git init

# Ver estado
git status

# Agregar cambios
git add .
git add archivo.js

# Commit
git commit -m "mensaje descriptivo"

# Ver historial
git log --oneline

# Crear rama
git branch nombre-rama

# Cambiar de rama
git checkout nombre-rama
# o
git switch nombre-rama

# Merge
git checkout main
git merge nombre-rama

# Push (enviar a remoto)
git push origin main
```

**Gitflow estrategia:**
```
main (producción)
  ↑
  merge ← develop (desarrollo)
            ↑
            merge ← feature/nueva-funcionalidad
```

**Mensajes de commit (Conventional Commits):**
```
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
chore: tareas de mantenimiento
refactor: refactorización
test: tests
```

---

### 6. **Scrum y Metodologías Ágiles**

**Roles:**
- **Product Owner:** Define qué se construye
- **Scrum Master:** Facilita el proceso
- **Development Team:** Construye el producto

**Ceremonias:**
1. **Sprint Planning:** Planear el sprint (qué se hará)
2. **Daily Standup:** 15 min diarios (qué hice, qué haré, bloqueos)
3. **Sprint Review:** Demostrar lo construido
4. **Sprint Retrospective:** Qué mejorar como equipo

**Artefactos:**
- **Product Backlog:** Lista priorizada de todo el trabajo
- **Sprint Backlog:** Trabajo seleccionado para el sprint
- **Increment:** Producto funcional al final del sprint

**Estimación:**
- **Story Points:** Complejidad relativa (1, 2, 3, 5, 8, 13...)
- **Planning Poker:** Técnica de estimación en equipo

**Kanban:**
```
┌─────────┬─────────┬─────────┬─────────┐
│  TODO   │ IN PROG │ REVIEW  │  DONE   │
├─────────┼─────────┼─────────┼─────────┤
│ Task 1  │ Task 3  │ Task 5  │ Task 7  │
│ Task 2  │ Task 4  │         │ Task 8  │
└─────────┴─────────┴─────────┴─────────┘
```

---

## 🗃️ ORACLE vs PostgreSQL - GUÍA RÁPIDA

### Sintaxis básica

| Concepto | Oracle | PostgreSQL |
|----------|--------|------------|
| Autoincremento | SEQUENCE | SERIAL |
| Dual table | SELECT 1 FROM DUAL | SELECT 1 |
| String concat | 'Hello' \|\| 'World' | 'Hello' \|\| 'World' |
| Límite rows | ROWNUM <= 10 | LIMIT 10 |
| Fecha actual | SYSDATE | NOW() o CURRENT_TIMESTAMP |
| IFNULL | NVL(col, 0) | COALESCE(col, 0) |

### PL/SQL en Oracle

**Procedure:**
```sql
CREATE OR REPLACE PROCEDURE actualizar_cliente(
    p_id IN NUMBER,
    p_nombre IN VARCHAR2
) AS
BEGIN
    UPDATE clientes 
    SET nombre = p_nombre 
    WHERE id = p_id;
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
```

**Function:**
```sql
CREATE OR REPLACE FUNCTION calcular_interes(
    p_monto IN NUMBER,
    p_tasa IN NUMBER
) RETURN NUMBER AS
    v_interes NUMBER;
BEGIN
    v_interes := p_monto * (p_tasa / 100);
    RETURN v_interes;
END;
```

**Trigger:**
```sql
CREATE OR REPLACE TRIGGER trg_cliente_update
BEFORE UPDATE ON clientes
FOR EACH ROW
BEGIN
    :NEW.fecha_actualizacion := SYSDATE;
END;
```

### PostgreSQL equivalente

**Function (como Procedure):**
```sql
CREATE OR REPLACE FUNCTION actualizar_cliente(
    p_id INTEGER,
    p_nombre VARCHAR
) RETURNS VOID AS $$
BEGIN
    UPDATE clientes 
    SET nombre = p_nombre 
    WHERE id = p_id;
END;
$$ LANGUAGE plpgsql;
```

**Trigger:**
```sql
CREATE OR REPLACE FUNCTION trg_cliente_update_func()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_cliente_update
BEFORE UPDATE ON clientes
FOR EACH ROW
EXECUTE FUNCTION trg_cliente_update_func();
```

---

## 💡 PREGUNTAS TÉCNICAS QUE TE HARÁN

### Sobre Oracle:
1. **¿Cuál es la diferencia entre una Function y un Procedure en Oracle?**
   - Function retorna un valor, Procedure no
   - Function se usa en SELECT, Procedure se ejecuta standalone

2. **¿Cómo optimizarías una query lenta?**
   - Usar EXPLAIN PLAN
   - Agregar índices apropiados
   - Evitar SELECT *
   - Optimizar JOINs
   - Usar hints si es necesario

3. **¿Qué es un índice y cuándo lo usarías?**
   - Estructura que mejora velocidad de consultas
   - Usar en columnas de búsqueda frecuente
   - No abusar (ralentizan INSERT/UPDATE)

### Sobre APIs:
1. **Diseña una API para consultar el saldo de crédito de un cliente**
```
GET /api/creditos/cliente/:clienteId/saldo
Response:
{
  "success": true,
  "data": {
    "cliente_id": 123,
    "saldo_actual": 5000000,
    "cuota_mensual": 250000,
    "cuotas_pendientes": 20
  }
}
```

2. **¿Cómo manejarías autenticación?**
   - JWT tokens
   - OAuth2 para terceros
   - Refresh tokens
   - Rate limiting

3. **¿Qué status code usarías para cada operación?**
   - Ver tabla en sección APIs REST

### Sobre Seguridad:
1. **¿Cómo proteges datos sensibles como números de tarjeta?**
   - Encriptación en BD (AES-256)
   - Enmascaramiento en logs/UI
   - HTTPS obligatorio
   - Cumplir PCI-DSS

2. **Explica SQL Injection y cómo prevenirlo**
   - Inyección de código SQL malicioso
   - Prevención: Parameterized queries, ORMs, validación

3. **¿Qué es HTTPS y por qué es importante?**
   - HTTP + TLS/SSL
   - Encripta la comunicación
   - Previene man-in-the-middle

### Sobre Microservicios:
1. **¿Cuál es la diferencia entre monolito y microservicios?**
   - Ver diagrama en sección de microservicios

2. **¿Cómo se comunican los microservicios?**
   - APIs REST (síncrono)
   - Message queues (asíncrono)
   - gRPC (alta performance)

3. **Ventajas y desventajas**
   - Ver sección de microservicios

### Casos Prácticos:
1. **"Un cliente reporta que su aprobación de crédito está tardando mucho"**
   - Revisar logs del servicio
   - Verificar performance de queries
   - Checkear carga del servidor
   - Analizar tiempos de respuesta de APIs
   - Revisar timeouts y retry logic

2. **"Necesitamos escalar el sistema para Black Friday"**
   - Horizontal scaling (más instancias)
   - Load balancer
   - Caché (Redis)
   - CDN para assets estáticos
   - Database read replicas

---

## 📚 RECURSOS Y COMANDOS ÚTILES

### Comandos Docker útiles:
```bash
# Ver recursos usados
docker stats

# Limpiar contenedores detenidos
docker container prune

# Limpiar imágenes sin usar
docker image prune

# Ver redes
docker network ls

# Inspeccionar contenedor
docker inspect nombre-contenedor

# Ejecutar comando en contenedor
docker exec -it nombre-contenedor bash

# Copiar archivos
docker cp archivo.txt contenedor:/path/
```

### Testing con curl:
```bash
# GET
curl http://localhost:3001/api/clientes

# POST
curl -X POST http://localhost:3001/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"cedula":"123456","nombre":"Juan","apellido":"Perez","email":"juan@example.com"}'

# PUT
curl -X PUT http://localhost:3001/api/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Carlos"}'

# DELETE
curl -X DELETE http://localhost:3001/api/clientes/1
```

---

## 🎤 PREPARACIÓN PARA PREGUNTAS COMPORTAMENTALES

### ¿Por qué Flamingo?
**Estructura de respuesta:**
- Conexión con su misión (inclusión financiera, confianza)
- Transformación digital (VTEX, AWS, microservicios)
- Oportunidad de impacto en estratos 1-3
- Tecnologías modernas que quieres dominar

**Ejemplo:**
"Me interesa mucho Flamingo porque están en plena transformación digital, implementando arquitecturas modernas como microservicios y cloud. Su enfoque en inclusión financiera es inspirador, y me gustaría ser parte del equipo que está modernizando su plataforma de crédito para impactar positivamente a miles de familias colombianas."

### Describe un proyecto desafiante
**Framework STAR:**
- **S**ituation: Contexto
- **T**ask: Tu responsabilidad
- **A**ction: Qué hiciste
- **R**esult: Resultado

### ¿Cómo manejas conflictos en el equipo?
- Comunicación directa
- Buscar entender la perspectiva del otro
- Enfocarse en soluciones, no en culpas
- Escalar si es necesario

### Fortalezas y debilidades
**Fortalezas:**
- Rápido aprendizaje
- Experiencia sólida en APIs
- Proactivo en resolver problemas

**Debilidad (convertida en oportunidad):**
"Aunque no he trabajado directamente con Oracle, tengo experiencia sólida en PostgreSQL y MySQL, por lo que entiendo perfectamente los conceptos de bases de datos relacionales. Estoy emocionado por aprender Oracle específicamente y ya he comenzado a estudiar PL/SQL."

---

## ✅ CHECKLIST PRE-ENTREVISTA

### Día anterior:
- [ ] Revisar proyecto completo
- [ ] Repasar cheat sheets
- [ ] Leer sobre últimas noticias de Flamingo
- [ ] Preparar preguntas para el entrevistador
- [ ] Verificar conexión a internet
- [ ] Probar cámara y micrófono

### Día de la entrevista:
- [ ] Vestir apropiado (business casual)
- [ ] Tener agua cerca
- [ ] Papel y lápiz para notas
- [ ] Cerrar aplicaciones innecesarias
- [ ] Tener proyecto abierto por si lo piden ver
- [ ] Llegar 5 min antes (virtual)

---

## 📌 PREGUNTAS PARA HACER AL ENTREVISTADOR

1. ¿Cuál es el stack tecnológico actual del equipo?
2. ¿Cómo es un día típico en este rol?
3. ¿Qué proyectos están priorizando en los próximos meses?
4. ¿Cómo manejan el despliegue de nuevas funcionalidades?
5. ¿Cuál es el mayor desafío técnico que enfrenta el equipo actualmente?
6. ¿Qué oportunidades de crecimiento y aprendizaje hay?

---

## 🎯 ESTRATEGIA FINAL

### Enfócate en:
1. **Oracle:** Sintaxis básica y comparación con lo que sabes
2. **Microservicios:** Entender el concepto aplicado
3. **Docker:** Lo básico para explicar el proyecto
4. **Seguridad:** OWASP Top 3 (SQL Injection, XSS, Auth)
5. **Tu proyecto:** Explicar arquitectura y decisiones

### Durante la entrevista:
- **Piensa en voz alta** en problemas técnicos
- **Pregunta si algo no está claro**
- **Relaciona con tu experiencia**
- **Muestra entusiasmo por aprender**

### Recuerda:
> "No necesitas saberlo todo, necesitas demostrar que puedes aprenderlo rápido"

---

## 📧 CONTACTO Y SEGUIMIENTO

Después de la entrevista, envía un correo de agradecimiento en 24 horas:
- Agradecer el tiempo
- Reiterar interés
- Mencionar algo específico de la conversación
- Profesional pero breve

---

**¡ÉXITO EN TU ENTREVISTA! 🚀**

*Última actualización: Domingo 2 de Noviembre, 2025*
