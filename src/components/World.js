import React from 'react';

const styles = {
  zIndex: -1,
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  position: 'fixed',
};

const Sprite = ({ x, y, ...otherProps }) => (
  <img 
    style={{
      display: 'block',
      position: 'fixed',
      top: '50vh',
      left: '50vw',
      transform: `translateX(${x}px) translateY(${y}px)`
    }}
    {...otherProps}
  />
);

const World = () => (
  <div style={styles}>
    <Sprite 
      src="https://media.giphy.com/media/l41m2A9tjl7qanqMg/giphy.gif"
      width={300}
      x={-100} 
      y={-90} 
    />
  </div>
);

export default World;

/*
    <Sprite 
      src="https://media.giphy.com/media/AyN4lt9z581zi/giphy.gif"
      width={200}
      x={-200}
      y={-200}
    />
*/