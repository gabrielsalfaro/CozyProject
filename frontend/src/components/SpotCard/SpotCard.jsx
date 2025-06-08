import { Link } from "react-router-dom";
import './SpotCard.css';
import { FaRegStar } from "react-icons/fa";
// import SpotDetails from "../SpotDetails/SpotDetails";

function SpotCard({ spot }) {
    // console.log('>>> ', spot)
    const price = spot.price;
    const currencyFormat = num =>
        '$' + Math.floor(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      


    return (
    <>
        <div className="spot-card">
            <div className="spot-image">
            <Link to={`/spots/${spot.id}`}>
                <img src={spot.previewImage} alt={spot.name} />
            </Link>
                
                <div className="spot-overlay">
                </div>
            </div>
            <div className="spot-info">
                {/* <h1>{spot.name}</h1> */}
                {/* {console.log('spot url: ',  spot.previewImage)} */}
                <div>
                    <div>{spot.city}, {spot.state}</div>
                    <li className='spacer'>{/* SPACER */}</li>
                    <div className="rating">
                            {Number(spot.numReviews) === 0 || !spot.avgRating ? (
                            <span><FaRegStar /> New</span>
                            ) : (
                            <span><FaRegStar /> {Number(spot.avgRating).toFixed(1)}</span>
                            )}
                    </div>
                </div>
                
                <p className="price">{currencyFormat(price)}
                    <span style={{ fontSize: '14px' }}>per night</span>
                </p> 
            </div>
        </div>
    </>
    )
}

export default SpotCard;