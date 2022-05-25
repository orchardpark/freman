dev = {
    "server_url": "127.0.0.1",
    "server_port": 5000,
    "max_idle_time": 300,
    "sync_interval": 600,
    "protocol": "http",
}

prd = {
    "server_url": "",
    "server_port": 5000,
    "max_idle_time": 300,
    "sync_interval": 600,
    "protocol": "https",
}


def get_config(is_development: bool):
    if is_development:
        return dev
    else:
        return prd
