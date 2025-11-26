# Filament Manager
manage filament for 3d printing. 


# Screenshots
![dashboard](project-resources/dashboard.png)
![spoolpage](project-resources/spoolpage.png)

# Installation (Docker):
1. copy `template.env` into a `.env` and change the database password.
2. (Optional) Change the app port in the `.env`
2. `docker compose up -d`

# Installation (Manual):
1. copy `template.env` into a `.env` and change the database password.
2. (Optional) Change the app port in the `.env`
3. Go into the `/filament-manager/frontend` and `npm install` followed by `npm run build`
4. Go into `/filament-manager/server` and `npm install`.
5. `node server.js`

* I probably forgot something to be honest, I use docker to run the app. 