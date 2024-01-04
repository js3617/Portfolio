import React, { useState } from 'react';

const Dot = ({ num, scrollIndex, scrollToPage }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    scrollToPage(num);
  };

  return (
    <div
      style={{
        marginLeft: 18,
        width: 60,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <button
        style={{
          width: 5,
          height: 5,
          border: 'white',
          borderRadius: '50%',
          backgroundColor: scrollIndex === num ? '#17F997' : 'white',
          transition: 'background-color 0.5s',
          cursor: 'pointer',
          outline: 'none',
          transform: (isHovered || scrollIndex === num) ? 'scale(1.8)' : 'scale(1)',
        }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      ></button>
      {isHovered && (
        <div style={{ marginLeft: '7px', fontSize: '10px' }}>
          {num === 1
            ? 'Main'
            : num === 2
            ? 'About'
            : num === 3
            ? 'Work'
            : num === 4
            ? 'Contact'
            : num === 5
            ? 'iiiiii'
            : ''}
        </div>
      )}
    </div>
  );
};

const Dots = ({ scrollIndex, scrollToPage }) => {
  return (
    <div style={{ position: 'fixed', top: '50%', left: 30, zIndex: 999 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 20,
          height: 100,
        }}
      >
        <Dot num={1} scrollIndex={scrollIndex} scrollToPage={scrollToPage} />
        <Dot num={2} scrollIndex={scrollIndex} scrollToPage={scrollToPage} />
        <Dot num={3} scrollIndex={scrollIndex} scrollToPage={scrollToPage} />
        <Dot num={4} scrollIndex={scrollIndex} scrollToPage={scrollToPage} />
        <Dot num={5} scrollIndex={scrollIndex} scrollToPage={scrollToPage} />
      </div>
    </div>
  );
};

export default Dots;
