import React, { Fragment, useEffect, useState } from 'react';
import { useAuth } from '../context/authContext'
import BarChart from './BarChart';

import { chunkArray } from './chunker';
import { data } from '../Data/userdata'

let chunkedArr =  chunkArray(data, 4) 

export function Home() {

  const { user, logout, loading } = useAuth()
  const [slide, setSlide] = useState(0)
  const [userData, setUserData] = useState({

    labels: chunkedArr[slide].map((item) => item.time),
    datasets: [{
      label: 'Temp1',
      data: chunkedArr[slide].map((item) => item.temp1),
      backgroundColor: ["#FFA500"],
    },
    {
      label: 'Temp2',
      data: chunkedArr[slide].map((item) => item.temp2),
      backgroundColor: ["#176599"],
    }]
  })

  useEffect(()=>{
    setUserData({
      labels: chunkedArr[slide].map((item) => item.time),
      datasets: [{
        label: 'Temp',
        data: chunkedArr[slide].map((item) => item.temp1),
        backgroundColor: ["#FFA500"],
      },
      {
        label: 'Temp2',
        data: chunkedArr[slide].map((item) => item.temp2),
        backgroundColor: ["#176599"],
      }]
    })
  },[slide])


  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  if (loading === true) {
    return <h1>Loading...</h1>
  }

  return (

    <Fragment>
      <div className='w-full max-w text-black'>
        <div className="bg-white rounded shadow-md px-8 pt-6 pt-8 pb-8 mb-4">
          <h1 className='text-xl mb-4'>Welcome {user.email}</h1>
          <button className='bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 
        text-black' onClick={handleLogout}>logout</button>
        </div>

        <BarChart chartData={userData} slide={slide} setSlide={setSlide} 
        chunkedArr={chunkedArr}/>

      </div>
    </Fragment>

  )
}
