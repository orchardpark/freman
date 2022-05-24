dev = {
    "server_url": "127.0.0.1",
    "server_port": 5000,
    "max_idle_time": 300,
    "sync_interval": 60,
    "protocol": "http",
    "api_key": ""
}

prd = {
    "server_url": "freman.pro",
    "server_port": 5000,
    "max_idle_time": 300,
    "sync_interval": 60,
    "protocol": "https",
    "api_key": ""
}


def get_config(is_development: bool):
    if is_development:
        return dev
    else:
        return prd
