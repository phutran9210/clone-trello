import Column from './column/Column'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import React,{FC} from 'react'

interface ColumnData {
    _id: string;
    // Add other properties of column as needed
}

interface ListColumnsProps {
    columns: ColumnData[];
}

const ListColumns: FC<ListColumnsProps> = ({ columns }) => {
    console.log(columns);
    
    const arrayColumnIds = columns?.map(c => c._id);
    return (
        // {columns} must be array [1,2,3]
        <SortableContext items={arrayColumnIds} strategy={horizontalListSortingStrategy}>
            <Box sx={{
                bgcolor: 'inherit',
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden'
            }
            }>
                {/* List columns */}
                {columns && columns.map(column => <Column key={column._id} column={column} />)}

                {/* Add Column */}
                <Box sx={{
                    minWidth: '200px',
                    maxWidth: '200px',
                    height: 'fit-content',
                    bgcolor: '#ffffff3d',
                    borderRadius: '6px',
                    mx: 2
                }}>
                    <Button sx={{
                        width: '100%',
                        color: 'white',
                        justifyContent: 'flex-start',
                        pl: 2.5,
                        py: 1
                    }}
                        startIcon={<NoteAddIcon />}>Add new column</Button>
                </Box>
            </Box>
        </SortableContext>
    )
}

export default ListColumns