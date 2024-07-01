import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import axios from 'axios';
import { IToken } from 'types/token.type';

import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';

const getToken = async () => {
    return axios.get<IToken>(
        'https://frontend-test-assignment-api.abz.agency/api/v1/token',
    );
};

function App() {
    const { data } = useQuery({
        queryKey: ['token'],
        queryFn: getToken,
    });

    useEffect(() => {
        if (data && data.data.success) {
            localStorage.setItem('token-abz', data.data.token);
        }
    }, [data]);

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">
                <HomePage />
            </main>
            <Footer />
        </div>
    );
}

export default App;
