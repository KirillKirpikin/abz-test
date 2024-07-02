import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import axios from 'axios';
import { IToken } from 'types/token.type';

const getToken = async () => {
    return axios.get<IToken>(`${import.meta.env.VITE_API_URL}token`);
};

export function useGetToken() {
    const { data } = useQuery({
        queryKey: ['token'],
        queryFn: getToken,
        staleTime: 0,
    });

    useEffect(() => {
        if (data && data.data.success) {
            localStorage.setItem('token-abz', data.data.token);
        }
    }, [data]);
}
