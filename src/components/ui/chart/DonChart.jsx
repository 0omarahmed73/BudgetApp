import './Chart.css'
import {Chart as ChartJS , ArcElement , Tooltip , Legend} from 'chart.js'
ChartJS.register(ArcElement , Tooltip , Legend);
import {Doughnut } from 'react-chartjs-2'

import React from 'react'

const DonChart = ({data , colors}) => {
  const options = {
    plugins : {
      legend : {
        labels : {
          color : '#ffff'
        }
      }
    }
  }
  const chartData = {
    labels : Object.keys(data),
    datasets : [
      {
        data : Object.values(data),
        backgroundColor : colors ,
        borderColor : '#ffff',
        borderWidth : 1
      }
    ]
  }
  console.log(chartData)
  return (
    <div className="dougnut-chart">
      <div className="dougnut-chart-box">
      <Doughnut data={chartData} options={options} ></Doughnut>
      </div>
      </div>
    )

}

export default DonChart