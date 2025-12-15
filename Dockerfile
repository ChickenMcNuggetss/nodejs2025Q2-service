FROM node:24-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

FROM node:24-alpine AS development

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 4000
CMD ["npm", "run", "start:dev"]

