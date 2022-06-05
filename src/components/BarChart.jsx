import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'


function BarChart({ chartData, slide, setSlide, arrData, setDate, date, TODAY, error }) {

    const options = {
        scales: {
            y: {
                title: {
                    color: 'gray',
                    display: true,
                    text: 'Temperatura °C'
                }
            }
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setDate(e.target.value)
        setSlide(0)
    }

    const handleClick = () => {
        setDate(TODAY)
        setSlide(0)
    }

    const handleErrorMessage = () => {
        if (error === '') {
            return 'hidden'
        }
    }

    return (
        <div className='w-full w-1/2 m-auto mt-16 mb-28'>
            <h1 className={`text-center mx-auto my-0 bg-red-400
            w-max mb-12 py-1 px-2 border-solid border-2
            border-red-500 rounded-sm ${handleErrorMessage()}`}>{error}</h1>
            <button className="bg-blue-500 ml-16 px-4 py-1"
                onClick={handleClick}>Hoy</button>
            <input type="date" name="date" id="date" value={date} className="ml-12 mb-10"
                onChange={(e) => handleChange(e)} />
            
            <Bar data={chartData} options={options} />

            <div className="btns-container flex justify-between mt-10">
                <button onClick={() => setSlide(slide - 1)}
                    className="bg-blue-500 ml-8 disabled:opacity-25  px-3 py-1"
                    disabled={slide === 0 ? true : false}>Anterior</button>
                <button onClick={() => setSlide(slide + 1)}
                    className="bg-blue-500 mr-8 disabled:opacity-25  px-3 py-1"
                    disabled={slide === (arrData.length - 1) ? true : false}>
                    Siguiente</button>
            </div>
        </div>
    )
}

export default BarChart