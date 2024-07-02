import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import { IDataPositions } from 'types/position.type';

const getPosition = async () => {
    return axios.get<IDataPositions>(
        `${import.meta.env.VITE_API_URL}positions`,
    );
};

export function useGetPosition() {
    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['position'],
        queryFn: getPosition,
        select: (data) => data.data,
    });

    return { data, isSuccess, isLoading };
}
