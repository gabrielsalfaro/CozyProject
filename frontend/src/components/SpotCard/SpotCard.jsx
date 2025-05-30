function SpotCard({ spot }) {
    const price = spot.price;
    // function onFavoriteClick() {
    //     alert('clicked')
    // }

    return <div className="spot-card">
        <div className="spot-poster">
            <img src={spot.previewImage} alt={spot.name} />
            <div className="spot-overlay">
                {/* <button className="favorite-btn" onClick={onFavoriteClick}>
                    ☺
                </button> */}
            </div>
        </div>
        <div className="spot-info">
            {/* <h1>{spot.name}</h1> */}
            {/* {console.log('spot url: ',  spot.previewImage)} */}
            <p>{spot.city}, {spot.state}</p>
            <p>♥ {spot.avgRating}</p>
            <p className="price price-comma-separated">{new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(price)}</p>
        </div>
    </div>
}

export default SpotCard