import {
    InfiniteData,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

import axios, { AxiosResponse, isAxiosError } from 'axios';
import { IDataUsers, IMakeUser } from 'types/user.type';

import { toastError, toastSuccess } from '@utils/toastFunction';

export function useAddUser(setError: UseFormSetError<IMakeUser>) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['add user'],
        mutationFn: async (newUser: FormData) =>
            axios.post(`${import.meta.env.VITE_API_URL}users`, newUser, {
                headers: {
                    'Content-Type': 'multiparte/form-data',
                    Token: `${localStorage.getItem('token-abz')}`,
                },
            }),
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: ['token'] });
            queryClient.setQueryData(
                ['users'],
                (data: InfiniteData<AxiosResponse<IDataUsers>>) => ({
                    pageParams: [1],
                    pages: [data?.pages?.[0] ?? []],
                }),
            );
            queryClient.invalidateQueries({ queryKey: ['users'] });

            if (data.success) {
                toastSuccess(data.message);
            }
        },
        onError(error) {
            if (isAxiosError(error)) {
                toastError(error.response?.data?.message);
                queryClient.invalidateQueries({ queryKey: ['token'] });
                if (error.response?.data?.fails.name)
                    setError('name', {
                        type: 'custom',
                        message: `${error.response?.data?.fails.name.join(',')}`,
                    });
                if (error.response?.data?.fails.phone)
                    setError('phone', {
                        type: 'custom',
                        message: `${error.response?.data?.fails.phone.join(',')}`,
                    });
                if (error.response?.data?.fails.email)
                    setError('email', {
                        type: 'custom',
                        message: `${error.response?.data?.fails.email.join(',')}`,
                    });
            }
        },
    });

    return { mutate, isPending };
}
