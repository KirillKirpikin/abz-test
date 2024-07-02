import Spiner from '@components/Spiner';
import UserCard from '../UserCard';

import { useGetUsers } from '@hooks/useGetUsers';

const UsersSection = () => {
    const { data, fetchNextPage, hasNextPage, isLoading } = useGetUsers();

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
                {isLoading && <Spiner w='75' h='75'/>}
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
