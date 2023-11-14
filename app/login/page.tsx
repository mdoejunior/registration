'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });
            console.log(res);
            if (res?.error) {
                setError('Login failed. Please check your credentials.');
            } else {
                localStorage.setItem("email",formData.email)
                router.replace('/dashboard');
            }
        } catch (err) {
            console.error('Error during sign-in:', err);
        } finally {
            setLoading(false);
        }

        // Clear the form fields after submission
        setFormData({
            email: '',
            password: '',
        });

        setTimeout(()=>{
            setError('')
        },2000)
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-96 p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 mb-2">{error}</div>}
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
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
                        type="submit"
                        disabled={loading} // Disable the button when loading is true
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-gray-600 text-sm">
                    Don't have an account? <Link href="/register" className="text-blue-600">Register here</Link>.
                </p>
            </div>
        </div>
    );
};

export default LoginForm;