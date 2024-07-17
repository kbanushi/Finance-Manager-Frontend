import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ data }) => {
    const transformedData = [];
    const categories = Object.keys(data);

    categories.forEach((category) => {
        if (Array.isArray(data[category])) {
            data[category].forEach(([date, description, amount]) => {
                let existingEntry = transformedData.find((entry) => entry.date === date);
                if (!existingEntry) {
                    existingEntry = { date };
                    transformedData.push(existingEntry);
                }
                existingEntry[category] = parseFloat(amount);
            });
        }
    });

    const chartData = {
        labels: transformedData.map(entry => entry.date),
        datasets: categories.map((category, index) => ({
            label: category,
            data: transformedData.map(entry => entry[category] || 0),
            borderColor: `rgba(${(index * 70) % 255}, ${(index * 50) % 255}, ${(index * 30) % 255}, 0.5)`,
            backgroundColor: `rgba(${(index * 70) % 255}, ${(index * 50) % 255}, ${(index * 30) % 255}, 0.5)`,
            fill: false,
        })),
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'CSV Data Visualization',
            },
        },
        scales: {
            x: {
                type: 'category',
                labels: transformedData.map(entry => entry.date),
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default Chart;
