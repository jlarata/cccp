import './Loading.css';
import { useEffect, useState } from 'react';


function Loading() {

  useEffect(() => {


  }, [])




  return (


        <div>
      <div className='loading'>
      <div className="lds-spinner">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div>
      <div className='legend-box'>
        <p className='loading-legend'>Loading...</p>
      </div>
      </div>
      
      
    </div>
  )
}

export default Loading