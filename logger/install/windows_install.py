import requests
import wget
import zipfile
import os

api_key = input("Please enter the API key obtained from the Accounts page: ")
print("Checking API token", api_key)
headers = {
        'Authorization': 'Bearer {}'.format(api_key)
    }
url = "https://freman.pro:5000/v1/validate_token"
res = requests.get(url, headers=headers)
if res.status_code == 200:
    print('Valid token!')
else:
    print('Invalid token, please try again')
    quit(1)

print("Getting files")
wget.download('https://github.com/orchardpark/freman/releases/download/v1/logger_windows_v1.zip')
with zipfile.ZipFile('logger_windows_v1.zip') as zip_ref:
    zip_ref.extractall('.')
print("Creating API key file")
with open('logger/api_key.txt', 'w') as fout:
    print(api_key, file=fout)
os.remove('logger_windows_v1.zip')

print("Installation complete")
