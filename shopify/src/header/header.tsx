import "./header.css"
import { useState } from 'react';

function header(){

  const [openMenu, setOpenMenu] = useState(false); 
  // on mobile screen the menu will be appeared and openMenu will be false until the user open it
  
    return(
        <div className='header'>
          <p className='company-name'>
            TISSO VISON
          </p>

          {/* 3 lines for the menu */}
          <div 
            className="burger" 
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          

          <p className='description'>
            Find the ideal gift for your loved ones.
          </p>
          <button className='choose-gift-button'>
            <span>CHOOSE GIFT</span>
            <span className='arrow'>→</span>
          </button>

          {/* when we open the menu*/}
           {openMenu && (
            <div className="menu">
              <h1 className="company-name-mobile">TISSO VISON</h1>
              <p className="description-moblie">Find the ideal gift for your loved ones.</p>
              <button className="action-btn-mobile">
                <span>CHOOSE GIFT</span>
                <span className='arrow'>→</span>
              </button>
            </div>
          )}
        </div>
    )
}

export default header;