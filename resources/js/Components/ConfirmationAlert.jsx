import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function TransitionAlerts({ text }) {
  const [open, setOpen] = React.useState(true);


  const handleOpen = () => {
    setOpen(false);

  }
  React.useEffect(() => {
    setOpen(true);
  }, [text]);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                handleOpen()
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {text} 
        </Alert>
      </Collapse>

    </Box>
  );
}
