import React from 'react';

const styles = {
  zIndex: -1,
  // top: 0,
  // left: 0,
  // width: '100vw',
  // height: '100vh',
  // position: 'fixed',
};

const Sprite = ({ position, ...otherProps }) => (
  <img 
    style={{
      display: 'block',
      position: 'fixed',
      ...position
    }}
    {...otherProps}
  />
);

const World = () => (
  <div style={styles}>

    <Sprite 
      src="https://media.giphy.com/media/VsIzjbp1YqdGg/giphy.gif"
      width={200}
      position={{
        bottom: 0,
        right: '40vw'
      }}
    />

    <Sprite 
      src="https://media.giphy.com/media/l41m2A9tjl7qanqMg/giphy.gif"
      width={300}
      position={{
        bottom: '-20px',
        right: '10vw'
      }}
    />
    
    <Sprite 
      src="https://media.giphy.com/media/7XuS2vVsAc83iwIuAF/200.gif"
      width={100}
      position={{
        top: '30vh',
        left: '20vw'
      }}
     />

    <Sprite 
      src="https://media.giphy.com/media/AyN4lt9z581zi/giphy.gif"
      width={150}
      position={{
        top: '-20px',
        right: '10vw'
      }}
    />
    

    <Sprite 
      src="https://media.giphy.com/media/3ov9jDblR6W2d6NfJC/200.gif"  
      width={150}
      position={{
        bottom: '34vh',
        right: '32vw'
      }}
    />
    
  </div>
);

export default World;

/*
    ufo
    <Sprite 
      src="https://web.archive.org/web/20091027023806/http://www.geocities.com/jd676767/tiny-ufo.gif"
      position={{
        top: '20vh',
        right: '30vh'
      }}
    />
    
*/