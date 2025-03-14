import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReviewGraph() {
  const data = {
    labels: ['Janv', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin'],
    datasets: [
      { label: 'Avis 5 Étoiles', data: [12, 19, 3, 5, 2, 15], backgroundColor: '#4285F4', borderColor: '#4285F4', borderWidth: 1 },
      { label: 'Avis 1 Étoile', data: [2, 3, 5, 1, 4, 2], backgroundColor: '#DB4437', borderColor: '#DB4437', borderWidth: 1 },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Statistiques des Avis Google (Mensuel)', color: '#5F6368' },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="bg-google-gray p-4 rounded-lg shadow">
      <Bar data={data} options={options} />
    </div>
  );
}

export default ReviewGraph; // Ensure this is present