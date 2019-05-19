import React from 'react';

const Sprite = ({ name, position, ...otherProps }) => (
  <img 
    alt={name}
    style={{
      display: 'block',
      position: 'absolute',
      z
      ...position
    }}
    {...otherProps}
  />
);

const World = () => (
  <div className="world">

    <Sprite 
      name="palm tree"
      src="https://media.giphy.com/media/VsIzjbp1YqdGg/giphy.gif"
      width={200}
      position={{
        bottom: 0,
        right: '40vw'
      }}
    />

    <Sprite 
      name="sunset"
      src="https://media.giphy.com/media/l41m2A9tjl7qanqMg/giphy.gif"
      width={300}
      position={{
        bottom: '-20px',
        right: '10vw'
      }}
    />
    
    <Sprite 
      name="twirly rainbow thing"
      src="https://media.giphy.com/media/7XuS2vVsAc83iwIuAF/200.gif"
      width={100}
      position={{
        top: '30vh',
        left: '20vw'
      }}
     />

    <Sprite 
      name="transforming geometric object"
      src="https://media.giphy.com/media/AyN4lt9z581zi/giphy.gif"
      width={150}
      position={{
        top: '-20px',
        right: '10vw'
      }}
    />
    
    <Sprite 
      name="sparkle"
      src="https://media.giphy.com/media/fo2dhRTmaULbStoFkX/200.gif"
      width={150}
      position={{
        top: '7vw',
        right: '15vw'
      }}
    />
    

    <Sprite 
      name="crystal floating serenely"
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