import React, { useState } from 'react';

const Image = ({ src, setImgLoaded }) => {
  const [hasImgLoaded, imgLoaded] = useState(false);
  return (
    <React.Fragment>
      <img
        src={src}
        onLoad={() => {
          imgLoaded(true);
          setImgLoaded(true);
        }}
      />
      {!hasImgLoaded && <div style={{ 
          boxSizing: 'border-box',
          margin: 0,
          padding: 55,
          width: 150, 
          height: 150, 
          backgroundColor: 'tomato',
          textAlign: 'center'
        }}>Loading...</div>}
    </React.Fragment>
  );
}

export default Image;