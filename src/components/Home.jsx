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
      label: 'Sensor 1',
      data: [],
      backgroundColor: ["#FFA500"],
    },
    {
      label: 'Sensor 2',
      data: [],
      backgroundColor: ["#3750ad"],
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
        setArrData(chunkArray(emptyArr, 6))
        setError('')
        return setUserData({
          labels: chunkArray(emptyArr, 6)[slide].map((item) => item.time),
          datasets: [{
            label: 'Sensor 1',
            data: chunkArray(emptyArr, 6)[slide].map((item) => item.temp[0].sensor1),
            backgroundColor: ["#FFA500"],
          },{
            label: 'Sensor 2',
            data: chunkArray(emptyArr, 6)[slide].map((item) => item.temp[1].sensor2),
            backgroundColor: ["#3750ad"],
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
        <div className="bg-black shadow-md px-6 pt-2 pt-6 pb-2 
          flex justify-between">
          <h1 className='text-xl text-white mt-1 pb-2'>Sensores de Temperatura</h1>
          <button className='bg-red-700 hover:bg-red-500  py-1 px-4 
         text-black mb-2' onClick={handleLogout}>Salir</button>
        </div>

        <BarChart chartData={userData} slide={slide} setSlide={setSlide}
          arrData={arrData} setDate={setDate} date={date} TODAY={TODAY} error={error}/>

      </div>

    </Fragment>

  )
}
