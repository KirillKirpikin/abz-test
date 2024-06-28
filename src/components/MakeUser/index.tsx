import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IMakeUser } from '../../types/user.type'

import styles from './make-user.module.scss'
import axios from 'axios'
import { IDataPositions } from '../../types/position.type'
import { useQuery } from '@tanstack/react-query'

const getPosition = async ()=>{
  return axios.get<IDataPositions>(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`)
}

const MakeUser = () => {

    const {register, handleSubmit, formState: {errors}, control, setValue} = useForm<IMakeUser>()
    const [radio, setRadio] = useState<string | null>(null)
    
    const {data, isSuccess, isLoading} = useQuery({
        queryKey: ['position'],
        queryFn: getPosition,
        select: data => data.data
    })

    const onSubmit:SubmitHandler<IMakeUser> = (data) =>{  
        console.log(data)
        setValue('position_id', '1')
    }

    useEffect(()=>{
        if(isSuccess) {
            setValue('position_id', data.positions[0].id)
        }
    }, [isSuccess, data])
    
    return (
        <div className='max-w-[1170px] mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.input}>
                    <input {...register('name', {
                        required:"Введіть дату",
                        minLength: {
                        value: 3,
                        message: 'Мінимум 3 символів'
                        }
                    })} placeholder='Your name' type="text" />
                    {errors?.name && <p className={styles.error}>{errors?.name?.message || 'Error!'}</p>}
                </div>      
                <div className={styles.input}>
                    <input {...register('email', {
                        required: 'Введіть email',
                        pattern:{
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'email повиненн бути наприклад example@gmail.com'
                        }
                    })} placeholder='Email' type="text" />
                    {errors?.email && <p className={styles.error}>{errors?.email?.message || 'Error!'}</p>}
                </div> 
                <Controller
                    control={control}
                    name='position_id'
                    render={({field}) =>(
                        <div className='flex flex-col gap=[20px]'>
                            {isLoading ? 
                            <div>Loading</div> 
                            : data && (data.positions.map(item => (
                                <div className={`${styles.radio} ${radio === item.id && styles.radio_active}`} key={item.id}>
                                    <button  onClick={(e)=> {
                                        e.preventDefault()
                                        field.onChange(item.id)
                                        setRadio(item.id)
                                    }}>
                                        <span></span>
                                        {item.name}
                                    </button>
                                </div>
                            )))}
                        </div>
                    ) }
                /> 
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

export default MakeUser