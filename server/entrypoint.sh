#!/bin/sh
echo 'Running migrations'
npx sequelize-cli db:migrate
exec node server.js

