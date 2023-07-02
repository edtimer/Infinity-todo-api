# FROM node:16 AS builder

# # Create app directory
# WORKDIR /app

# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./
# COPY prisma ./prisma/

# # Install app dependencies
# # RUN npm install
# RUN yarn install

# COPY . .

# # RUN npm run build
# RUN yarn run build

# FROM node:16

# WORKDIR /app

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist
# COPY prisma ./prisma/
# COPY entrypoint.staging.sh ./

# EXPOSE 9000
# # CMD [ "npm", "run", "start:prod" ]
# CMD [ "source","entrypoint.staging.sh" ]





FROM node:16 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
# RUN npm install
RUN yarn install

COPY . .

# RUN npm run build
RUN yarn run build

# FROM node:16

# WORKDIR /app

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist
# COPY prisma ./prisma/
# COPY entrypoint.staging.sh ./

EXPOSE 9000
# CMD [ "npm", "run", "start:prod" ]
# CMD [ "source","entrypoint.staging.sh" ]
CMD sh ./entrypoint.staging.sh