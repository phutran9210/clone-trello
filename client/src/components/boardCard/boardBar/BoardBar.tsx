import React,{useState} from 'react';
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CreateBoardModal from "./modal/CreateBoardModal"

interface BoardProps {
  board: {
    title: string;
    type: string;
  };
}

const MENU_STYLE = {
    color: 'white',
    bgcolor: 'transparent',
    border: 'none',
    paddingX: '5px',
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover': {
        bgColor: 'white'
    }
};


  
const BoardBar: React.FC<BoardProps> = ({ board }) => {

  const [open, setOpen] = useState(false);

  // Function to handle when "Create" button is clicked
  const handleCreateClick = () => {
      setOpen(true);   
  };

  // Function to handle when modal is closed
  const handleModalClose = () => {
      setOpen(false);
  };

  return (
      <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          paddingX: 2,
          overflowX: 'auto',
          height: (theme) => theme.trello.boardBarHeight,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
      }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                  sx={MENU_STYLE}
                  icon={<SpaceDashboardIcon />}
                  label={board?.title}
                  clickable />
              <Chip
                  sx={MENU_STYLE}
                  icon={<VpnLockIcon />}
                  label={capitalizeFirstLetter(board.type)} //required
                  clickable />
              <Chip
                  sx={MENU_STYLE}
                  icon={<AddToDriveIcon />}
                  label="Add to drive"
                  clickable />
              <Chip
                  sx={MENU_STYLE}
                  icon={<BoltIcon />}
                  label="Automation"
                  clickable />
              <Chip
                  sx={MENU_STYLE}
                  icon={<FilterListIcon />}
                  label="Filters"
                  clickable />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                  variant='outlined'
                  startIcon={<PersonAddIcon />}
                  onClick={handleCreateClick}
                  sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                          borderColor: 'white'
                      }
                  }}
              >Create</Button>
              <CreateBoardModal open={open} onClose={handleModalClose} />
          </Box>
      </Box>
  );
};

export default BoardBar;

export const capitalizeFirstLetter = (value: string) => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
};
