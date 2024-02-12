import React, { useEffect, useState, useRef, useMemo } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useLocalStorage } from '../../components/CustomHooks/useLocalStorage';
import './storagePath.css';

const StoragePath = () => {
    // const url = useRef();
    const [name, setName] = useLocalStorage("url", "");

    return (
        <>
            <Navbar />
            <div className='lienzo'>
                <div className='formulario'>
                    Link rest api incluya puerto default :8080/ <br />
                    ejemplo http://192.168.1.121:8080/ <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="url"
                        aria-label="url"
                    /><br />
                    <br />

                </div>
            </div>
        </>);
}

export default StoragePath;