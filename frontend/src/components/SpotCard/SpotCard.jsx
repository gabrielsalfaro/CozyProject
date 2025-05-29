function SpotCard({ spot }) {
    // function onFavoriteClick() {
    //     alert('clicked')
    // }

    return <div className="spot-card">
        <div className="spot-poster">
            <img src={spot.url} alt={spot.name} />
            <div className="spot-overlay">
                {/* <button className="favorite-btn" onClick={onFavoriteClick}>
                    ☺
                </button> */}
            </div>
        </div>
        <div className="movie-info">
            {/* <h1>{spot.name}</h1> */}
            <p>{spot.city}, {spot.state}</p>
            <p>♥ {spot.avgRating}</p>
            <p>{spot.price}</p>
        </div>
    </div>
}

export default SpotCard