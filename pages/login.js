import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userService } from '../services/user.service';
import FormLayout from "../components/form";

export default function Login() {
    const router = useRouter();
    useEffect(() => {
        if (userService.userValue) {
            router.push('/');
        }
    },[]);
    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    function onSubmit({ username, password }) {
        userService.login(username, password)
            .then(
                user => {
                    const { from } = router.query;
                    router.push(from || '/');
                },
                error => alert(error)
            );
    }

    return (
        <FormLayout name="Login">
            <form name="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-3 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" name="username" {...register('username')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    <div className="invalid-feedback">{errors.username?.message}</div>
                </div>
                <div className="col-span-3 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" name="password" {...register('password')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="col-span-3 sm:col-span-3">
                    <button                         type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                        Login
                    </button>
                </div>
                </div>
                </div>
            </div>
            </form>
        </FormLayout>
    );

}