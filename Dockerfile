FROM node:23.11.0
# app directory
WORKDIR /filament-manager/

# load .env
COPY .env /filament-manager/
# ========= FRONTEND STUFF =========
# create frontend
COPY frontend/ /filament-manager/frontend/
WORKDIR /filament-manager/frontend

RUN npm install
RUN npm run build

# ========= BACKEND STUFF =========
COPY server/ /filament-manager/server/
WORKDIR /filament-manager/server/

RUN npm install

# apply sequelize database migrations
#ORKDIR /filament-manager/server/setup/
ENTRYPOINT ["bash", "entrypoint.sh"]

#WORKDIR /filament-manager/server/
#start the app
#CMD ["node", "server.js"]