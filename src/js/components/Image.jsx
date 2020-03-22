import React, { useState } from 'react';

const Image = ({ src, setImgLoaded, setImgHasFailed }) => {
  const [hasImgLoaded, imgLoaded] = useState(false);
  const [hasFailedToLoad, setHasFailedToLoad] = useState(false);
  return (
    <React.Fragment>
      {!hasFailedToLoad && <img
        src={src}
        onLoad={() => {
          imgLoaded(true);
          setImgLoaded(true);
        }}
        onError={() => {
          setHasFailedToLoad(true);
          setImgHasFailed(true);
        }}
      />}
      {!hasImgLoaded && <div style={{
        boxSizing: 'border-box',
        margin: 0,
        padding: 55,
        width: 150,
        height: 150,
        backgroundColor: 'seagreen',
        opacity: 0.5
      }}></div>}
      {hasFailedToLoad &&  <div style={{
        boxSizing: 'border-box',
        margin: 0,
        padding: 55,
        width: 150,
        height: 150,
        backgroundColor: 'tomato',
      }}></div>}
    </React.Fragment>
  );
}

export default Image;