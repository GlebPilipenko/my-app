import React, {ReactElement, useEffect, useState} from 'react';
import {ArticlesType, newsAPI} from '../../api/newsAPI';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import s from './News.module.css';

type PropsType = {
    city?: string
    country?: string
}

export const News: React.FC<PropsType> = (props) => {

    const [state, setState] = useState(() => {
        return {
            status: '',
            totalResults: null as null | number,
            articles: [{
                source: {
                    id: '',
                    name: ''
                },
                author: '',
                title: '',
                description: '',
                url: '',
                urlToImage: '',
                publishedAt: '',
                content: ''
            }]
        };
    });

    useEffect(() => {
        new Promise((resolve, reject) => newsAPI.getNewsCity(props.city)
            .then(cityResult => cityResult.data.totalResults === 0
                ? resolve(newsAPI.getNewsCountry(props.country))
                : resolve(cityResult)))
            .then((result: any) => {
                const {status, totalResults, articles} = result.data;
                setState({status, totalResults, articles});
            });
    }, []);

    return <Carousel showThumbs={false} infiniteLoop={true}>
        {state.articles.map((article: ArticlesType, index: number) => {
            return <div key={index} className={s.article__container}
                        style={{minHeight: '300px', color: '#eee'}}>
                <div className={s.article__block}>
                    <div className={`${s.author__block} ${s.text}`}>
                        <div>{article.author}</div>
                    </div>
                    <div className={`${s.title__block} ${s.text}`}>
                        {article.title}
                    </div>
                    <div className={`${s.description__block} ${s.text}`}>
                        {article.description}
                    </div>
                    <div className={s.url__block}>
                        <a className={s.text} target='_blank'
                           href={article.url}>Link: {article.url}</a>
                    </div>
                    <div className={s.article__imgWrapper}>
                        <img src={article.urlToImage} className={s.article__img}
                             alt="news"/>
                    </div>
                </div>
            </div>;
        })}
    </Carousel>;
};
;