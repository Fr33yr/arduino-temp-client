import React, { Fragment, useEffect, useState } from 'react';
import { useAuth } from '../context/authContext'
import BarChart from './BarChart';

import { chunkArray } from './chunker';
import { query, orderBy, collection, getDocs, where } from "firebase/firestore";
import { db } from '../config/firebase.config';
import { data } from '../Data/userdata.js';

let chunkedArr = chunkArray(data, 5)
const today = new Date()

let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); 
let yyyy = today.getFullYear();

let TODAY = dd +"-"+ mm +"-"+ yyyy;

export function Home() {
  const { user, logout, loading } = useAuth()
  const [date, setDate] = useState(TODAY)
  const [slide, setSlide] = useState(0)
  const [userData, setUserData] = useState({

    labels: chunkedArr[slide].map((item) => item.time),
    datasets: [{
      label: 'Temp1',
      data: chunkedArr[slide].map((item) => item.temp),
      backgroundColor: ["#FFA500"],
    }]
  })
  
  const q = query(collection(db, 'temp-readings'),
    where('date', "==", TODAY),
    orderBy('time', 'asc'))

  useEffect(()=>{
    async function queryData() {
      let emptyArr = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          emptyArr.push(doc.data())
        })
      
      return chunkArray(emptyArr, 5) 
    }

  },[])
  

  
  

  useEffect(() => {
    setUserData({
      labels: chunkedArr[slide].map((item) => item.time),
      datasets: [{
        label: 'Temp',
        data: chunkedArr[slide].map((item) => item.temp),
        backgroundColor: ["#FFA500"],
      }]
    })
  }, [slide])

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
        <div className="bg-white rounded shadow-md px-6 pt-4 pt-6 pb-6 mb-3
          flex justify-between">
          <h1 className='text-xl mt-2'>Welcome {user.email}</h1>
          <button className='bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 
        text-black' onClick={handleLogout}>logout</button>
        </div>

        <BarChart chartData={userData} slide={slide} setSlide={setSlide}
          chunkedArr={chunkedArr} setDate={setDate} TODAY={TODAY}/>

      </div>
      
    </Fragment>

  )
}
