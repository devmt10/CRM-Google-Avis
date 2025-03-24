import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Statistics() {
  const navigate = useNavigate();

  const businesses = [
    { id: 1, name: 'Business A', monthlyRevenue: [2000, 2500, 3000, 3500, 4000, 5000], annualRevenue: 35000 },
    { id: 2, name: 'Business B', monthlyRevenue: [1000, 1500, 2000, 2500, 2800, 3000], annualRevenue: 20000 },
  ];

  const globalMonthlyRevenue = businesses.reduce((acc, b) => {
    return acc.map((val, idx) => val + b.monthlyRevenue[idx]);
  }, [0, 0, 0, 0, 0, 0]);
  const globalAnnualRevenue = businesses.reduce((sum, b) => sum + b.annualRevenue, 0);

  const monthlyChartData = {
    labels: ['Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar'],
    datasets: [
      ...businesses.map((b) => ({
        label: b.name,
        data: b.monthlyRevenue,
        backgroundColor: b.id === 1 ? '#34A853' : '#4285F4',
      })),
      { label: 'Global', data: globalMonthlyRevenue, backgroundColor: '#EA4335' },
    ],
  };

  const annualChartData = {
    labels: businesses.map(b => b.name).concat('Global'),
    datasets: [{
      label: 'CA Annuel (€)',
      data: businesses.map(b => b.annualRevenue).concat(globalAnnualRevenue),
      backgroundColor: ['#34A853', '#4285F4', '#EA4335'],
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' }, title: { display: true, text: 'Chiffre d’Affaires' } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <main className="flex-1 p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Statistiques - Kingdom Ads</h1>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">CA Mensuel (6 derniers mois)</h2>
        <Bar data={monthlyChartData} options={{ ...chartOptions, title: { text: 'CA Mensuel (€)' } }} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">CA Annuel</h2>
        <Bar data={annualChartData} options={{ ...chartOptions, title: { text: 'CA Annuel (€)' } }} />
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate('/kingdomads')}
          className="text-blue-600 hover:text-yellow-500 underline text-lg font-semibold"
        >
          Retour au Tableau de Bord
        </button>
      </div>
    </main>
  );
}

export default Statistics;