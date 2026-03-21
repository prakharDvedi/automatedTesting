# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies cleanly
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Stage 2: Production Execution
FROM node:18-alpine
WORKDIR /app

# Only copy over the built files to keep image size tiny
COPY --from=builder /app ./

EXPOSE 3001
CMD ["npm", "start"]
