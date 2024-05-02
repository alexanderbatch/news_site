class Config(object):
    DEBUG = True
    TESTING = False
    SECRET_KEY = 'your-secret-key'
    NEWS_API_KEY = 'your-api-key'  

class ProductionConfig(Config):
    pass

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True