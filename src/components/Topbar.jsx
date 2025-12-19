'use client';

import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { useContext } from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Logout } from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ColorModeContext } from '../theme';

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
    router.push('/login');
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Toaster />
      <Box display="flex">
        <Tooltip title="Light / Dark">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Topbar;


