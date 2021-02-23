import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_NEWS_BASE_URL}`,
});

export const newsAPI = {
    getNewsCity(city: string | undefined) {
        return instance.get<NewsAPIType>(
            `everything?q=${city}&pageSize=5&apiKey=${process.env.REACT_APP_API_KEY}`
        );
    },
    getNewsCountry(country: string | undefined) {
        return instance.get<NewsAPIType>(
            `everything?q=${country}&pageSize=5&apiKey=${process.env.REACT_APP_API_KEY}`
        )
            .then(countryResult => countryResult);
    }
};

type SourceType = {
    id: string;
    name: string;
}

export type ArticlesType = {
    source: SourceType;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export type NewsAPIType = {
    status: string;
    totalResults: number;
    articles: ArticlesType[];
}