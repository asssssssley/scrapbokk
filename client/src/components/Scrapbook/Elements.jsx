import React from 'react';

const svgFiles = [
  'text.svg',
  'line.svg',
  'arrow.svg',
  'square.svg',
  'circle.svg',
  'triangle.svg',
  'star.svg',
  'heart.svg',
  'pin.svg',
  'location.svg',
  'frame-1.svg',
  'frame-2.svg',
  'flower-1.svg',
  'flower-2.svg',
  'flower-3.svg',
  'flower-4.svg',
  'bow-and-arrow.svg',
  'butterfly.svg',
  'suitcase.svg',
  'sugar.svg',
  'magic.svg',
  'gift.svg',
  'longan.svg',
  'trumpet.svg',
  'bell.svg',
  'mushroom.svg',
];

const Elements = () => {
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const itemStyle = {
    width: '100px',
    height: 'auto',
    padding: '5px',
    objectFit: 'contain',
  };

  return (
    <div style={containerStyle}>
      {svgFiles.map((file, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'center'}}>
          <img src={`/elements/${file}`} alt={file} style={itemStyle} />
        </div>
      ))}
    </div>
  );
};

export default Elements;
