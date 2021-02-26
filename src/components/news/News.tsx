import React, {useEffect, useState} from 'react';
import {
    ArticlesType,
    getNewsCity,
    getNewsCountry,
    NewsAPIType
} from '../../api/newsAPI';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import style from './News.module.css';
import {getFormatedDate, getDateToTimeStamp} from '../../utils/GetFormatedDate';

type PropsType = {
    city?: string;
    country?: string;
};

export const News: React.FC<PropsType> = ({city, country}) => {
    const [state, setState] = useState<NewsAPIType | null>(() => null);
    const [error, setError] = useState<any>(null);

    const changeState = (res: any) => {
        setState(res.data);
    };

    useEffect(() => {
        (async () => {
            try {
                const resCity = await getNewsCity(city);
                const resCountry = await getNewsCountry(country);
                if (resCity.data.totalResults === 0) {
                    changeState(resCountry);
                    if (resCountry.data.totalResults === 0) {
                        setError(`Sorry, no news...`);
                    }
                } else {
                    changeState(resCity);
                }
            } catch (e) {
                !e.response ? setError('Your request is blocked')
                    : setError(e.response.data.message);
            }
        })();
    }, [city, country]);

    if (!state) {
        return <div>{error}</div>;
    }

    if (state.totalResults === 0) {
        return <div className={style.text}>{error}</div>;
    }

    return <div>
        <Carousel showThumbs={false} infiniteLoop={true}>
            {state.articles.map((article: ArticlesType, index: number) => {
                const date = new Date(article.publishedAt).toString();

                return <div key={index} className={style.article__container}
                            style={{minHeight: '300px', color: '#eee'}}>
                    <div className={style.article__block}>
                        <div className={style.article__item}>
                            <div
                                className={`${style.publishedAt__container} ${style.text}`}>
                                <span>{getFormatedDate(getDateToTimeStamp(date))}</span>
                            </div>
                            <div
                                className={`${style.title__block} ${style.text}`}>
                                <span>{article.title}</span>
                            </div>
                            <div
                                className={`${style.author__block} ${style.text}`}>
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
                                <a className={style.text} rel="noreferrer"
                                   target="_blank"
                                   href={article.url}>Link: {article.url}</a>
                            </span>
                            </div>
                        </div>
                        <div className={style.article__img_container}>
                            <img src={article.urlToImage}
                                 className={style.article__img} alt='news' />
                        </div>
                    </div>
                </div>;
            })}
        </Carousel>
    </div>;
};
