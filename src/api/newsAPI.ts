import axios from 'axios'

const instance = axios.create({
    baseURL: `https://newsapi.org/v2/`,
})

export const newsAPI = {

    getNewsCity(city: string | undefined) {
        return instance.get<ResponseType>(`everything?q=${city}&pageSize=5&apiKey=3f5e76e0b91f43839b035a730b7ca455`)
    },

    getNewsCountry(country: string | undefined) {
        return instance.get<ResponseType>(`everything?q=${country}&pageSize=5&apiKey=3f5e76e0b91f43839b035a730b7ca455`)
            .then(countryResult => countryResult)
    }
}

type SourceType = {
    id: string
    name: string
}

export type ArticlesType = {
    source: SourceType
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
}

export type ResponseType = {
    status: string
    totalResults: null | number
    articles: ArticlesType[]
}