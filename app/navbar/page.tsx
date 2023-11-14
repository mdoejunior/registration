'use client'

import React, {useEffect, useState} from 'react';
import {signOut} from 'next-auth/react';
const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="flex items-center justify-between">
                <div className="text-white text-xl">G3 LAZAMANI</div>
            </div>
        </nav>
    );
};

export default Navbar;