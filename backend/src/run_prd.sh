gunicorn --certfile=/etc/letsencrypt/live/freman.pro/fullchain.pem --keyfile=/etc/letsencrypt/live/freman.pro/privkey.pem -w 4 -b freman.pro:5000 app:app
