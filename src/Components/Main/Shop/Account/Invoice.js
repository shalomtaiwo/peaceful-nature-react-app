import React from 'react'
import { GetInvoice } from './GetInvoice';
import { auth } from '../../../../Firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Loader, Center } from '@mantine/core';

const Invoice = () => {
    const [user, loading] = useAuthState(auth);
    let navigate = useNavigate();

    if (loading) {
        return (
            <Center style={{ width: '100vw', height: 400 }}>
                <Loader color="green" variant="dots" />
            </Center>
        );
    }

    if (user) {
        return (
            <div>
                <div>

                </div>
                <GetInvoice />
            </div>
        )
    }
    return navigate(`/account?ref=${window.location}`);
}

export default Invoice;