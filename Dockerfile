FROM node:23.11.0
# app directory
WORKDIR /filament-manager
# copy everything in
COPY . .
# ========= FRONTEND STUFF =========
# create frontend
WORKDIR /filament-manager/frontend

RUN npm install
RUN npm run build

# ========= BACKEND STUFF =========
WORKDIR /filament-manager/server

#start the app
CMD ["node", "server.js"]