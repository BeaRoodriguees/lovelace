'use client'

import { Button } from '@mantine/core';
import { Navbar } from '@/components/Navbar';

import classes from './page.module.css';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { logout } from '@/lib/actions'

export default function ProblemSetList() {
    const session = useSession();
    
    const token = session.data?.user?.token
    console.log(session)
    console.log(token)
    
    // async function handleSummit() {

    //     const res = await fetch('http://localhost:8000/users/2', {
    //     method: 'PUT',
    //     headers:{
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`
    //     },    
    //     body: JSON.stringify({
    //         username: 'AAAAAA',
    //         password: 'Admin123'
    //     })

    //     });
    //     console.log(res)
    //     console.log(res.json())
    // }

    return (
    <main className={classes.container}>
      <Navbar></Navbar>
      <div className={classes.content}>
        <h1>PROBLEMSET</h1>
        <p>{token}</p>
        <p>Username: {session.data?.user.username}</p>
        <p>id: {session.data?.user.id}</p>
        {/* <Button variant="filled" onClick={() => handleSummit()}>Get started</Button> */}
        <Button variant="filled" onClick={() => logout()}>Signout</Button>
      </div>
    </main>
    )
}