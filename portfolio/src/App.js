import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState, useRef } from 'react';
import Dot from "./Dot";
import './App.css';

const DIVIDER_HEIGHT = 5;

const App = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const maxSize = () => Math.max(window.innerWidth, window.innerHeight);
    const getRandomX = () => Math.random() * maxSize();
    const getRandomY = () => Math.random() * maxSize();
    const randomRadius = () => Math.random() * 0.7 + 0.6;
    const _size = Math.floor(maxSize() / 2);

    const svgElement = document.getElementById('stars');

    const makeStars = () => {
      svgElement.innerHTML = '';

      for (let i = 0; i < _size; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('class', 'star');
        circle.setAttribute('cx', getRandomX());
        circle.setAttribute('cy', getRandomY());
        circle.setAttribute('r', randomRadius());
        svgElement.appendChild(circle);
      }
    };


    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
    
      setIsVisible(scrollY < windowHeight);
    };
    
    // const handleScroll = () => {
    //   const scrollY = window.scrollY || window.pageYOffset;
    //   const windowHeight = window.innerHeight;

    //   if (scrollY >= windowHeight) {
    //     setIsVisible(false); 
    //   } else {
    //     setIsVisible(true); 
    //   }
    // };

    makeStars();

    const updateStars = () => {
      if (isVisible) {
        makeStars();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateStars);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateStars);
    };
  }, [isVisible]);

  // 스크롤이미지
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowScroll(scrollPosition === 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //scroll page
  const outerDivRef = useRef();
  const [scrollIndex, setScrollIndex] = useState(1);
  const scrollToPage = (pageNumber) => {
    const pageHeight = window.innerHeight;
    const dividerHeight = 5;

    if (pageNumber === 1) {
      outerDivRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setScrollIndex(1);
    } else if (pageNumber === 2) {
      outerDivRef.current.scrollTo({
        top: pageHeight + dividerHeight,
        left: 0,
        behavior: "smooth",
      });
      setScrollIndex(2);
    } else if (pageNumber === 3) {
      outerDivRef.current.scrollTo({
        top: (pageHeight * 2) + (dividerHeight * 2),
        left: 0,
        behavior: "smooth",
      });
      setScrollIndex(3);
    } else if (pageNumber === 4) {
      outerDivRef.current.scrollTo({
        top: (pageHeight * 3) + (dividerHeight * 3),
        left: 0,
        behavior: "smooth",
      });
      setScrollIndex(4);
    }
  };

  
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current;
      const pageHeight = window.innerHeight;
  
      if (deltaY > 0) {
        // 스크롤 내릴 때
        // 현재 페이지가 아니면 다음 페이지로 이동
        const nextPageIndex = Math.floor(scrollTop / pageHeight) + 1;
        const nextScrollTop = nextPageIndex * pageHeight + DIVIDER_HEIGHT * nextPageIndex;
  
        outerDivRef.current.scrollTo({
          top: nextScrollTop,
          left: 0,
          behavior: "smooth",
        });
        setScrollIndex(nextPageIndex + 1);
      } else {
        // 스크롤 올릴 때
        // 현재 페이지가 아니면 이전 페이지로 이동
        const prevPageIndex = Math.floor(scrollTop / pageHeight);
        if (prevPageIndex > 0) {
          const prevScrollTop = (prevPageIndex - 1) * pageHeight + DIVIDER_HEIGHT * (prevPageIndex - 1);
  
          outerDivRef.current.scrollTo({
            top: prevScrollTop,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(prevPageIndex);
        }
      }
    };
  
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
  
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);
  
  return (
    <div ref={outerDivRef} className="outer">
      <Dot scrollIndex={scrollIndex} scrollToPage={scrollToPage} className="dot"/>
      <Navbar className="navbar">
        <Container>
          <Navbar.Brand href="#" className='name'>JS Park</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            <a href='https://github.com/js3617'>
              <svg 
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="github"
                className="svg-inline--fa fa-github"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
                width="30"
                height="30">
                <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z">
                </path>
              </svg>
            </a>

            <a target="_blank" rel="noreferrer" href="mailto:a332210@naver.com">
              <svg 
              aria-hidden="true" 
              focusable="false" 
              data-prefix="fas" 
              data-icon="envelope" 
              class="svg-inline--fa fa-envelope " 
              role="img" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 512 512"
              width="30"
              height="30">
                <path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z">
                </path>
              </svg>
            </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      {/* 스크롤 이미지 */}
      {/* <div className={showScroll ? 'scroll-downs hidden' : 'scroll-downs'}>
        <div className="scroll-downs">
          <div className="mousey">
            <div className="scroller"></div>
          </div>
          <span className="scroll-down">Scroll Down</span>
        </div>
      </div> */}

      <div className={showScroll ? 'scroll-downs' : 'scroll-downs hidden'}>
        <div className="mousey">
          <div className="scroller"></div>
        </div>
        <span className="scroll-down">Scroll Down</span>
      </div>


        {isVisible && (
        <div className="backSky">
          <svg id="stars" className="sky" style={{position:'relative'}}></svg>
        </div>
        )}

      {/* page 분할 실험중 */}
      <TopButton />
      <div className="inner bg-yellow">1</div>
      <div className="divider"></div>
      <div className="inner bg-blue">2</div>
      <div className="divider"></div>
      <div className="inner bg-pink">3</div>
    </div>
  );
};

function TopButton(){

  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top : 0,
      behavior: 'smooth'
    })

  }
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 200){
        setShowButton(true)
      }else {
        setShowButton(false)
      }
    }

    console.log(window.scrollY)
    window.addEventListener("scroll", handleShowButton)
    return () => {
      window.removeEventListener("scroll", handleShowButton)
    }
  }, [])

  return showButton && (
    <div className='scroll__container'>
      <button id='top' onClick={scrollToTop} type='button'>top</button>
    </div>
  )
}

export default App;