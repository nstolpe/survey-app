This is a full stack JavaScript application, with a Express server and a React client. It allows a user to take a survey defining their favorite colors and foods. The server and client each run in their own Docker container. There's also a third container running PostgreSQL for data persistence. The app requires Docker Desktop or Docker Engine and can be started by running `docker compose up` from the root directory.

Environment variables for all three containers are in the root level `.env` file. The server and database both include all environment variables. The client app has access to them all in `client/package.json` but needs to assign them at the beginning of that file's `start` script so they will be available as values on the `env` argument in `client/webpack.config.js`, where the entire `env` object is made available to the React app as `process.env`.

The client app is serve by `webpack-dev-server` which also handles hot reloading. It uses the `historyApiFallback` so urls besides `/` can be loaded or refreshed.

The server uses `nodemon` to reload after file changes. The client app will need to be manually refreshed to pick up on these changes.

The database can be accessed from the command line with `psql -U username -h localhost -p 3080 -d default_database`.
