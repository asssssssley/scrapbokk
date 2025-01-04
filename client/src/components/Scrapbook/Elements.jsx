import React from 'react';

const svgFiles = [
  'line.svg',
  'square.svg',
  'circle.svg',
  'triangle.svg',
];

const Elements = () => {
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const itemStyle = {
    width: '150px',
    height: 'auto',
    objectFit: 'contain',
  };

  return (
    <div style={containerStyle}>
      {svgFiles.map((file, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={`/elements/${file}`} alt={file} style={itemStyle} />
        </div>
      ))}
    </div>
  );
};

export default Elements;
