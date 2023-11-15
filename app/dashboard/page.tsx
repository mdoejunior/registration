'use client';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {AnimatePresence} from 'framer-motion';
import axios from 'axios';

type UserDetails = {
    firstName: string;
    middleName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    location: string;
    hasBothParents: false,
    hasOneParent: false,
    hasNoParents: false,
    firstParentFirstName: string,
    firstParentLastName: string,
    firstParentPhoneNumber: string,
    firstParentAddress: string,
    firstParentGender: "male" | "female" | '',
    secondParentFirstName: string,
    secondParentLastName: string,
    secondParentPhoneNumber: string,
    secondParentAddress: string,
    secondParentGender: "male" | "female" | '',
    nextOfKin1FirstName: string;
    nextOfKin1LastName: string;
    nextOfKin1PhoneNumber: string;
    nextOfKin1Address: string;
    nextOfKin1Relation: string;
    nextOfKin2FirstName: string;
    nextOfKin2LastName: string;
    nextOfKin2PhoneNumber: string;
    nextOfKin2Relation: string;
    nextOfKin2Address: string;
    nextOfKin1Gender: "male" | "female" | '',
    nextOfKin2Gender: "male" | "female" | '',
};

const UserForm: React.FC = () => {
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<UserDetails>({
        firstName: '',
        middleName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        location: '',
        hasBothParents: false,
        hasOneParent: false,
        hasNoParents: false,
        firstParentFirstName: '',
        firstParentLastName: '',
        firstParentPhoneNumber: '',
        firstParentAddress: '',
        firstParentGender: '',
        secondParentFirstName: '',
        secondParentLastName: '',
        secondParentPhoneNumber: '',
        secondParentAddress: '',
        secondParentGender: '',
        nextOfKin1FirstName: '',
        nextOfKin1LastName: '',
        nextOfKin1PhoneNumber: '',
        nextOfKin1Address: '',
        nextOfKin1Relation: '',
        nextOfKin2FirstName: '',
        nextOfKin2LastName: '',
        nextOfKin2PhoneNumber: '',
        nextOfKin2Address: '',
        nextOfKin2Relation: '',
        nextOfKin1Gender: '',
        nextOfKin2Gender: ''
    });

    const [confirmation, setConfirmation] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
    const [registrationMessage, setRegistrationMessage] = useState<String>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleBothParentsCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setFormData({...formData, [name]: checked});

        // If the user doesn't have parents, clear parent fields
        if (!checked) {
            setFormData({
                ...formData,
                hasBothParents: false,
                firstParentFirstName: '',
                firstParentLastName: '',
                firstParentPhoneNumber: '',
                firstParentAddress: '',
                firstParentGender: '',
                secondParentFirstName: '',
                secondParentLastName: '',
                secondParentPhoneNumber: '',
                secondParentAddress: '',
                secondParentGender: ''
            });
        }
    };


    const handleOneParentsCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setFormData({...formData, [name]: checked});

        // If the user doesn't have parents, clear parent fields
        if (!checked) {
            setFormData({
                ...formData,
                hasOneParent: false,
                firstParentFirstName: '',
                firstParentLastName: '',
                firstParentPhoneNumber: '',
                firstParentAddress: '',
                firstParentGender: '',
                nextOfKin1FirstName: '',
                nextOfKin1LastName: '',
                nextOfKin1PhoneNumber: '',
                nextOfKin1Address: '',
                nextOfKin1Relation: '',
                nextOfKin1Gender: ''
            });
        }
    };

    const handleNoParentsCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setFormData({...formData, [name]: checked});
        // If the user doesn't have parents, clear parent fields
        if (!checked) {
            setFormData({
                ...formData,
                hasNoParents: false,
                nextOfKin1FirstName: '',
                nextOfKin1LastName: '',
                nextOfKin1PhoneNumber: '',
                nextOfKin1Address: '',
                nextOfKin1Relation: '',
                nextOfKin2FirstName: '',
                nextOfKin2LastName: '',
                nextOfKin2PhoneNumber: '',
                nextOfKin2Address: '',
                nextOfKin2Relation: '',
                nextOfKin1Gender: '',
                nextOfKin2Gender: ''
            });
        }
    };

    const handle1GenderChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        if (value === 'male' || value === 'female' || value === '') {
            setFormData({...formData, firstParentGender: value as '' | 'male' | 'female'});
        }
    };

    const handle2GenderChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        if (value === 'male' || value === 'female' || value === '') {
            setFormData({...formData, secondParentGender: value as '' | 'male' | 'female'});
        }
    };


    const handleKin1GenderChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        if (value === 'male' || value === 'female' || value === '') {
            setFormData({...formData, nextOfKin1Gender: value as '' | 'male' | 'female'});
        }
    };

    const handleKin2GenderChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        if (value === 'male' || value === 'female' || value === '') {
            setFormData({...formData, nextOfKin2Gender: value as '' | 'male' | 'female'});
        }
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setConfirmation(true);
    };

    const handleConfirm = async () => {
        setisLoading(true);
        try {
            const response = await axios.post('/api/masasi', formData);
            console.log('Data submitted successfully:', response.data);
            setRegistrationSuccess(true);
            setRegistrationMessage('Registered Successfully!');
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setisLoading(false);
            setFormData({
                firstName: '',
                middleName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                location: '',
                hasBothParents: false,
                hasOneParent: false,
                hasNoParents: false,
                firstParentFirstName: '',
                firstParentLastName: '',
                firstParentPhoneNumber: '',
                firstParentAddress: '',
                firstParentGender: '',
                secondParentFirstName: '',
                secondParentLastName: '',
                secondParentPhoneNumber: '',
                secondParentAddress: '',
                secondParentGender: '',
                nextOfKin1FirstName: '',
                nextOfKin1LastName: '',
                nextOfKin1PhoneNumber: '',
                nextOfKin1Address: '',
                nextOfKin1Relation: '',
                nextOfKin2FirstName: '',
                nextOfKin2LastName: '',
                nextOfKin2PhoneNumber: '',
                nextOfKin2Address: '',
                nextOfKin2Relation: '',
                nextOfKin1Gender: '',
                nextOfKin2Gender: ''
            });
            setConfirmation(false);
            setTimeout(() => {
                setRegistrationMessage('');
            }, 2000);
        }
    };

    const closeModal = () => {
        setConfirmation(false);
    };

    return (
        <div className="flex flex-col items-center w-full bg-gray-100">
            <div className="min-h-screen flex flex-col justify-center items-center">
                <h1 className="text-4xl mb-10 text-center text-teal-500">
                    G3-LAZAMANI REGISTRATION FORM
                </h1>
                <div className="max-w-screen-md w-full p-6 bg-white shadow-lg rounded-lg">
                    {registrationSuccess && (
                        <h1 className="text-lg text-center text-green-500 mb-3">
                            {registrationMessage}
                        </h1>
                    )}
                    <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-gray-600">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="middleName" className="block text-gray-600">
                                Middle Name
                            </label>
                            <input
                                type="text"
                                id="middleName"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-gray-600">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-600">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-gray-600">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="location" className="block text-gray-600">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4 col-span-3">
                            <label className="block text-gray-600">
                                <input
                                    type="checkbox"
                                    name="hasBothParents"
                                    checked={formData.hasBothParents}
                                    onChange={handleBothParentsCheckboxChange}
                                    className="mr-2"
                                />
                                I have Both parents
                            </label>
                        </div>

                        <div className="mb-4 col-span-3">
                            <label className="block text-gray-600">
                                <input
                                    type="checkbox"
                                    name="hasOneParent"
                                    checked={formData.hasOneParent}
                                    onChange={handleOneParentsCheckboxChange}
                                    className="mr-2"
                                />
                                I have One parent
                            </label>
                        </div>

                        <div className="mb-4 col-span-3">
                            <label className="block text-gray-600">
                                <input
                                    type="checkbox"
                                    name="hasNoParents"
                                    checked={formData.hasNoParents}
                                    onChange={handleNoParentsCheckboxChange}
                                    className="mr-2"
                                />
                                I have No parents
                            </label>
                        </div>

                        {formData.hasBothParents && (
                            <>
                                {/* Parent details */}
                                <div className="mb-4 col-span-3">
                                    <label className="block text-gray-600">First Parent's Gender:</label>
                                    <div className="flex items-center">
                                        <label className="mr-4 flex items-center">
                                            <input
                                                type="radio"
                                                name="firstParentGender"
                                                value="male"
                                                checked={formData.firstParentGender === 'male'}
                                                onChange={handle1GenderChange}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-700">Male</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="firstParentGender"
                                                value="female"
                                                checked={formData.firstParentGender === 'female'}
                                                onChange={handle1GenderChange}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-700">Female</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="parentFirstName" className="block text-gray-600">
                                        First Parent's First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstParentFirstName"
                                        name="firstParentFirstName"
                                        value={formData.firstParentFirstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="parentLastName" className="block text-gray-600">
                                        First Parent's Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstParentLastName"
                                        name="firstParentLastName"
                                        value={formData.firstParentLastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="parentPhoneNumber" className="block text-gray-600">
                                        First Parent's Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="firstParentPhoneNumber"
                                        name="firstParentPhoneNumber"
                                        value={formData.firstParentPhoneNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="parentPhoneNumber" className="block text-gray-600">
                                        First Parent's Address
                                    </label>
                                    <input
                                        type="text"
                                        id="firstParentAddress"
                                        name="firstParentAddress"
                                        value={formData.firstParentAddress}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4 col-span-3">
                                    <label className="block text-gray-600">Second Parent's Gender:</label>
                                    <div className="flex items-center">
                                        <label className="mr-4 flex items-center">
                                            <input
                                                type="radio"
                                                name="secondParentGender"
                                                value="male"
                                                checked={formData.secondParentGender === 'male'}
                                                onChange={handle1GenderChange}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-700">Male</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="secondParentGender"
                                                value="female"
                                                checked={formData.secondParentGender === 'female'}
                                                onChange={handle1GenderChange}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-700">Female</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="parentFirstName" className="block text-gray-600">
                                        Second Parent's First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="secondParentFirstName"
                                        name="secondParentFirstName"
                                        value={formData.secondParentFirstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="parentLastName" className="block text-gray-600">
                                        Second Parent's Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="secondParentLastName"
                                        name="secondParentLastName"
                                        value={formData.secondParentLastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="parentPhoneNumber" className="block text-gray-600">
                                        Second Parent's Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="secondParentPhoneNumber"
                                        name="secondParentPhoneNumber"
                                        value={formData.secondParentPhoneNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="parentPhoneNumber" className="block text-gray-600">
                                        Second Parent's Address
                                    </label>
                                    <input
                                        type="text"
                                        id="secondParentAddress"
                                        name="pasecondParentAddressrentAddress"
                                        value={formData.secondParentAddress}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </>
                        )}

                        {formData.hasOneParent && (
                            <>
                                {/* Parent details */}
                                <div className="mb-4 col-span-3">
                                    <label className="block text-gray-600">First Parent's Gender:</label>
                                    <div className="flex items-center">
                                        <label className="mr-4 flex items-center">
                                            <input
                                                type="radio"
                                                name="firstParentGender"
                                                value="male"
                                                checked={formData.firstParentGender === 'male'}
                                                onChange={handle1GenderChange}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-700">Male</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="firstParentGender"
                                                value="female"
                                                checked={formData.firstParentGender === 'female'}
                                                onChange={handle1GenderChange}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-700">Female</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="parentFirstName" className="block text-gray-600">
                                        First Parent's First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstParentFirstName"
                                        name="firstParentFirstName"
                                        value={formData.firstParentFirstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="parentLastName" className="block text-gray-600">
                                        First Parent's Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstParentLastName"
                                        name="firstParentLastName"
                                        value={formData.firstParentLastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="parentPhoneNumber" className="block text-gray-600">
                                        First Parent's Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="firstParentPhoneNumber"
                                        name="firstParentPhoneNumber"
                                        value={formData.firstParentPhoneNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="parentPhoneNumber" className="block text-gray-600">
                                        First Parent's Address
                                    </label>
                                    <input
                                        type="text"
                                        id="firstParentAddress"
                                        name="firstParentAddress"
                                        value={formData.firstParentAddress}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4 col-span-3">
                                    <label className="block text-gray-600">First Next Of Kin's Gender:</label>
                                    <div className="flex items-center">
                                        <label className="mr-4 flex items-center">
                                            <input
                                                type="radio"
                                                name="nextOfKin1Gender"
                                                value="male"
                                                checked={formData.nextOfKin1Gender === 'male'}
                                                onChange={handle1GenderChange}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-700">Male</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="nextOfKin1Gender"
                                                value="female"
                                                checked={formData.nextOfKin1Gender === 'female'}
                                                onChange={handle1GenderChange}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-700">Female</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="nextOfKinFirstName" className="block text-gray-600">
                                        First Next of Kin's First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="nextOfKin1FirstName"
                                        name="nextOfKin1FirstName"
                                        value={formData.nextOfKin1FirstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="nextOfKinLastName" className="block text-gray-600">
                                        First Next of Kin's Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="nextOfKin1LastName"
                                        name="nextOfKin1LastName"
                                        value={formData.nextOfKin1LastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="nextOfKinPhoneNumber" className="block text-gray-600">
                                        First Next of Kin's Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="nextOfKin1PhoneNumber"
                                        name="nextOfKin1PhoneNumber"
                                        value={formData.nextOfKin1PhoneNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="nextOfKinAddress" className="block text-gray-600">
                                        First Next of Kin's Address
                                    </label>
                                    <input
                                        type="text"
                                        id="nextOfKin1Address"
                                        name="nextOfKin1Address"
                                        value={formData.nextOfKin1Address}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="nextOfKinAddress" className="block text-gray-600">
                                        First Next of Kin's Relation
                                    </label>
                                    <input
                                        type="text"
                                        id="nextOfKin1Relation"
                                        name="nextOfKin1Relation"
                                        value={formData.nextOfKin1Relation}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </>
                        )}

                        {formData.hasNoParents && (<>
                                {/* Next of kin details */}
                                <div className="mb-4 col-span-3">
                                    <label className="block text-gray-600">First Next Of Kin's Gender:</label>
                                    <div className="flex items-center">
                                        <label className="mr-4 flex items-center">
                                            <input
                                                type="radio"
                                                name="nextOfKin1Gender"
                                                value="male"
                                                checked={formData.nextOfKin1Gender === 'male'}
                                                onChange={handle1GenderChange}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-700">Male</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="nextOfKin1Gender"
                                                value="female"
                                                checked={formData.nextOfKin1Gender === 'female'}
                                                onChange={handle1GenderChange}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-700">Female</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="nextOfKinFirstName" className="block text-gray-600">
                                        First Next of Kin's First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="nextOfKin1FirstName"
                                        name="nextOfKin1FirstName"
                                        value={formData.nextOfKin1FirstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="nextOfKinLastName" className="block text-gray-600">
                                        First Next of Kin's Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="nextOfKin1LastName"
                                        name="nextOfKin1LastName"
                                        value={formData.nextOfKin1LastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="nextOfKinPhoneNumber" className="block text-gray-600">
                                        First Next of Kin's Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="nextOfKin1PhoneNumber"
                                        name="nextOfKin1PhoneNumber"
                                        value={formData.nextOfKin1PhoneNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="nextOfKinAddress" className="block text-gray-600">
                                        First Next of Kin's Address
                                    </label>
                                    <input
                                        type="text"
                                        id="nextOfKin1Address"
                                        name="nextOfKin1Address"
                                        value={formData.nextOfKin1Address}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="nextOfKinAddress" className="block text-gray-600">
                                        First Next of Kin's Relation
                                    </label>
                                    <input
                                        type="text"
                                        id="nextOfKin1Relation"
                                        name="nextOfKin1Relation"
                                        value={formData.nextOfKin1Relation}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4 col-span-3">
                                    <label className="block text-gray-600">Second Next Of Kin's Gender:</label>
                                    <div className="flex items-center">
                                        <label className="mr-4 flex items-center">
                                            <input
                                                type="radio"
                                                name="nextOfKin2Gender"
                                                value="male"
                                                checked={formData.nextOfKin2Gender === 'male'}
                                                onChange={handle1GenderChange}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-700">Male</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="nextOfKi21Gender"
                                                value="female"
                                                checked={formData.nextOfKin2Gender === 'female'}
                                                onChange={handle1GenderChange}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-700">Female</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="nextOfKinFirstName" className="block text-gray-600">
                                        Second Next of Kin's First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="nextOfKin2FirstName"
                                        name="nextOfKin2FirstName"
                                        value={formData.nextOfKin2FirstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="nextOfKinLastName" className="block text-gray-600">
                                        Second Next of Kin's Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="nextOfKin2LastName"
                                        name="nextOfKin2LastName"
                                        value={formData.nextOfKin2LastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="nextOfKinPhoneNumber" className="block text-gray-600">
                                        Second Next of Kin's Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="nextOfKin2PhoneNumber"
                                        name="nextOfKin2PhoneNumber"
                                        value={formData.nextOfKin2PhoneNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="nextOfKinAddress" className="block text-gray-600">
                                        Second Next of Kin's Address
                                    </label>
                                    <input
                                        type="text"
                                        id="nextOfKin2Address"
                                        name="nextOfKin2Address"
                                        value={formData.nextOfKin2Address}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="nextOfKinAddress" className="block text-gray-600">
                                        Second Next of Kin's Relation
                                    </label>
                                    <input
                                        type="text"
                                        id="nextOfKin2Relation"
                                        name="nextOfKin2Relation"
                                        value={formData.nextOfKin2Relation}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </>
                        )}

                        <div className="text-center col-span-3">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <AnimatePresence>
                    {confirmation && (
                        <div
                            className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
                            onClick={closeModal}
                        >
                            <div
                                className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <p className="text-teal-500 text-lg mb-2">
                                    Please confirm your details:
                                </p>
                                <div className="mb-4">
                                    {Object.entries(formData).map(([fieldName, value]) => (
                                        <p key={fieldName}>
                                            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}: {value}
                                        </p>
                                    ))}
                                </div>
                                {isLoading ? (
                                    <div className="text-center">
                                        <p
                                            className={`animate-pulse ${
                                                isLoading ? 'text-blue-500' : 'text-gray-600'
                                            }`}
                                        >
                                            Confirming...
                                        </p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleConfirm}
                                        className="bg-green-500 text-white py-2 px-4 rounded hover-bg-green-600"
                                    >
                                        Confirm
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
        ;
};

export default UserForm;