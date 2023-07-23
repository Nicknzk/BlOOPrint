import React, { useState } from 'react';
import { Drawer, Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";

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
      <Drawer anchor="right" open={open} onClose={handleToggleDrawer}>
        <Link to= "/HomePage">
        <Button>Back to Home</Button>
        </Link>
        <div style={{ width: '400px', height: '300px', marginTop:"100px" }}>
        <Typography>Have a look at the features of this app!</Typography>
  <video src="src\Component\Images\Video.mp4" controls width="100%" height="100%" />
</div>

      </Drawer>
    </div>
  );
};

export default PullOutDrawer;
