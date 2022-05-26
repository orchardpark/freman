#!/bin/sh
echo Please enter tye API key obtained from the 'Accounts' page.
read api_token
echo Checking api toke $api_token
URL="http://localhost:5000/validate_token"
header="Authorization: Bearer "$api_token
response=$(curl -s -w "%{http_code}" -H "$header" $URL)
http_code=$(tail -n1 <<< "$response")
http_code=${http_code: -3}
if [[ $http_code -eq 200 ]]
then
	echo Valid token!
else
	echo Invalid API token, try again.
fi

echo Installing dependencies
pacman -S xdotool --noconfirm
echo Getting files
echo Create API key file
echo Installation complete
