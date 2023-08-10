
import ListCards from './listCard/ListCard'
import React,{ useState,FC } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import Divider from '@mui/material/Divider'
import Cloud from '@mui/icons-material/Cloud'
import ContentCopy from '@mui/icons-material/ContentCopy'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ContentPaste from '@mui/icons-material/ContentPaste'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface CardData {
    _id: string;
    // Add other properties of card as needed
}

interface ColumnData {
    _id: string;
    title?: string;
    cards?: CardData[];
    cardOrderIds?: string[];
}

interface ColumnProps {
    column: ColumnData;
}

 const Column: FC<ColumnProps> = ({ column }) => {
    // dnd-kit
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column._id,
        data: { ...column }
    })

    const dndKitColumnStyles = {
        // CSS.Transform => error stretch
        // Use CSs.Translate
        // touchAction: 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        // HEIGHT 100% => error stretch
        height: '100%',
        opacity: isDragging ? 0.5 : 1
    }
    // Column handle
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => { setAnchorEl(event.currentTarget) }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
    return (
        <div ref={setNodeRef}
            style={dndKitColumnStyles}
            {...attributes}>
            {/* //  Box Column 1 */}
            <Box
                {...listeners}
                sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                    ml: 2,
                    borderRadius: '6px',
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
                }}>

                {/* Column Header */}
                <Box sx={{
                    height: (theme) => theme.trello.columnHeaderHeight,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Typography sx={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }} variant="h6">{column?.title}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Tooltip title="More Options">
                            <ExpandMoreIcon
                                sx={{ color: 'text.primary', cursor: 'pointer' }}
                                id="basic-column-dropdown"
                                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            />
                        </Tooltip>
                        <Menu
                            id="basic-menu-column-dropdown"
                            MenuListProps={{
                                'aria-labelledby': 'basic-column-dropdown'
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem>
                                <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Add new card</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                                <ListItemText>Archive column</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Remove column</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
                {/* List Cards */}
                <ListCards cards={orderedCards} />
                {/* Column footer */}
                <Box sx={{
                    height: (theme) => theme.trello.columnFooterHeight,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Button startIcon={<AddCardIcon />}>Add new card</Button>
                    <Tooltip title='Drag to move'><DragHandleIcon sx={{ cursor: 'pointer' }} /></Tooltip>
                </Box>
            </Box>
        </div>

    )
}

export default Column

export const mapOrder = (originalArray: any[], orderArray: string[], key: string): any[] => {
    if (!originalArray || !orderArray || !key) return []
    const clonedArray = [...originalArray]
    const orderedArray = clonedArray.sort((a, b) => {
        return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
    })

    return orderedArray
}