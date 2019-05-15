import React from 'react';

const styles = {
  zIndex: -1,
  position: 'fixed',
  transform: 'translateX(50%) translateY(50%)',
};

const Sprite = ({ src, x, y }) => (
  <img 
    src={src}
    style={{
      position: 'fixed',
      transform: `translateX(${x}) translateY(${y})`
    }}
  />
);

const World = () => (
  <div style={styles}>
    <img src="https://media.giphy.com/media/3otO6xRxnsZ8213SJa/100w.webp" />
  </div>
);

export default World;