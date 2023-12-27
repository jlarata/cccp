import './ButtonGoTop.css';
import { useEffect, useState } from 'react';


const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

function ButtonGoTop() {

  const [isScrolling, setIsScrolling] = useState(false);


  const handleEndScroll = () => {
    setTimeout(() => {
      setIsScrolling(false)
    }, 1000)
  }


  useEffect(() => {

    window.addEventListener('scroll', hideButtonGoTop)

  }, [])

  const hideButtonGoTop = () => {
    //console.log("scroll scroll scroll");
    setIsScrolling(true);
    handleEndScroll();
  }



  return (

    isScrolling ? null : <div className='goTopContainer'>
      <div className='goTop'
        onClick={scrollToTop}></div>
    </div>
  )
}

export default ButtonGoTop