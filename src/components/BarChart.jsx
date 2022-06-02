import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'




function BarChart({ chartData, slide, setSlide, chunkedArr, setDate, TODAY }) {

    return (
        <div className='w-full max-w-xs m-auto mt-32 mb-28'>
            <button className="bg-blue-500 ml-16 px-4 py-1"
            onClick={()=>setDate(TODAY)}>Hoy</button>
            <input type="date" name="date" id="date" className="ml-12 mb-10"
            onChange={(e)=>setDate(e.target.value)}/>
            <Bar data={chartData} />

            <div className="btns-container flex justify-between mt-10">
                <button onClick={() => setSlide(slide - 1)}
                    className="bg-blue-500 ml-12 disabled:opacity-25  px-3 py-1"
                    disabled={slide === 0 ? true : false}>Anterior</button>
                <button onClick={() => setSlide(slide + 1)}
                    className="bg-blue-500 mr-12 disabled:opacity-25  px-3 py-1"
                    disabled={slide === (chunkedArr.length - 1) ? true : false}>
                    Siguiente</button>
            </div>
        </div>
    )
}

export default BarChart