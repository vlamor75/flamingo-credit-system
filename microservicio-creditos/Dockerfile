# Base - Node.js 22 Alpine
FROM node:22-alpine

# Metadata
LABEL maintainer="tu_email@example.com"
LABEL description="Microservicio de Créditos - Sistema Flamingo"
LABEL version="1.0"

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --omit=dev --silent

# Copiar código fuente
COPY . .

# Crear usuario no-root (seguridad)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Dar permisos
RUN chown -R nodejs:nodejs /app

# Cambiar a usuario no-root
USER nodejs

# Exponer puerto
EXPOSE 3002

# Health Check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3002/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1); });"

# Comando de inicio
CMD ["node", "src/index.js"]
