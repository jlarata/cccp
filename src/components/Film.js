import './Film.css'

export function Film(props)
{
    const film = props.film

    return(
        <div className="film">
            <img width={200} src={film.imgUrl}></img>
            <h3>{film.title}</h3>
            <p>{film.year}</p>
            <p>{film.director}</p>
            <p>{film.score}</p>

        </div>
    )

}