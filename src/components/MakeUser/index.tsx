import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import axios, { isAxiosError } from 'axios';

import styles from './make-user.module.scss';

import { IDataPositions } from '../../types/position.type';
import { IMakeUser } from '../../types/user.type';

import FileUpload from '@components/FileUpload';

const getPosition = async () => {
    return axios.get<IDataPositions>(
        `https://frontend-test-assignment-api.abz.agency/api/v1/positions`,
    );
};

const MakeUser = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        control,
        setValue,
        reset,
        watch,
    } = useForm<IMakeUser>();
    const [radio, setRadio] = useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const queryClient = useQueryClient();

    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['position'],
        queryFn: getPosition,
        select: (data) => data.data,
    });

    const labelPreload = (name: 'name' | 'email' | 'phone') => {
        return watch(name) !== undefined && watch(name).length > 0;
    };

    const { mutate } = useMutation({
        mutationKey: ['add user'],
        mutationFn: async (newUser: FormData) =>
            axios.post(
                'https://frontend-test-assignment-api.abz.agency/api/v1/users',
                newUser,
                {
                    headers: {
                        'Content-Type': 'multiparte/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token-abz')}`,
                    },
                },
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users', 'token'] });
            alert('Okey');
            reset();
        },
        onError(error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data?.message);
                queryClient.invalidateQueries({ queryKey: ['token'] });
            }
        },
    });

    const onSubmit: SubmitHandler<IMakeUser> = (data) => {
        if (selectedFiles.length < 1) {
            return alert('Додайте фотографію');
        }
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('position_id', data.position_id);
        formData.append('photo', selectedFiles[0]);
        mutate(formData);
    };

    useEffect(() => {
        if (isSuccess) {
            setValue('position_id', data.positions[0].id);
            setRadio(data.positions[0].id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, data]);

    return (
        <div className="mx-auto mt-[140px] max-w-[1170px]">
            <h2 className="title">Working with POST request</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.input}>
                    <p
                        className={`${styles.placeholder} ${labelPreload('name') && styles.placeholder_active}`}
                    >
                        Your name
                    </p>

                    <input
                        {...register('name', {
                            required: 'Введіть дату',
                            minLength: {
                                value: 3,
                                message: 'Мінимум 3 символів',
                            },
                        })}
                        placeholder="Your name"
                        type="text"
                    />
                    {errors?.name && (
                        <p className={styles.error}>
                            {errors?.name?.message || 'Error!'}
                        </p>
                    )}
                </div>
                <div className={styles.input}>
                    <p
                        className={`${styles.placeholder} ${labelPreload('email') && styles.placeholder_active}`}
                    >
                        Email
                    </p>
                    <input
                        {...register('email', {
                            required: 'Введіть email',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message:
                                    'email повиненн бути наприклад example@gmail.com',
                            },
                        })}
                        placeholder="Email"
                        type="text"
                    />

                    {errors?.email && (
                        <p className={styles.error}>
                            {errors?.email?.message || 'Error!'}
                        </p>
                    )}
                </div>
                <div className={styles.input}>
                    <p
                        className={`${styles.placeholder} ${labelPreload('phone') && styles.placeholder_active}`}
                    >
                        Your phone
                    </p>
                    <input
                        {...register('phone', {
                            required: 'Введіть дату',
                            minLength: {
                                value: 3,
                                message: 'Мінимум 3 символів',
                            },
                        })}
                        placeholder="Your phone"
                        type="text"
                    />
                    {errors?.phone && (
                        <p className={styles.error}>
                            {errors?.phone?.message || 'Error!'}
                        </p>
                    )}
                </div>
                <h4>Select your position</h4>
                <Controller
                    control={control}
                    name="position_id"
                    render={({ field }) => (
                        <div className="gap=[20px] mb-[50px] flex flex-col">
                            {isLoading ? (
                                <div>Loading</div>
                            ) : (
                                data &&
                                data.positions.map((item) => (
                                    <div
                                        className={`${styles.radio} ${radio === item.id && styles.radio_active}`}
                                        key={item.id}
                                    >
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                field.onChange(item.id);
                                                setRadio(item.id);
                                            }}
                                        >
                                            <span></span>
                                            {item.name}
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                />

                <div className="items-center justify-start max-md:mb-[30px] md:flex">
                    <FileUpload
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                        quantity={1}
                    />
                    {/* <p className='text-[12px] md:w-[45%] max-md:mt-[20px] md:max-w-[225px]  md:text-[13px] font-normal tracking-tight ml-[10px]'>*формат іконки має бути в SVG, розмір не біше ніж 44х44</p> */}
                </div>

                <div className="mt-[50px] flex justify-center">
                    <button
                        disabled={!isValid}
                        type="submit"
                        className="btn_standart"
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MakeUser;
