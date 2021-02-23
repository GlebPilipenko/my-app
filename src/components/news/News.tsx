import React, {ReactElement, useEffect, useState} from 'react';
import {ArticlesType, newsAPI, NewsAPIType} from '../../api/newsAPI';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import style from './News.module.css';

type PropsType = {
    city?: string;
    country?: string;
}

export const News: React.FC<PropsType> = (props) => {

    const [state, setState] = useState<NewsAPIType>({
        status: '',
        totalResults: 0,
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
            return <div key={index} className={style.article__container}
                        style={{minHeight: '300px', color: '#eee'}}>
                <div className={style.article__block}>
                    <div className={style.article__item}>
                        <div
                            className={`${style.publishedAt__container} ${style.text}`}>
                            <span>
                                {`${new Date(article.publishedAt)
                                    .toString().slice(0, 21)}`}
                            </span>
                        </div>
                        <div className={`${style.title__block} ${style.text}`}>
                            <span>{article.title}</span>
                        </div>
                        <div className={`${style.author__block} ${style.text}`}>
                            <span className={style.author}>
                                {`By, ${article.author}`}
                            </span>
                        </div>
                        <div
                            className={`${style.description__block} ${style.text}`}>
                            <span>{article.description}</span>
                        </div>
                        <div className={style.url__block}>
                            <span>
                                <a className={style.text} target='_blank'
                                   href={article.url}>Link: {article.url}</a>
                            </span>
                        </div>
                    </div>
                    <div className={style.article__img_container}>
                        <img src={article.urlToImage}
                             className={style.article__img}
                             alt='news'/>
                    </div>
                </div>
            </div>;
        })}
    </Carousel>;
};
;