import React from 'react'; // Importer la bibliothèque React
import { useNavigate } from 'react-router-dom'; // Importer le hook useNavigate pour gérer la navigation entre différentes routes
import { Bar } from 'react-chartjs-2'; // Importer le composant `Bar` pour créer des graphiques en barres
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Importer les éléments nécessaires pour configurer Chart.js

// Enregistrer les composants nécessaires pour Chart.js (comme les échelles, les barres, les légendes, etc.)
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Définition du composant Statistics
function Statistics() {
  const navigate = useNavigate(); // Initialiser useNavigate pour la navigation entre les pages

  // Liste des entreprises avec leurs revenus mensuels et annuels
  const businesses = [
    {
      id: 1, // Identifiant unique
      name: 'Business A', // Nom de l'entreprise
      monthlyRevenue: [2000, 2500, 3000, 3500, 4000, 5000], // Revenu mensuel (6 derniers mois)
      annualRevenue: 35000, // Revenu annuel total
    },
    {
      id: 2,
      name: 'Business B',
      monthlyRevenue: [1000, 1500, 2000, 2500, 2800, 3000],
      annualRevenue: 20000,
    },
  ];

  // Calculer les revenus mensuels globaux en faisant la somme des revenus mensuels de toutes les entreprises
  const globalMonthlyRevenue = businesses.reduce((acc, b) => {
    return acc.map((val, idx) => val + b.monthlyRevenue[idx]); // Ajouter les revenus de chaque entreprise pour chaque mois
  }, [0, 0, 0, 0, 0, 0]); // Initialiser avec un tableau de 0 pour chaque mois

  // Calculer le revenu annuel global en additionnant les revenus annuels de toutes les entreprises
  const globalAnnualRevenue = businesses.reduce((sum, b) => sum + b.annualRevenue, 0);

  // Configurer les données pour le graphique des revenus mensuels
  const monthlyChartData = {
    labels: ['Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar'], // Étiquettes pour les 6 derniers mois
    datasets: [
      // Ajouter un ensemble de données pour chaque entreprise
      ...businesses.map((b) => ({
        label: b.name, // Nom de l'entreprise
        data: b.monthlyRevenue, // Revenu mensuel de l'entreprise
        backgroundColor: b.id === 1 ? '#34A853' : '#4285F4', // Une couleur différente pour chaque entreprise
      })),
      {
        label: 'Global', // Revenu global (toutes les entreprises combinées)
        data: globalMonthlyRevenue, // Données calculées pour les revenus mensuels globaux
        backgroundColor: '#EA4335', // Couleur pour les données globales
      },
    ],
  };

  // Configurer les données pour le graphique des revenus annuels
  const annualChartData = {
    labels: businesses.map(b => b.name).concat('Global'), // Ajouter les noms d'entreprises et "Global"
    datasets: [{
      label: 'CA Annuel (€)', // Légende pour le graphique
      data: businesses.map(b => b.annualRevenue).concat(globalAnnualRevenue), // Revenus annuels des entreprises + global
      backgroundColor: ['#34A853', '#4285F4', '#EA4335'], // Différentes couleurs pour chaque entrée
    }],
  };

  // Options générales pour les graphiques
  const chartOptions = {
    responsive: true, // Rendre les graphiques responsive
    plugins: {
      legend: { position: 'top' }, // Position de la légende en haut
      title: { display: true, text: 'Chiffre d’Affaires' }, // Titre par défaut pour les graphiques
    },
    scales: { y: { beginAtZero: true } }, // La valeur des axes Y commence à 0
  };

  // Contenu du composant à afficher
  return (
    <main className="flex-1 p-6 bg-gray-50"> {/* Conteneur principal avec du padding et un fond gris clair */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Statistiques - Kingdom Ads</h1> {/* Titre principal de la page */}

      {/* Section pour afficher le graphique des revenus mensuels */}
      <div className="bg-white p-4 rounded-lg shadow mb-6"> {/* Encadré avec un fond blanc, marges et ombre */}
        <h2 className="text-xl font-semibold text-blue-600 mb-4">CA Mensuel (6 derniers mois)</h2> {/* Titre de la section */}
        <Bar
          data={monthlyChartData} // Passer les données mensuelles au composant de graphique en barres
          options={{ ...chartOptions, title: { text: 'CA Mensuel (€)' } }} // Appliquer les options pour ce graphique
        />
      </div>

      {/* Section pour afficher le graphique des revenus annuels */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">CA Annuel</h2> {/* Titre de la section */}
        <Bar
          data={annualChartData} // Passer les données annuelles au composant de graphique en barres
          options={{ ...chartOptions, title: { text: 'CA Annuel (€)' } }} // Appliquer les options pour ce graphique
        />
      </div>

      {/* Bouton pour revenir au tableau de bord */}
      <div className="text-center"> {/* Conteneur avec un alignement centré */}
        <button
          onClick={() => navigate('/kingdomads')} // Redirection vers la page du tableau de bord
          className="text-blue-600 hover:text-yellow-500 underline text-lg font-semibold" // Style du bouton
        >
          Retour au Tableau de Bord {/* Texte du bouton */}
        </button>
      </div>
    </main>
  );
}

export default Statistics; // Exporter le composant Statistics