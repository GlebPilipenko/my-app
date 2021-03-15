import axios from 'axios';

const newsApi = axios.create({
    baseURL: `${process.env.REACT_APP_NEWS_BASE_URL}`,
});

const apikey = process.env.REACT_APP_NEWS_API_KEY;

const getQueryParams = (query?: string, apikey?: string) => {
    return `everything?qInTitle="${query}"&language=en&pageSize=5&apiKey=${apikey}`;
};

export const getNewsCity = (city?: string) => newsApi.get<NewsAPIType>(
    getQueryParams(city, apikey));

export const getNewsCountry = (country?: string) => newsApi.get<NewsAPIType>(
    getQueryParams(country, apikey));

type SourceType = {
    id: string;
    name: string;
};

export type ArticlesType = {
    source: SourceType;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export type NewsAPIType = {
    status: string;
    totalResults: number;
    articles: ArticlesType[];
};
