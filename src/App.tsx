import './App.css';

import NewItemForm from './components/NewItemForm';
import { Stack, ThemeProvider, alpha, createTheme } from '@mui/material';
import { ItemsProvider } from './contexts/ItemsProvider';
import ItemsPanel from './components/ItemsPanel';
import { purple } from '@mui/material/colors';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: purple,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 100
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {

                }
            }
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <ItemsProvider>
                <div className='app-container'>
                    <Stack className='app-panels-container' spacing={2}>

                        <div className='app-panel'>
                            <NewItemForm />
                        </div>

                        <div className='app-panel'>
                            <ItemsPanel />
                        </div>

                    </Stack>
                </div>
            </ItemsProvider>
        </ThemeProvider>
    );
}

export default App;
