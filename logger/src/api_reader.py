def get_key():
    with open('api_key.txt') as fin:
        return fin.read().strip()
