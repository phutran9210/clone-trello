// import { createTheme } from '@mui/material/styles'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { Components } from '@mui/material/styles/components';
import { Theme } from '@mui/material/styles';

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'
const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

const theme: Theme = extendTheme({
    trello: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT
    },

    colorSchemes: {
        // light: {
        // },
        // dark: {
        // }
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar ': {
                        width: '8px',
                        height: '8px'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#ccc',
                        borderRadius: '8px'
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#aaa'
                    },
                    '*::-webkit-scrollbar-track': {
                        margin: '16px'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => {
                    return {
                        fontSize: '0.875rem',
                        borderWidth: '0.5px !important',
                        '&:hover': {
                            borderWidth: '1px !important'
                        }
                    }
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    '&.MuiTypography-body1': { fontSize: '0.875rem' }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => {
                    return {
                        fontSize: '0.875rem',
                        '& fieldset': { borderWidth: '0.5px !important' },
                        '&:hover fieldset': { borderWidth: '1px !important' },
                        '&.Mui-focused fieldset': { borderWidth: '1px !important' }
                    }
                }
            }
        }
    } as Components
})

export default theme
