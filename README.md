# News Search Website

## Overview
News Search is a website project for accessing the latest news articles
across various categories. It features user-friendly interface designed for efficient
discovery and reading, with content fetched from over 150,000 news sources
and blogs worldwide. It's built using React for frontend and Flask for backend.
The design also adapts to different screen sizes.

![News Search Preview](frontend/public/example_news_search.JPG)

## Features
- **Dynamic Content**: Fetches latest news articles from over 150,000 news sources
and blogs worldwide, powered by [NewsAPI](https://newsapi.org/).
- **Responsive Design**: Adapts to different screen sizes, providing optimal
  viewing experience on tablets, phones, and desktops.
- **Search Functionality**: Enables users to search for news based on keywords.
Advanced search capabilities include exact phrase matching, exclusion of unwanted
terms, and logical operators (AND, OR, NOT), as detailed in [NewsAPI
documentation](https://newsapi.org/docs/endpoints/everything). Example search: 
`"music" NOT "Taylor Swift"`.

## How It Can Be Helpful and Use Cases
- **Daily News Readers**: Stay updated with latest happenings around world. Utilize
advanced search capabilities to follow specific events, topics, or regions in
real-time.
- **Researchers**: Access vast database of historical and current articles to
support academic or market research. Use precise filtering by date, domain, or
language to find relevant information.
- **General Public**: Gain insights into different perspectives on global events.
Filter news by popularity or relevancy to see what's trending or most pertinent in
various parts of world.

## Setup and Usage
### Requirements
- **Frontend**:
  - Node.js and npm installed
  - Modern web browser with JavaScript enabled
- **Backend**:
  - Python 3.8 or higher
  - Flask installed via pip
  - An API key from NewsAPI

### Installation and Configuration
1. **Clone repository:**
   ```bash
   git clone https://github.com/alexanderbatch/news_site.git
   ```
2. **Install dependencies:**
   ```bash
   cd site_news/frontend
   npm install
   cd ../backend
   pip install -r requirements.txt
   ```
3. **Obtain an API key from NewsAPI:**
   - Visit [NewsAPI](https://newsapi.org/register) to register and obtain your API
   key.
   - Note: The free Developer plan is suitable for development and testing, allowing up to 100 requests per day with articles up to a month old. For production environments and access to real-time articles, a paid plan is needed. More details on [NewsAPI Pricing](https://newsapi.org/pricing).

4. **Configure API key:**
   - Store API key in secure location such as environment variables or
   configuration file that is not tracked by version control.

### Running Application
5. **Start backend server:**
   ```bash
   python backend/run.py
   ```
6. **Start frontend:**
   ```bash
   cd frontend
   npm start
   ```

## Todo List
- [ ] Add news source filter.
- [ ] Implement constants file.
- [ ] Provide article previews instead of direct routing.
- [ ] Add search stats such as article count, unique sources, average sentiment.

## Created By
- **Alexander Batch** - Initial work - [My GitHub](https://github.com/alexanderbatch)