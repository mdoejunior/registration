'use client'
import React, {ChangeEvent, FormEvent, useState} from 'react';
import axios from 'axios';
import {redirect} from "next/navigation";
import {useRouter} from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false); // Add isLoading state
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter(); // Initialize the router

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const registrationResponse = await axios.post('/api/register', formData);
            console.log('Data submitted successfully:', registrationResponse.data);
            setSuccessMessage('Registered Successfully');

        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setIsLoading(false);
            setFormData({
                name: '',
                email: '',
                password: '',
            });

            setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
                router.push('/login')
            }, 2000);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-96 p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl mb-4">Register</h2>
                {successMessage && (
                    <div className="bg-green-200 text-green-800 p-2 mb-2 rounded">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="bg-white-200 text-red-500 p-2 mb-2 rounded">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        className={`w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>
                </form>
                {/* "Already have an account? Login" link */}
                <p className="mt-4 text-gray-600 text-sm">
                    Already have an account? <Link href="/login" className='text-blue-600'>Login</Link>.
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;