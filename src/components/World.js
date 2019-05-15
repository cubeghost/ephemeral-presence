import React from 'react';

const styles = {
  zIndex: -1,
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  // background: 'linear-gradient(0deg, #fdbb2d, #b21f1f, #1a2a6c)'
};

const Sprite = ({ src, x, y, ...otherProps }) => (
  <img 
    src={src}
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
      x={-200} 
      y={0} 
    />
  </div>
);

export default World;