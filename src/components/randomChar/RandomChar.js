import { useState, useEffect } from 'react';
import MarvelService from '../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

const RandomChar = () => {
    const [char, setChar] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const marvelService = new MarvelService()

    useEffect(() => {
        updataChar()
        const timerId = setInterval(updataChar, 60000)

        return () => {
            clearInterval(timerId)
        }
    }, [])

    const onCharLoaded = (char) => {
        setChar(char)
        setLoading(false)
    }

    const onCharLoading = () => {
        setLoading(true)
    }

    const onError = () => {
        setLoading(true)
        setError(true)
    }

    const updataChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        onCharLoading()
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error) ? <View char={char} /> : null

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updataChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div >
    )


}

const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki } = char

    const imgNotAvailable = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

    let styleImg = `randomchar__img`
    if (thumbnail === imgNotAvailable) {
        styleImg = `notImg`
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={styleImg} />

            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default RandomChar;

