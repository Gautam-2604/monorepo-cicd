FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /usr/src/app


COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml


COPY ./packages ./packages
COPY ./apps/ws ./apps/ws

RUN pnpm install

RUN pnpm run db:generate

EXPOSE 8081

CMD ["pnpm", "run", "start:ws"]
