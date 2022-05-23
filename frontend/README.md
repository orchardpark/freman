# Frontend

The frontend component is responsible for displaying the Web UI to the user.

## Installation

To install the packages run `npm install`.
You need to rename the `config-example.tsx` to `config.tsx` and fill it with your configuration.

## Development
To start the app in development mode run:
`npm start`

## Production

To build the app for production run `npm run build`.

Next to run the production application run `serve -s build -p 443 --ssl-cert /path/to/your/cert.pem --ssl-key /path/to/your/key.pem`. Replace the ssl cert and key arguments with the paths to your ssl certificate and key.

