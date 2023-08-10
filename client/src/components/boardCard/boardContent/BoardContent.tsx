import React,{ useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import ListColumns from './listColumn/ListColumns'
import Box from '@mui/material/Box'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import {BoardProps,Board} from "../../interfaces/board"
import Column from './listColumn/column/Column'
import Card from './listColumn/column/listCard/card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}



interface ActiveDragItemData {
    columnId?: string;
}

const BoardContent: React.FC<BoardProps> = ({ board }) => {

    //dnd-kit
    // https://docs.dndkit.com/api-documentation/sensors#usesensors

    const mouseSensor = useSensor(MouseSensor, {
        // Yêu cầu chuột di chuyển 10pixels => fire event drag
        activationConstraint: {
            distance: 10
        }
    })
    const touchSensor = useSensor(TouchSensor, {
        // Nhấn giữ 250ms, di chuyển 5 pixels => fire event drag
        activationConstraint: {
            delay: 250,
            tolerance: 5
        }
    })
    const mySensors = useSensors(mouseSensor, touchSensor)

    const [orderedColumns, setOrderedColumns] = useState([])
    // Trong một thời điểm, chỉ có COLUMN or CARD được kéo thả
    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)

    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])
    console.log(orderedColumns);
    
    // Tim mot column chua tham so cardId
    const findColumnByCardId = (cardId) => {
        // Lam du lieu cards hoan chinh truoc roi moi tao ra cardOrderIds moi
        return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
    }

    const handleDragStart = (event) => {
        setActiveDragItemId(event?.active?.id)
        // Nếu có ColumnId => Type = CARD
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)
    }
    // Trigger trong qua keo (drag) mot phan tu
    const handleDragOver = (event) => {
        // console.log('handleDragOver', event)
        // Khong lam gi them => Neu keo column
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
        // Xu ly khi keo card qua cac Columns
        const { over, active } = event
        // Nếu kéo ra ngoài container => return để tránh crash trang
        if (!active || !over) return


        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        const { id: overCardId } = over

        // Tim 2 columns theo cardId
        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)

        // Tranh crash trang web
        if (!activeColumn || !overColumn) return

        // Xu ly logic khi keo card qua hai columns khac nhau
        // Vi day la handleDragOver(), con xu ly luc keo xong thi se handleDragEnd()

        if (activeColumn._id !== overColumn._id) {
            setOrderedColumns((prevColumns) => {
                // Tim vi tri index cua over card trong column dich'
                const overCardIndex = overColumn?.cards.findIndex(card => card._id === overCardId)
                // console.log(overCardIndex)

                // Logic tinh toan cho cardIndex moi (tren hoac duoi overCard) lay tu thu vien
                let newCardIndex
                const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

                const modifier = isBelowOverItem ? 1 : 0

                newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.card.length + 1

                // Clone array OrderedColumnsState cu ra mot mang moi de xu ly data roi cap nhat lai
                const nextColumn = cloneDeep(prevColumns) // [...prevColumns]

                // Xu ly logic cho nextColumn (clone cua prevColumns)
                const nextActiveColumn = nextColumn.find(column => column._id === activeColumn._id)
                const nextOverColumn = nextColumn.find(column => column._id === overColumn._id)

                if (nextActiveColumn) {
                    // Xoa phan tu card khoi column cu~
                    // array.filter() => tra ve mang moi nextActiveColumn.cards = [card-id-11]
                    nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId);

                    // Cap nhat lai mang cardOrderIds cho chuan du lieu
                    nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
                }
                if (nextOverColumn) {
                    // Kiem tra xem card dang keo co ton tai o overColumn chua? neu co thi can xoa no truoc
                    nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId);

                    // Tiep theo la them cai card dang keo vao overColumn, theo vi tri index moi
                    // toSpliced() return array moi dua theo index duoc xoa / duoc thay the []
                    nextOverColumn.cards.splice(newCardIndex, 0, activeDraggingCardData);


                    // Cap nhat lai mang cardOrderIds
                    nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
                }
                // console.log(nextColumn)

                return nextColumn
            })
        }

    }

    const handleDragEnd = (event) => {
        // console.log('handleDragEnd', event)

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            // console.log('Ban dang keo tha card! -- tam thoi khong lam gi ca')
            return
        }
        const { active, over } = event
        if (!active || !over) return
        if (active.id !== over.id) {
            const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
            const newIndex = orderedColumns.findIndex(c => c._id === over.id)
            const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
            // Console xử lý api
            // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id) // save to db
            // console.log('dndOrderedColumns', dndOrderedColumns)
            // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds)

            // Cập nhật lại state sau khi đã kéo thả
            return setOrderedColumns(dndOrderedColumns)
        }
        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
    }
    const customDropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: { active: { opacity: '0.5' } }
        })
    }
    return (
        <DndContext
            sensors={mySensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <Box sx={{
                backgroundColor: 'primary.main',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                height: (theme) => theme.trello?.boardContentHeight,
                p: '10px 0px'
            }}>
                <ListColumns columns={orderedColumns} />
                <DragOverlay dropAnimation={customDropAnimation}>
                    {!activeDragItemType && null}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
                </DragOverlay>
            </Box>
        </DndContext >
    )
}

export default BoardContent


interface MapOrderParams {
    originalArray?: any[],
    orderArray: string[],
    key: string,
}

export const mapOrder = (originalArray, orderArray, key) => {
    if (!originalArray || !orderArray || !key) return []
    const clonedArray = [...originalArray]
    const orderedArray = clonedArray.sort((a, b) => {
        return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
    })

    return orderedArray
}
