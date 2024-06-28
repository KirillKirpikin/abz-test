import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IDataUsers } from '../../types/user.type'
import UserCard from '../UserCard'


// const getUsers = async (page: number)=>{
//   return axios.get<IDataUsers>(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${page}`)
// }

const UsersSection = () => {
  // const {data} = useQuery({
  //   queryKey: ['users'],
  //   queryFn: ()=>getUsers(page),
  //   select: (data)=> data.data,
  // })

  const {data, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: async ({pageParam})=>{
      return axios.get<IDataUsers>(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${pageParam}&count=6`)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam)=>{  
      if(lastPageParam === lastPage.data.total_pages){
        return undefined
      }  
        return lastPageParam + 1
      
    }
  })

  return (
    <section>
        <h2 className='text-center'>Working with GET request</h2>
        <div className='max-w-[1170px] mx-auto'>
          <div className=' mx-4 grid items-stretch min-[430px]:grid-cols-2 md:grid-cols-3 gap-[15px] xl:gap-x-[29px] xl:gap-y-[29px]'>
            {data?.pages.map((page)=>
              page.data.users.map((user)=><UserCard key={user.id} user={user}/>
            ))}

          </div>


          <button className='btn_standart' disabled={!hasNextPage && true} onClick={()=> fetchNextPage()}>SeeMore</button>
        </div>
        {/* {console.log(data)} */}
    </section>
  )
}

export default UsersSection

// [0].data.users.map((user)=><div key={user.id}>{user.name}</div>