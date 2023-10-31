import { Film } from './Film';

export function Films(){

    const allFilms = [
        {
        ccNumber: '066',
        imgUrl: 'https://a.ltrbxd.com/resized/sm/upload/ct/sk/hw/s3/f8HomPJlyPGIWgBODNbWQrRgjxW-0-500-0-750-crop.jpg?v=6aa2690b2e',
        title: 'The Brown Bunny',
        year: '2003',
        director: 'Vincent Gallo',
        score: '8,50'
        },
        {
        ccNumber: '067',
        imgUrl: 'https://a.ltrbxd.com/resized/sm/upload/pp/ya/j6/9k/kH7Jwo3Pv0pbosU4rzDafTigIZx-0-500-0-750-crop.jpg?v=5acfbde8a0',
        title: 'Swiss Army Man',
        year: '2016',
        director: 'Daniel Scheinert, Daniel Kwan',
        score: '1'
        }
    ]
    return (
        <>
        <div className="films-list">
            {allFilms.map((film) => {
                return <Film film={film}></Film>
            })}
        </div>
        </>
    )

}