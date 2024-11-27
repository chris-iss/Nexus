import { useEffect, useState } from 'react';
import { supabase } from "../supaClient";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardGraph = () => {
  const [monthlySalesData, setMonthlySalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const { data, error } = await supabase.from("orders").select("*");

        if (error) throw error

        aggregateSalesByMonth(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const aggregateSalesByMonth = (data) => {
      const salesByMonth = Array(12).fill(0); // Initialize array for each month

      data.forEach(order => {
        
        if (order.date) {
          const date = new Date(order.date);
    
          if (!isNaN(date)) {
            const monthIndex = date.getMonth(); // 0 = January, ..., 11 = December
            let orderTotal = 0;

            const totalSales = parseFloat(order.quantity) * parseFloat(order.amount);
              orderTotal += totalSales;

            salesByMonth[monthIndex] += orderTotal; // Sum up sales for the month
          } else {
            console.warn('Invalid date encountered for order ID:', order.id);
          }
        }
      });

      const formattedData = salesByMonth.map((sales, index) => ({
        month: new Date(0, index).toLocaleString('en', { month: 'long' }),
        totalSales: sales,
      }));

      setMonthlySalesData(formattedData);
    };

    fetchData();
  }, []);

  const graphData = {
    labels: monthlySalesData.map(item => item.month),
    datasets: [
      {
        label: 'Total Sales',
        data: monthlySalesData.map(item => item.totalSales),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4, // Adds curve to the line
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Months',
          font: {
            size: 16,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.3)',
          borderDash: [5, 5],
        },
        title: {
          display: true,
          text: 'Total Sales',
          font: {
            size: 16,
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className='graph-wrapper' style={{ height: '400px', width: '95%', marginBottom: "120px" }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Woocommerce Monthly Total Sales Graph</h2>
      <Line data={graphData} options={options} />
    </div>
  );
};

export default DashboardGraph;
