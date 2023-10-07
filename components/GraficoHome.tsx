'use client'
import React from 'react'
// import Chart from 'react-apexcharts'
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type Props = {
    dados: any;
}

const GraficoHome = ({dados}: Props) => {
    console.log(dados)
    const options = {
        series:  [
            {
                name:"T-shirt",
                data:[234,45,67,987,345,456,87,321,45,569,76,890]
            },
            {
              name:"Shirt",
              data:[562,145,267,97,45,156,87,321,845,969,706,20]
            },
            {
              name:"Jeans",
              data:[1012,345,117,697,845,56,287,1321,1845,469,306,120]
            }
        ]
    };

    const OptionsChart = {
        title:{ text:"Product sell in 2021"},
        xaxis:{
            title:{text:"Product Sell in Months"},
            categories:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        },
        yaxis:{
            title:{text:"Product in K"}                 
        },
        tooltip: {
            enabled: true,
            theme: 'dark'
        },
        chart: {
            foreColor: 'white'
        },
        markers: {
            size: 4,
            strokeWidth: 2,
            strokeColor: '#ffd'
        },
        grid: {
            show: true
        }
    }

  return (
      <Chart options={OptionsChart} series={options.series} type="line" width={1100} height={550} />
    )
}

export default GraficoHome