# syntax=docker/dockerfile:1

# ============================================================
#  GLG Landing — imagine Docker (Next.js 16, output standalone)
#  Se construiește și pornește din compose-ul aplicației:
#    cd C:\Users\admin\Desktop\practica-glg
#    docker compose -f docker-compose.app.yml up -d --build
# ============================================================

# --- Etapa 1: dependențe ---
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- Etapa 2: build ---
FROM node:24-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# `next build` (Next 16 folosește Turbopack implicit). Verificăm explicit că
# output-ul standalone are server.js la rădăcină — dacă Next schimbă structura,
# build-ul pică aici, nu tăcut la runtime.
RUN npm run build && test -f .next/standalone/server.js

# --- Etapa 3: runtime (doar output-ul standalone) ---
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1

# utilizator non-root
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

# standalone conține server.js + node_modules minime; static și public
# nu sunt incluse și trebuie copiate separat
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
