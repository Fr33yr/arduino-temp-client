import React, { Fragment, useEffect, useState } from 'react';
import { useAuth } from '../context/authContext'
import BarChart from './BarChart';

import { chunkArray } from './chunker';
import { query, orderBy, collection, getDocs, where } from "firebase/firestore";
import { db } from '../config/firebase.config';


const today = new Date()

let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

let TODAY = yyyy+"-"+mm+"-"+dd;

export function Home() {
  const { user, logout, loading } = useAuth()
  const [date, setDate] = useState(TODAY)
  const [slide, setSlide] = useState(0)
  const [arrData, setArrData] = useState([])
  const [error, setError] = useState('')
  const [userData, setUserData] = useState({

    labels: [],
    datasets: [{
      label: 'Temp1',
      data: [],
      backgroundColor: ["#FFA500"],
    }]
  })


  useEffect(() => {
    const q = query(collection(db, 'temp-readings'),
    where('date', "==", date),
    orderBy('time', 'asc'))

    async function queryData() {  

      try {
        let emptyArr = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          emptyArr.push(doc.data())
        })
        setArrData(chunkArray(emptyArr, 5))
        setError('')
        return setUserData({
          labels: chunkArray(emptyArr, 5)[slide].map((item) => item.time),
          datasets: [{
            label: 'Temp',
            data: chunkArray(emptyArr, 5)[slide].map((item) => item.temp),
            backgroundColor: ["#FFA500"],
          }]
        })
      } catch (e) {
        if (e.message.includes('undefined') && date !== "") {
          setError("No hay registros en esa fecha")
        }
      }

    }
    queryData()
    console.log(date);
  }, [slide, date])


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
        <div className="bg-white rounded shadow-md px-6 pt-2 pt-6 pb-2 
          flex justify-between">
          <h1 className='text-xl mt-2'>Welcome {user.email}</h1>
          <button className='bg-slate-200 hover:bg-slate-300 rounded py-1 px-4 
        text-black' onClick={handleLogout}>logout</button>
        </div>

        <BarChart chartData={userData} slide={slide} setSlide={setSlide}
          arrData={arrData} setDate={setDate} date={date} TODAY={TODAY} error={error}/>

      </div>

    </Fragment>

  )
}
