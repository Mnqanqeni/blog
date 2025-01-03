import { useState } from 'react'
import { Client } from 'appwrite';
import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
function App() {
  return (
    <>
    <div>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </div>  
    </>
  )
}

export default App
