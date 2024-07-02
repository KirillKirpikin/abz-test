import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import styles from './make-user.module.scss';

import { IMakeUser } from '../../types/user.type';

import FileUpload from '@components/FileUpload';

import { useAddUser } from '@hooks/useAddUser';
import { useGetPosition } from '@hooks/useGetPosition';

import { scrollTo } from '@utils/scrollTo';

const MakeUser = ({ refTo }: { refTo: React.RefObject<HTMLDivElement> }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        control,
        setValue,
        setError,
        watch,
    } = useForm<IMakeUser>({ mode: 'all' });
    const [radio, setRadio] = useState<string | null>(null);

    const { data, isSuccess, isLoading } = useGetPosition();

    const labelPreload = (name: 'name' | 'email' | 'phone') => {
        return watch(name) !== undefined && watch(name).length > 0;
    };

    const addUser = useAddUser(setError);

    const onSubmit: SubmitHandler<IMakeUser> = (dataForm) => {
        const formData = new FormData();
        formData.append('name', dataForm.name);
        formData.append('email', dataForm.email);
        formData.append('phone', dataForm.phone);
        formData.append('position_id', dataForm.position_id);
        formData.append('photo', dataForm.photo[0]);
        addUser.mutate(formData, {
            onSuccess() {
                setValue('email', '');
                setValue('name', '');
                setValue('phone', '');
                setValue('photo', []);
                return scrollTo(refTo);
            },
        });
    };

    useEffect(() => {
        if (isSuccess && data && data.positions) {
            setValue('position_id', data.positions[0].id);
            setRadio(data.positions[0].id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, data]);

    return (
        <div className="mx-4 mt-[140px]">
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
                            required: 'Enter your name',
                            minLength: {
                                value: 2,
                                message: 'should be 2-60 characters',
                            },
                            maxLength: {
                                value: 60,
                                message: 'should be 2-60 characters',
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
                <div
                    className={`${styles.input} ${errors?.email && styles.input_error}`}
                >
                    <p
                        className={`${styles.placeholder} ${labelPreload('email') && styles.placeholder_active}`}
                    >
                        Email
                    </p>
                    <input
                        {...register('email', {
                            required: 'Enter email',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'example@gmail.com',
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
                            required: 'Enter your phone',
                            pattern: {
                                value: /^\+380\d{9}$/,
                                message:
                                    'should start with code of Ukraine +380',
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
                                data.positions &&
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
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="photo"
                        render={({ field }) => (
                            <FileUpload
                                value={field.value || []}
                                quantity={1}
                                onChange={field.onChange}
                            />
                        )}
                    />
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
