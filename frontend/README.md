# Frontend

The frontend component is responsible for displaying the Web UI to the user.

## Installation

To install the packages run `npm install`

## Development
To start the app in development mode run:
`npm start`

## Production

To build the app for production run `npm run build`.

Next to run the production appliication run `serve -s build -p 443 --ssl-cert /etc/letsencrypt/live/freman.pro/fullchain.pem --ssl-key /etc/letsencrypt/live/freman.pro/privkey.pem`. Replace the ssl cert and key arguments with the paths to your ssl certificate and key.

