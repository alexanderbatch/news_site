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


function HeadlinesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParams = {
      country: params.get('country') || 'us',
      category: params.get('category') || '',
      pageSize: params.get('pageSize') || '100',
      q: params.get('q') || ''
    };
    fetchHeadlines(searchParams);
  }, []);

  const fetchHeadlines = (params = { country: 'us', pageSize: 100 }) => {
    const url = constructSearchUrl('http://localhost:5000/headlines', params);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.articles) {
          setArticles(data.articles);
        } else {
          console.error('No headlines found:', data);
          setArticles([]);
        }
      })
      .catch(error => console.error('Error fetching headlines:', error));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const country = formData.get('country-select') || 'us';
    const category = formData.get('category-select');
    const pageSize = formData.get('page-size-select') || '100';
    const query = formData.get('query');

    const params = { country, category, pageSize, q: query };
    updateURL(params);
    fetchHeadlines(params);
  };

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
              <input name="query" type="text" placeholder="Search headlines..." />
            </div>
            <div className="filter-group">
              <label htmlFor="country-select">Country:</label>
              <select id="country-select" name="country-select">
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="gb">United Kingdom</option>
                <option value="fr">France</option>
                <option value="de">Germany</option>
                <option value="it">Italy</option>
                <option value="es">Spain</option>
                <option value="cn">China</option>
                <option value="jp">Japan</option>
                <option value="kr">South Korea</option>
                <option value="in">India</option>
                <option value="br">Brazil</option>
                <option value="ru">Russia</option>
                <option value="au">Australia</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="category-select">Category:</label>
              <select id="category-select" name="category-select">
                <option value="">All</option>
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="general">General</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
              </select>
            </div>
            <div className="filter-group">
              <button type="submit">Fetch Headlines</button>
            </div>
          </SearchFiltersContainer>
        </form>
        <CardsContainer>
          {articles.map(article => (
            <NewsCard key={article.url} article={article} />
          ))}
        </CardsContainer>
      </Container>
    );
  }
  
  export default HeadlinesPage;
