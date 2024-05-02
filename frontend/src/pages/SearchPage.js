import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsCard from '../components/NewsCard';
import { constructSearchUrl } from '../utils/searchUtils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
`;

const SearchFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  width: 100%;
  max-width: 75rem;
  margin-bottom: 1.25rem;
  padding: 0 0.625rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: start;
  }

  .filter-group {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }

  input[type="text"], input[type="date"], select {
    font-size: 1rem;
    padding: 0.4em 0.5em;
    margin-right: 0.5em;
    border: 2px solid #ccc;
    border-radius: 0.5em;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: border-color 0.3s;

    &:focus {
      border-color: #0056b3;
      outline: none;
    }
  }

  select:hover, button:hover {
    cursor: pointer;
  }

  label {
    margin-right: 0.5rem;
  }

  button {
    padding: 0.4em 0.8em;
    background-color: #4095c6;
    color: white;
    border: none;
    border-radius: 0.5em;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #004a7c;
    }
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
  gap: 0.625rem;
  width: 100%;
  max-width: 1200px;
  padding: 0 0.625rem;
  min-height: 300px;
`;

/**
 * SearchPage component handles rendering search interface and news cards.
 */
function SearchPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParams = {
      q: params.get('q') || '',
      sortBy: params.get('sortBy') || 'publishedAt',
      pageSize: params.get('pageSize') || '100',
      language: params.get('language') || 'en',
      from: params.get('from') || '',
      to: params.get('to') || ''
    };
    fetchNews(searchParams);
  }, []);

  /**
   * Fetches news articles based on provided search parameters.
   * @param {Object} params - Search parameters for news query.
   */
  const fetchNews = (params = { language: 'en', sortBy: 'publishedAt', 
                     pageSize: 100 }) => {
    const url = constructSearchUrl('http://localhost:5000/news', params);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.articles) {
          setArticles(data.articles);
        } else {
          console.error('No news found:', data);
          setArticles([]);
        }
      })
      .catch(error => console.error('Error fetching news:', error));
  };

  /**
   * Handles search form submission, updates URL, and fetches news.
   * @param {Event} event - Form submission event.
   */
  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get('query') || '';
    const sortBy = formData.get('sort-select') || 'publishedAt';
    const pageSize = formData.get('page-size-select') || '100';
    const language = formData.get('language-select') || 'en';
    const from = formData.get('from-date');
    const to = formData.get('to-date');

    const params = { q: query, sortBy, language, from, to, pageSize };
    updateURL(params);
    fetchNews(params);
  };

  /**
   * Updates browser URL with current search parameters.
   * @param {Object} params - Search parameters.
   */
  const updateURL = (params) => {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => params[key] && url.searchParams.set(key, params[key]));
    window.history.pushState({}, '', url);
  };

  return (
    <Container>
      <form onSubmit={handleSearch}>
        <SearchFiltersContainer>
          <div className="filter-group">
            <input name="query" type="text" placeholder="Search news..." />
          </div>
          <div className="filter-group">
            <label htmlFor="language-select">Language:</label>
            <select id="language-select" name="language-select">
              <option value="en">English</option>
              <option value="">All Languages</option>
              <option value="es">Spanish</option>
              <option value="it">Italian</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="pt">Portuguese</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="sort-select">Sort by:</label>
            <select id="sort-select" name="sort-select">
              <option value="publishedAt">Published At</option>
              <option value="popularity">Popularity</option>
              <option value="relevancy">Relevancy</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="from-date">From:</label>
            <input type="date" id="from-date" name="from-date" />
          </div>
          <div className="filter-group">
            <label htmlFor="to-date">To:</label>
            <input type="date" id="to-date" name="to-date" />
          </div>
          <div className="filter-group">
            <button type="submit">Fetch News</button>
          </div>
        </SearchFiltersContainer>
        <CardsContainer>
          {articles.map(article => (
            <NewsCard key={article.url} article={article} />
          ))}
        </CardsContainer>
      </form>
    </Container>
  );
}

export default SearchPage;

