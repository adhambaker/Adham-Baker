import "./cover.css"

function cover(){
    return(
        <div className='cover'>
        <div className='inside-cover'>
          <h1>The Gift Gide</h1>
          <p>
            Discover Joy:Your Ultimate Holiday Gift Destination.
            Explore our curated selection and find the perfect gifts to 
            delight your loved ones this holiday season.
          </p>
          <button className='shop-now-button'>
            <span>SHOP NOW</span>
            <span className='arrow'>→</span>
          </button>
        </div>
      </div>
    )
}

export default cover;