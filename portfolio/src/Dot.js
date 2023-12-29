import React from 'react';

const Dot = ({ num, scrollIndex, scrollToPage }) => {
  const handleClick = () => {
    scrollToPage(num);
  };

  return (
    <button
      style={{
        width: 6,
        height: 6,
        border: "white",
        borderRadius: "50%",
        backgroundColor: scrollIndex === num ? "aqua" : "white",
        transition: "background-color 0.5s",
        cursor: "pointer",
        outline: "none",
      }}
      onClick={handleClick}
      onMouseEnter={(e) => { 
        e.target.style.transform = 'scale(1.5)';
        e.target.style.backgroundColor = scrollIndex === num ? "aqua" : "white";
      }}
      onMouseLeave={(e) => { 
        e.target.style.transform = 'scale(1)';
        e.target.style.backgroundColor = scrollIndex === num ? "aqua" : "white";
      }}
    ></button>
  );
};

const Dots = ({ scrollIndex, scrollToPage }) => {
  return (
    <div style={{ position: "fixed", top: "50%", right: 100 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: 20,
          height: 100,
        }}
      >
        <Dot num={1} scrollIndex={scrollIndex} scrollToPage={scrollToPage} />
        <Dot num={2} scrollIndex={scrollIndex} scrollToPage={scrollToPage} />
        <Dot num={3} scrollIndex={scrollIndex} scrollToPage={scrollToPage} />
        <Dot num={4} scrollIndex={scrollIndex} scrollToPage={scrollToPage} />
      </div>
    </div>
  );
};

export default Dots;


  // const Dot = ({ num, scrollIndex }) => {
  //     return (
  //       <div
  //         style={{
  //           width: 10,
  //           height: 10,
  //           border: "1px solid black",
  //           borderRadius: 999,
  //           backgroundColor: scrollIndex === num ? "black" : "transparent",
  //           transitionDuration: 1000,
  //           transition: "background-color 0.5s",
  //         }}
  //       ></div>
  //     );
  //   };
    
  //   const Dots = ({ scrollIndex }) => {
  //     return (
  //       <div style={{ position: "fixed", top: "50%", right: 100 }}>
  //         <div
  //           style={{
  //             display: "flex",
  //             flexDirection: "column",
  //             justifyContent: "space-between",
  //             alignItems: "center",
  //             width: 20,
  //             height: 100,
  //           }}
  //         >
  //           <Dot num={1} scrollIndex={scrollIndex}></Dot>
  //           <Dot num={2} scrollIndex={scrollIndex}></Dot>
  //           <Dot num={3} scrollIndex={scrollIndex}></Dot>
  //           <Dot num={3} scrollIndex={scrollIndex}></Dot>
  //         </div>
  //       </div>
  //     );
  //   };
    
  //   export default Dots;
  