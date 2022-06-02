import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'


function BarChart({ chartData, slide, setSlide, chunkedArr }) {

    return (
        <div className='w-full max-w-xs m-auto mt-32'>
            <Bar data={chartData} className="mt-32" />

            <div className="btns-container flex justify-between mt-6">
                <button onClick={() => setSlide(slide - 1)}
                    className="bg-blue-500 ml-16 disabled:opacity-25"
                    disabled={slide === 0 ? true : false}>Anterior</button>
                <button onClick={() => setSlide(slide + 1)}
                    className="bg-blue-500 mr-16 disabled:opacity-25"
                    disabled={slide === (chunkedArr.length - 1) ? true : false}>
                    Siguiente</button>
            </div>
        </div>
    )
}

export default BarChart