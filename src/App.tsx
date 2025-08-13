import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import './App.css'
import Home from './pages/home';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import PokemonProfile from "./pages/PokemonProfile.tsx";


const queryClient = new QueryClient()

const AppContent = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Pokemon-Profile/:name" element={<PokemonProfile />} />
        </Routes>
    );
};

function App() {
    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <AppContent />
            </QueryClientProvider>
        </Router>
    );
}

export default App;
