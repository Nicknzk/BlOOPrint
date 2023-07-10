import React, { useState } from 'react';
import { Drawer, Button } from '@mui/material';

const PullOutDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div style={{display: 'flex', justifyContent:'flex-end'}}>
      <Button onClick={handleToggleDrawer} style={{ backgroundColor: 'white', marginLeft:'100px'}}>
        {open ? 'Close Drawer' : 'Help/Settings'}
      </Button>
      <Drawer anchor="right" open={open} onClose={handleToggleDrawer} style={{ width: '400px' }}>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <video src="path_to_video.mp4" controls width="100%" height="auto" />
      </Drawer>
    </div>
  );
};

export default PullOutDrawer;
