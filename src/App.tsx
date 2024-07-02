import { useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';

import { useGetToken } from '@hooks/useGetToken';

function App() {
    useGetToken();
    const listUserRef = useRef<HTMLDivElement>(null);
    const makeUserRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex min-h-screen flex-col">
            <Header refs={{ listUserRef, makeUserRef }} />
            <main className="flex-grow">
                <HomePage refs={{ listUserRef, makeUserRef }} />
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default App;
