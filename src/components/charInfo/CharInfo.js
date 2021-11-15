import { useState, useEffect } from 'react'
import useMarvelService from '../../services/MarvelService'
import PropTypes from 'prop-types'
import setContent from '../../utils/setContent'



import './charInfo.scss'

const CharInfo = (props) => {
    const [char, setChar] = useState(null)
    const { getCharacter, clearError, process, setProcess } = useMarvelService()

    useEffect(() => {
        updateChar()
    }, [props.charId])


    const updateChar = () => {
        const { charId } = props
        if (!charId) {
            return
        }
        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail, home, wiki, comics } = data
    let noComics = 'Comics:'
    if (comics == 0) {
        noComics = 'Comics: There is no comics'
    }

    const imgNotAvailable = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

    let styleImg = { 'objectFit': 'cover' }
    if (thumbnail === imgNotAvailable) {
        styleImg = { 'objectFit': 'contain' }
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleImg} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={home} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr"> {description}</div>
            <div className="char__comics">{noComics}</div>
            <ul className="char__comics-list">
                {
                    comics.map((item, i) => {
                        if (i > 9) return
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}
export default CharInfo