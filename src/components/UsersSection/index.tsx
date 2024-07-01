import { useInfiniteQuery } from '@tanstack/react-query';

import axios from 'axios';

import { IDataUsers } from '../../types/user.type';
import UserCard from '../UserCard';

const UsersSection = () => {
    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: async ({ pageParam }) => {
            return axios.get<IDataUsers>(
                `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${pageParam}&count=6`,
            );
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            if (lastPageParam === lastPage.data.total_pages) {
                return undefined;
            }
            return lastPageParam + 1;
        },
    });

    return (
        <section className="mt-[140px]">
            <h2 className="title">Working with GET request</h2>
            <div className="mx-auto max-w-[1170px]">
                <div className="mx-4 grid items-stretch gap-[15px] min-[430px]:grid-cols-2 md:grid-cols-3 xl:gap-x-[29px] xl:gap-y-[29px]">
                    {data?.pages.map((page) =>
                        page.data.users.map((user) => (
                            <UserCard key={user.id} user={user} />
                        )),
                    )}
                </div>
                <div className="mt-[50px] flex justify-center">
                    <button
                        className="btn_standart"
                        disabled={!hasNextPage && true}
                        onClick={() => fetchNextPage()}
                    >
                        SeeMore
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UsersSection;
