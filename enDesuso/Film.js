import './Film.css'


export function Film(props)
{
    const film = props.film

    return(
        <div className="film">
            <div className="filmPoster">
                <img width={200} src={film.imgUrl}></img>
            </div>
            <div className="filmInfo">
                <p>CC# {film.ccNumber}</p>
                <h3>{film.title}</h3>
                <p>{film.year}, {film.origin}</p>
                <p>Dirigida por {film.director}</p>
                <p>Puntaje CC: {film.score}</p>
                <p>Invitó: {film.ccMember}, el {film.ccDate}</p>
            </div>

        </div>
    )

}