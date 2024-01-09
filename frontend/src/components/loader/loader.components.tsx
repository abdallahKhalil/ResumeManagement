import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function Loader() {
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </div>
  );
}

export default Loader;
