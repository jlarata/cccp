import './ButtonGoTop.css';

function ButtonGoTop() {

  

    const scrollToTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }

    return (
        <div className='goTopContainer'>
        <div className='goTop'
        onClick={scrollToTop}></div>
      </div>
    )
}

export default ButtonGoTop