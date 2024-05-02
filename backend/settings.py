import socket

def get_config():
    hostname = socket.gethostname()
    if 'dev' in hostname:
        from config import DevelopmentConfig
        return DevelopmentConfig
    else:
        from config import ProductionConfig
        return ProductionConfig