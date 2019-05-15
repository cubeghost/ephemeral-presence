import React from 'react';

const styles = {
  zIndex: -1,
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  background: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmZiI+PC9yZWN0Pgo8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNlZWUiPjwvcmVjdD4KPHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNlZWUiPjwvcmVjdD4KPC9zdmc+)'
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
      y={-40} 
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