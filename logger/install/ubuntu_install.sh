#!/bin/sh
echo Please enter tye API key obtained from the 'Accounts' page.
read api_token
echo Checking api token $api_token
URL="https://freman.pro:5000/v1/validate_token"
header="Authorization: Bearer "$api_token
response=$(curl -s -w "%{http_code}" -H "$header" $URL)
http_code=$(tail -n1 <<< "$response")
http_code=${http_code: -3}
if [[ $http_code -eq 200 ]]
then
	echo Valid token!
else
	echo Invalid API token, try again.
	exit 1
fi

echo Installing dependencies
apt install -Y xdotool
echo Getting files
wget https://github.com/orchardpark/freman/releases/download/v1/logger_linux_v1.zip
unzip logger_linux_v1
echo Create API key file
touch logger/api_key.txt
cat $api_token > logger/api_key.txt
echo Installation complete!
