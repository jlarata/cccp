import './Loading.css';
import { useEffect, useState } from 'react';


function Loading() {

 
  var randomLoadingIcon = Math.floor(Math.random() * 5);
  //console.log(randomLoadingIcon)
  
  

  useEffect(() => {
  }, [])

  return (

      <div>
        
      <div className=
      {(randomLoadingIcon === 0 ? 'lod loading0' :
        randomLoadingIcon === 1 ? 'lod loading1' :
        randomLoadingIcon === 2 ? 'lod loading2' :
        randomLoadingIcon === 3 ? 'lod loading3' : 'lod loading4'
        //randomLoadingIcon === 4 ? 'loading4' :
        //randomLoadingIcon === 5 ? 'loading5' : 'loading6'
        )}
      >
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