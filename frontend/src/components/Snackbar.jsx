import React from 'react';

const Snackbar = ({ message, open }) => {
  return (
    <div style={{ display: open ? 'block' : 'none', position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'black', color: 'white', padding: '10px', borderRadius: '5px' }}>
      {message}
    </div>
  );
};

export default Snackbar;
