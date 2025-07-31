FROM node:20-alpine

WORKDIR /app

# COPY pnpm-lock.yaml ./

COPY . .

RUN npm i -g pnpm@latest && pnpm i 

RUN pnpm run build

EXPOSE 5000

CMD ["pnpm", "run", "start"]