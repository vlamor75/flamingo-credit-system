 # ========================================
  # ETAPA 1: Base - Sistema Operativo + Node.js
  # ========================================
  FROM node:22-alpine

  # Metadata del contenedor
  LABEL maintainer="tu_email@example.com"
  LABEL description="Microservicio de Clientes - Sistema Flamingo"
  LABEL version="1.0"

  # ========================================
  # ETAPA 2: Configuración del entorno
  # ========================================

  # Crear directorio de trabajo
  WORKDIR /app

  # Copiar archivos de dependencias primero (cache layer)
  COPY package*.json ./

  # Instalar dependencias de producción
  # --omit=dev: No instala devDependencies
  # --silent: Menos logs
  RUN npm install --omit=dev --silent

  # ========================================
  # ETAPA 3: Copiar código fuente
  # ========================================

  # Copiar todo el código (respeta .dockerignore)
  COPY . .

  # ========================================
  # ETAPA 4: Seguridad
  # ========================================

  # Crear usuario no-root (mejora seguridad)
  # Por defecto Docker corre como root (peligroso)
  RUN addgroup -g 1001 -S nodejs && \
      adduser -S nodejs -u 1001

  # Dar permisos al usuario nodejs
  RUN chown -R nodejs:nodejs /app

  # Cambiar a usuario no-root
  USER nodejs

  # ========================================
  # ETAPA 5: Configuración de red
  # ========================================

  # Exponer puerto (documentación, no abre el puerto realmente)
  EXPOSE 3001

  # ========================================
  # ETAPA 6: Health Check
  # ========================================

  # Verificar que el servicio esté saludable cada 30s
  HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3001/health', (r) => {  process.exit(r.statusCode === 200 ? 0 : 1); });"

  # ========================================
  # ETAPA 7: Comando de inicio
  # ========================================

  # CMD: Comando por defecto al iniciar contenedor
  CMD ["node", "src/index.js"]