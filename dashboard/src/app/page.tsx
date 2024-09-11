'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import axios from 'axios';
import { createChart, IChartApi } from 'lightweight-charts';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string | string[];
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

const Dashboard: React.FC = () => {
  const [lineChartData, setLineChartData] = useState<ChartData | null>(null);
  const [barChartData, setBarChartData] = useState<ChartData | null>(null);
  const [pieChartData, setPieChartData] = useState<ChartData | null>(null);
  const [candleStickData, setCandleStickData] = useState<any[] | null>(null);

  const candlestickChartContainerRef = useRef<HTMLDivElement | null>(null);
  const candlestickChartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lineChartRes = await axios.get<ChartData>('http://localhost:8000/api/line-chart-data/');
        setLineChartData(lineChartRes.data);
  
        const barChartRes = await axios.get<ChartData>('http://localhost:8000/api/bar-chart-data/');
        setBarChartData(barChartRes.data);
  
        const pieChartRes = await axios.get<ChartData>('http://localhost:8000/api/pie-chart-data/');
        setPieChartData(pieChartRes.data);
  
        const candleStickRes = await axios.get('http://localhost:8000/api/candlestick-data/');
        setCandleStickData(candleStickRes.data.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (candlestickChartContainerRef.current && candleStickData) {
      const container = candlestickChartContainerRef.current;
      const chartWidth = container.clientWidth;
      const chartHeight = container.clientHeight;

      if (!candlestickChartRef.current) {
        candlestickChartRef.current = createChart(container, {
          width: chartWidth,
          height: chartHeight,
          layout: {
            textColor: '#FFF', 
          },
          grid: {
            vertLines: {
              color: '#E0E0E0',
            },
            horzLines: {
              color: '#E0E0E0',
            },
          },
          timeScale: {
            barSpacing: 150, 
          },
        });
      }

      const candlestickSeries = candlestickChartRef.current.addCandlestickSeries({
        upColor: 'green', 
        downColor: 'red', 
        borderUpColor: 'green',
        borderDownColor: 'red',
        wickUpColor: 'green',
        wickDownColor: 'red',
      });

      candlestickSeries.setData(candleStickData);
    }

    // Cleanup the chart on component unmount
    return () => {
      if (candlestickChartRef.current) {
        candlestickChartRef.current.remove();
      }
    };
  }, [candleStickData]);

  // Adjust chart size on window resize
  useEffect(() => {
    const handleResize = () => {
      if (candlestickChartRef.current && candlestickChartContainerRef.current) {
        const container = candlestickChartContainerRef.current;
        candlestickChartRef.current.resize(container.clientWidth, container.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}> {}
      <h1 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '40px' }}>Dashboard</h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '60px', 
        marginTop: '20px'
      }}>
        <div style={{ marginBottom: '40px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}> {}
          <h2 style={{ color: '#FF5733', textAlign: 'left', marginBottom: '10px' }}>Line Chart</h2>{}
          {lineChartData && (
            <Line
              data={lineChartData}
              options={{
                responsive: true,
                plugins: { 
                  legend: { display: true },
                },
                spanGaps: true,
                elements: {
                  line: {
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  },
                },
                layout: {
                  padding: { bottom: 20 } 
                }
              }}
            />
          )}
        </div>

        <div style={{ marginBottom: '40px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}> {}
          <h2 style={{ color: '#FF5733', textAlign: 'left', marginBottom: '10px' }}>Bar Chart</h2>{}
          {barChartData && (
            <Bar
              data={barChartData}
              options={{ 
                responsive: true, 
                plugins: { legend: { display: true } },
                layout: {
                  padding: { bottom: 20 } 
                }
              }}
            />
          )}
        </div>

        <div style={{ marginBottom: '40px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}>
  <h2 style={{ color: '#FF5733', textAlign: 'left', marginBottom: '10px' }}>Pie Chart</h2>
  <div style={{ width: '50%', height: 'auto', margin: '0 auto' }}> {}
    {pieChartData && (
      <Pie
        data={pieChartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: true },
          },
        }}
      />
    )}
  </div>
</div>


        <div style={{ marginBottom: '40px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}> {}
          <h2 style={{ color: '#FF5733', textAlign: 'left', marginBottom: '10px' }}>Candlestick Chart</h2> {}
          <div
            ref={candlestickChartContainerRef}
            style={{ width: '100%', height: '500px', position: 'relative', backgroundColor: '#000' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
