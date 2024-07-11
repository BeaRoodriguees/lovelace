import { Button } from '@mantine/core';
import { Navbar } from '@/components/Navbar';

import classes from './page.module.css';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { logout } from '@/lib/actions'

export default function Home() {  

  return (
    <main className={classes.container}>
      {/* <Navbar></Navbar> */}
      <div className={classes.content}>
        <h1>Welcome page - Hero section</h1>
      </div>
    </main>
  )
}