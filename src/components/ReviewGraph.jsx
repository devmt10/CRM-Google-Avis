// Importation de React et des composants nécessaires pour les graphiques
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Données fictives pour un exemple de graphique mensuel
const monthlyStats = {
  labels: ['Janv', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin'],
  datasets: [
    { label: '5 Étoiles', data: [12, 19, 3, 5, 2, 15], backgroundColor: '#4285F4', borderColor: '#4285F4', borderWidth: 1 },
    { label: '4 Étoiles', data: [2, 3, 5, 1, 4, 2], backgroundColor: '#34C759', borderColor: '#34C759', borderWidth: 1 },
    { label: '3 Étoiles', data: [5, 3, 4, 1, 2, 2], backgroundColor: '#FBBC05', borderColor: '#FBBC05', borderWidth: 1 },
    { label: '2 Étoiles', data: [3, 3, 5, 1, 1, 2], backgroundColor: '#FF7400', borderColor: '#FF7400', borderWidth: 1 },
    { label: '1 Étoile', data: [1, 1, 5, 2, 5, 2], backgroundColor: '#EA4335', borderColor: '#EA4335', borderWidth: 1 },
  ],
};

// Données fictives pour un exemple de graphique annuel
const yearlyStats = {
  labels: ['2025', '2024', '2023', '2022', '2021', '2020'],
  datasets: [
    { label: '5 Étoiles', data: [48, 42, 35, 30, 25, 20], backgroundColor: '#4285F4', borderColor: '#4285F4', borderWidth: 1 },
    { label: '4 Étoiles', data: [15, 12, 10, 8, 7, 5], backgroundColor: '#34C759', borderColor: '#34C759', borderWidth: 1 },
    { label: '3 Étoiles', data: [10, 9, 8, 7, 6, 5], backgroundColor: '#FBBC05', borderColor: '#FBBC05', borderWidth: 1 },
    { label: '2 Étoiles', data: [5, 4, 3, 3, 2, 2], backgroundColor: '#FF7400', borderColor: '#FF7400', borderWidth: 1 },
    { label: '1 Étoile', data: [3, 2, 5, 4, 3, 2], backgroundColor: '#EA4335', borderColor: '#EA4335', borderWidth: 1 },
  ],
};

// Options globales pour les graphiques
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Permet au graphique de s’adapter à son conteneur
  plugins: {
    legend: {
      position: 'top',
      labels: { font: { size: 12 }, color: '#5F6368' }, // Style de la légende
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.raw}`, // Tooltip personnalisé
      },
    },
  },
  scales: {
    y: { beginAtZero: true, title: { display: true, text: 'Nombre d’avis', color: '#5F6368' } },
    x: { title: { display: true, text: 'Période', color: '#5F6368' } },
  },
};

// Composant pour afficher les graphiques mensuels
function ReviewGraph() {
  const options = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: { display: true, text: 'Statistiques Mensuelles des Avis Google', color: '#5F6368', font: { size: 16 } },
    },
  };

  return (
    <div className="bg-google-gray p-4 rounded-lg shadow" style={{ height: '400px' }}>
      <Bar data={monthlyStats} options={options} />
    </div>
  );
}

// Composant pour afficher les graphiques annuels
function ReviewGraph2() {
  const options = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: { display: true, text: 'Statistiques Annuelles des Avis Google', color: '#5F6368', font: { size: 16 } },
    },
  };

  return (
    <div className="bg-google-gray p-4 rounded-lg shadow" style={{ height: '400px' }}>
      <Bar data={yearlyStats} options={options} />
    </div>
  );
}

// Export des deux composants graphiques
export { ReviewGraph, ReviewGraph2 };
export default ReviewGraph; // Maintien de l’export par défaut pour compatibilité