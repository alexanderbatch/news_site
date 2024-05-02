import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/**
 * StyledNav defines main navigation bar style.
 */
const StyledNav = styled.nav`
  background-color: #282c34;
  min-height: 3.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  color: white;

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;

/**
 * Logo styles logo image within navigation bar.
 */
const Logo = styled.div`
  background-image: url('/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #fff;
  width: 50px;
  height: 50px;
  padding-left: 0.5rem;
  border-radius: 25px;
`;

/**
 * NavItems styles container for navigation items.
 */
const NavItems = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

/**
 * StyledLink styles individual navigation links.
 */
const StyledLink = styled(Link)`
  color: #61dafb;
  text-decoration: none;
  font-size: 1.3rem;
  margin-left: 1.25rem;
  padding: 0.5rem 0;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

/**
 * SearchInput styles input field for search functionality.
 */
const SearchInput = styled.input`
  padding: 0.5rem;
  margin-left: 1rem;
  width: 18.75rem;
  border-radius: 0.3rem;
  border: none;
  height: 2rem;

  @media (max-width: 600px) {
    margin-left: 0;
    width: 90%;
  }
`;

/**
 * SearchButton styles button for submitting search.
 */
const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4095c6;
  color: white;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-left: 0.2rem;
  height: 2rem;

  &:hover {
    background-color: #004a7c;
  }

  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 0.5rem;
  }
`;
  
/**
 * Navbar component provides top-level navigation for application.
 */
function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  /**
   * handleSearch executes navigation based on search term.
   */
  const handleSearch = () => {
    if (searchTerm.trim()) {
      const searchParams = new URLSearchParams({
        q: searchTerm.trim(),
        sortBy: 'publishedAt',
        pageSize: '20',
        language: 'en'
      });
      navigate(`/search?${searchParams.toString()}`);
    }
  };

  return (
    <StyledNav>
      <Link to="/">
        <Logo />
      </Link>
      <NavItems>
        <StyledLink to="/headlines">Top Headlines</StyledLink>
        <StyledLink to="/search">Advanced News Search</StyledLink>
        <SearchInput 
          type="text" 
          placeholder="Search news..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </NavItems>
    </StyledNav>
  );
}

export default Navbar;