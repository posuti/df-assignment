import './App.css';

import NewItemForm from './components/NewItemForm';
import { Stack, ThemeProvider, alpha, createTheme } from '@mui/material';
import { ItemsProvider } from './contexts/ItemsProvider';
import ItemsPanel from './components/ItemsPanel';
import { purple } from '@mui/material/colors';
import { Provider } from 'react-redux';
import store from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            //staleTime: 1000*60,
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
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
                </QueryClientProvider>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
