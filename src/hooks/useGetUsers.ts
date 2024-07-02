import { useInfiniteQuery } from '@tanstack/react-query';

import axios from 'axios';
import { IDataUsers } from 'types/user.type';

export function useGetUsers() {
    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: async ({ pageParam }) => {
            return axios.get<IDataUsers>(
                `${import.meta.env.VITE_API_URL}users?page=${pageParam}&count=6`,
            );
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            if (!lastPage || lastPageParam === lastPage.data.total_pages) {
                return undefined;
            }
            return lastPageParam + 1;
        },
    });

    return { data, fetchNextPage, hasNextPage };
}
