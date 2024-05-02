import React from 'react';
import styled from 'styled-components';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, 
         FacebookMessengerShareButton, WhatsappShareButton,
         RedditShareButton, EmailShareButton,
         FacebookIcon, XIcon, LinkedinIcon, FacebookMessengerIcon, 
         WhatsappIcon, RedditIcon, EmailIcon
} from 'react-share';

/**
 * Card styled component for news card layout and styling.
 */
const Card = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .image-container {
    width: 100%;
    height: 0;
    padding-top: 60%;
    position: relative;
    overflow: hidden;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h3 {
    padding: 0.2rem 0.5rem;
    font-size: clamp(0.9rem, 2.25vw, 1.2rem);
  }

  .bottom-content {
    display: flex;
    width: 100%;
  }

  .social-media-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    width: calc(100% - 50px);
  }

  .date-source {
    padding: 0.2rem 0.5rem;
  }

  .source {
    font-weight: bold;
    color: #333;
  }

  .date-source {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: clamp(0.8rem, 1.5vw, 1rem);
    color: #666;
  }

  .date {
    font-size: 0.8rem;
  }

  .description {
    display: -webkit-box;
    -webkit-line-clamp: 9;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.9rem;
  }

  .author {
    font-size: 0.8rem;
    color: #666;
  }
`;

/**
 * SocialButton styled component for individual social media share buttons.
 */
const SocialButton = styled.div`
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

/**
 * NewsCard component renders individual news article card with sharing options.
 * @param {Object} article - Article data to be displayed.
 */
function NewsCard({ article }) {
  /**
   * Formats date string to 'MM/DD/YYYY' format.
   * @param {string} dateString - ISO date string.
   * @returns {string} Formatted date.
   */
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Card>
      <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="image-container">
          <img src={article.urlToImage} alt={article.title} />
        </div>
        <h3>{article.title}</h3>
        <div className="date-source">
          <p className="source">{article.source.name}</p>
          <p className="date">{formatDate(article.publishedAt)}</p>
        </div>
      </a>
      <div className="bottom-content">
        <div className="social-media-buttons">
          {[{ Button: FacebookShareButton, Icon: FacebookIcon },
            { Button: TwitterShareButton, Icon: XIcon },
            { Button: LinkedinShareButton, Icon: LinkedinIcon },
            { Button: RedditShareButton, Icon: RedditIcon },
            { Button: EmailShareButton, Icon: EmailIcon },
            { Button: WhatsappShareButton, Icon: WhatsappIcon },
            { Button: FacebookMessengerShareButton, Icon: FacebookMessengerIcon }
          ].map(({ Button, Icon }) => (
            <SocialButton key={Icon.name}>
              <Button url={article.url} target="_blank" rel="noopener noreferrer">
                <Icon size={24} round />
              </Button>
            </SocialButton>
          ))}
        </div>
        <div className="content">
          <div className="description">{article.description}</div>
          <p className="author">{article.author}</p>
        </div>
      </div>
    </Card>
  );
}

export default NewsCard;