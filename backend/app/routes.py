import os
import requests
from flask import current_app, Blueprint, jsonify, request
import logging
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects

main = Blueprint('main', __name__)
logger = logging.getLogger(__name__)

class NewsAPI:
    """
    Class designed to interact with NewsAPI.org service, providing
    methods to fetch news data using provided API key. Class handles
    various network errors by retrying requests and logs errors appropriately.
    """
    BASE_URL = "https://newsapi.org/v2"

    def __init__(self, api_key):
        """
        Initializes NewsAPI object with necessary API key.

        Args:
            api_key (str): API key required to authenticate requests to
                           NewsAPI.org.
        """
        self.api_key = api_key

    def fetch(self, endpoint, params, retries=3):
        """
        Attempts to fetch data from specified NewsAPI endpoint. Method
        includes error handling for network-related errors and allows for
        retries on failures.

        Args:
            endpoint (str): Specific endpoint of NewsAPI to which
                            request is directed.
            params (dict): Dictionary of parameters to be sent in request.
            retries (int): Number of times to retry request upon failure
                           before giving up.

        Returns:
            tuple: Tuple containing JSON response data and HTTP status
                   code. In case of errors, returns dictionary detailing
                   error and associated status code.
        """
        url = f"{self.BASE_URL}/{endpoint}"
        params['apiKey'] = self.api_key
        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json(), 200
        except (ConnectionError, Timeout) as e:
            logger.error(f"Network problem (ConnectionError/Timeout): {str(e)}")
            if retries > 0:
                logger.info("Retrying...")
                return self.fetch(endpoint, params, retries - 1)
            else:
                return {'error': 'Network problem, failed to fetch data', 
                        'status_code': 503}, 503
        except TooManyRedirects as e:
            logger.error(f"Too many redirects: {str(e)}")
            return {'error': 'Too many redirects, check URL', 
                    'status_code': 500}, 500
        except requests.exceptions.RequestException as e:
            logger.error(f"Request failed: {str(e)}")
            return {'error': 'Request failed', 'status_code': 500}, 500

def prepare_and_fetch(endpoint, extra_params):
    """
    Function prepares necessary API key and parameters, invokes
    NewsAPI to fetch news data, and filters results based on specific
    criteria. Handles absence of API key and logs appropriate errors.
    Function returns Flask response object containing either news data
    or error message.

    Args:
        endpoint (str): Specific endpoint of NewsAPI to which request
                        is directed.
        extra_params (dict): Additional parameters to be included in API
                             request.

    Returns:
        Response: Flask response object containing either filtered news
                  data or error message, along with appropriate HTTP
                  status code.
    """
    api_key = current_app.config.get('NEWS_API_KEY', os.getenv('NEWS_API_KEY'))
    if not api_key:
        logger.error("API key is not available")
        return jsonify({'error': 'API key is missing'}), 500

    news_api = NewsAPI(api_key)
    default_params = {
        'pageSize': 100,
        'q': request.args.get('q', '')
    }
    default_params.update(extra_params)
    params = {k: v for k, v in default_params.items() if v}
    response, status_code = news_api.fetch(endpoint, params)
    if status_code == 200:
        articles = response.get('articles', [])
        filtered_articles = [
            {k: v for k, v in article.items() if v is not None and k not in [
                'author', 'description', 'urlToImage']} for article in articles
        ]
        for article, filtered_article in zip(articles, filtered_articles):
            for key in ['author', 'description', 'urlToImage']:
                if article.get(key):
                    filtered_article[key] = article[key]
        response['articles'] = filtered_articles
        return jsonify(response)
    else:
        return jsonify(response), status_code

@main.route('/headlines', methods=['GET'])
def get_headlines():
    """
    Endpoint for fetching top headlines based on category and country. Utilizes
    'top-headlines' endpoint of NewsAPI and allows users to specify category and
    country for news headlines. Function handles request, prepares parameters, and
    calls helper function to fetch and process data.

    Returns:
        Response: Flask response object containing either top headlines
                  data or error message, along with appropriate HTTP
                  status code.
    """
    extra_params = {
        'category': request.args.get('category'),
        'country': request.args.get('country', 'us')
    }
    return prepare_and_fetch('top-headlines', extra_params)

@main.route('/news', methods=['GET'])
def get_news():
    """
    Endpoint for fetching comprehensive news data based on date range, sort
    preference, and language. Targets 'everything' endpoint of NewsAPI, allowing
    users to specify parameters such as date range, sort order, and language to
    tailor news results to their preferences. Function processes request, sets up
    necessary parameters, and delegates to helper function to retrieve and filter
    news data.

    Returns:
        Response: Flask response object containing either detailed news
                  data or error message, along with appropriate HTTP
                  status code.
    """
    extra_params = {
        'from': request.args.get('from'),
        'to': request.args.get('to'),
        'sortBy': request.args.get('sortBy', 'publishedAt'),
        'language': request.args.get('language', 'en')
    }
    return prepare_and_fetch('everything', extra_params)