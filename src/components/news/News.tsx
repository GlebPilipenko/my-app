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
import {ErrorMessage} from '../common/errorMessage/ErrorMessage';

type PropsType = {
    city?: string;
    country?: string;
};

export const News: React.FC<PropsType> = ({city, country}) => {
    const [state, setState] = useState<NewsAPIType | null>(() => null);
    const [error, setError] = useState<any>(null);
    const defaultImg = process.env.REACT_APP_DEFAULT_IMG_URL
    const changeState = (res: any) => {
        setState(res.data);
    };

    useEffect(() => {
        (async () => {
            try {
                const resCity = await getNewsCity(city);
                const resCountry = await getNewsCountry(country);
                const dataCity = resCity.data;
                const dataCountry = resCountry.data;

                if (dataCity.totalResults === 0 || undefined) {
                    if (dataCountry.totalResults === 0 || undefined) {
                        setError(`No news, enter the correct city or country.`);
                    } else {
                        changeState(resCountry);
                    }
                } else {
                    changeState(resCity);
                }
            } catch (e) {
                !e.response && setError('Your request is blocked');
            }
        })();
    }, [city, country]);

    if (!state) {
        return <ErrorMessage errorMessage={error} />;
    }

    if (!city && !country) {
        return <ErrorMessage
            errorMessage={'There are no attributes for correct display.'} />;
    }

    if (state.totalResults === 0) {
        return <ErrorMessage errorMessage={error} />;
    }

    return (
        <div>
            <Carousel showThumbs={false} infiniteLoop={true}>
                {state.articles.map((article: ArticlesType, index: number) => {
                    const date = new Date(article.publishedAt).toString();
                    const getDefaultImgUrl = () => {
                        return article.urlToImage === null
                            ? defaultImg
                            : article.urlToImage;
                    };

                    return (
                        <div key={index} className={style.article__container}
                             style={{minHeight: '300px', color: '#eee'}}>
                            <div className={style.article__block}>
                                <div className={style.article__item}>
                                    <div
                                        className={`${style.publishedAt__container}
                                        ${style.text}`}>
                                        <span>
                                            {getFormatedDate(getDateToTimeStamp(date))}
                                        </span>
                                    </div>
                                    <div
                                        className={`${style.title__block}
                                        ${style.text}`}>
                                        <span>{article.title}</span>
                                    </div>
                                    <div className={`${style.author__block}
                                    ${style.text}`}>
                                        <span className={style.author}>
                                            {`By, ${article.author}`}
                                        </span>
                                    </div>
                                    <div className={`${style.description__block}
                                    ${style.text}`}>
                                        <span>{article.description}</span>
                                    </div>
                                    <div className={style.url__block}>
                                        <span>
                                            <a className={style.text}
                                               rel="noreferrer"
                                               target="_blank"
                                               href={article.url}>
                                                Link: {article.url}
                                            </a>
                                        </span>
                                    </div>
                                </div>
                                <div className={style.article__img_container}>
                                    <img className={style.article__img}
                                         src={getDefaultImgUrl()}
                                         alt='news' />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
};