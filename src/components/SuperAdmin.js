import React from 'react'; // Importer la bibliothèque React
import { useNavigate } from 'react-router-dom'; // Importer le hook useNavigate pour gérer la navigation
import * as XLSX from 'xlsx'; // Importer la librairie XLSX pour l'exportation vers Excel/CSV
import jsPDF from 'jspdf'; // Importer la librairie jsPDF pour l'exportation vers PDF

// Définition du composant SuperAdmin
function SuperAdmin() {
  const navigate = useNavigate(); // Initialiser useNavigate pour gérer la navigation

  // Simulation de données d'entreprises administrées par le super administrateur
  const superAdminData = [
    {
      id: 1, // Identifiant unique de l'entreprise
      name: 'Business A', // Nom de l'entreprise
      subscribers: 150, // Nombre d'abonnés
      revenue: { current: 5000, previous: 4500 }, // Chiffre d'affaires actuel et précédent
      contactsReached: 200, // Nombre de prospects contactés
    },
    {
      id: 2,
      name: 'Business B',
      subscribers: 80,
      revenue: { current: 3000, previous: 3200 },
      contactsReached: 150,
    },
  ];

  // Calcul des statistiques globales (tous les business combinés)
  const totalSubscribers = superAdminData.reduce((sum, b) => sum + b.subscribers, 0); // Total des abonnés
  const totalRevenue = superAdminData.reduce((sum, b) => sum + b.revenue.current, 0); // Total du chiffre d'affaires actuel
  const totalContacts = superAdminData.reduce((sum, b) => sum + b.contactsReached, 0); // Total des contacts atteints

  // Fonction pour exporter les statistiques d'une entreprise donnée dans différents formats
  const handleExportStats = (business, format) => {
    const data = [
      ['Métrique', 'Valeur'], // En-têtes de colonnes
      ['Abonnés', business.subscribers], // Nombre d'abonnés
      ['CA Mois Actuel (€)', business.revenue.current], // Chiffre d'affaires du mois
      ['CA Mois Précédent (€)', business.revenue.previous], // Chiffre d'affaires du mois précédent
      ['Personnes Contactées', business.contactsReached], // Contacts atteints
    ];

    switch (format) {
      case 'xlsx': // Exportation en Excel (.xlsx)
        const xlsxSheet = XLSX.utils.aoa_to_sheet(data); // Convertir les données en une feuille Excel
        const xlsxBook = XLSX.utils.book_new(); // Créer un nouveau classeur Excel
        XLSX.utils.book_append_sheet(xlsxBook, xlsxSheet, 'Kingdom Ads Stats'); // Ajouter la feuille au classeur
        XLSX.writeFile(xlsxBook, `stats_${business.name}.xlsx`); // Sauvegarder le fichier sous format Excel
        break;
      case 'csv': // Exportation en CSV
        const csvSheet = XLSX.utils.aoa_to_sheet(data); // Convertir les données en une feuille Excel (pour CSV)
        XLSX.writeFile(csvSheet, `stats_${business.name}.csv`, { bookType: 'csv' }); // Sauvegarder le fichier sous format CSV
        break;
      case 'pdf': // Exportation en PDF
        const doc = new jsPDF(); // Initialiser jsPDF
        doc.setFontSize(16); // Définir la taille de police
        doc.text(`Kingdom Ads - ${business.name}`, 10, 10); // Ajouter un titre au PDF
        doc.setFontSize(12);
        doc.text(`Abonnés: ${business.subscribers}`, 10, 20); // Ajouter les abonnés
        doc.text(`CA Mois Actuel: ${business.revenue.current} €`, 10, 30); // Ajouter le chiffre d'affaires actuel
        doc.text(`CA Mois Précédent: ${business.revenue.previous} €`, 10, 40); // Ajouter le chiffre d'affaires précédent
        doc.text(`Personnes Contactées: ${business.contactsReached}`, 10, 50); // Ajouter les contacts atteints
        doc.save(`stats_${business.name}.pdf`); // Sauvegarder le fichier sous format PDF
        break;
      default: // Si le format n'est pas supporté
        console.error('Format non supporté : ', format); // Afficher une erreur
    }
  };

  // Fonction pour naviguer vers une page admin spécifique d'un business
  const handleViewBusinessAdmin = (businessId) => {
    navigate(`/admin/${businessId}`); // Rediriger vers la page d'administration du business
  };

  // JSX pour l'interface utilisateur du composant
  return (
    <main className="flex-1 p-6 bg-gray-50"> {/* Conteneur principal de la page avec marge et fond clair */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de Bord - Kingdom Ads</h1> {/* Titre principal */}

      {/* Résumé Global */}
      <div className="p-4 bg-gray-100 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Résumé Global</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded-md shadow-sm">
            <p className="text-gray-700 font-semibold">Abonnés Totaux</p> {/* Nombre total des abonnés */}
            <p className="text-2xl text-blue-600">{totalSubscribers}</p>
          </div>
          <div className="bg-white p-3 rounded-md shadow-sm">
            <p className="text-gray-700 font-semibold">CA Mois (€)</p> {/* Chiffre d'affaires global */}
            <p className="text-2xl text-blue-600">{totalRevenue}</p>
          </div>
          <div className="bg-white p-3 rounded-md shadow-sm">
            <p className="text-gray-700 font-semibold">Personnes Contactées</p> {/* Personnes contactées */}
            <p className="text-2xl text-blue-600">{totalContacts}</p>
          </div>
        </div>
      </div>

      {/* Liste des entreprises */}
      <div className="space-y-6">
        {superAdminData.map((business) => ( // Parcourir chaque entreprise
          <div key={business.id} className="p-4 bg-gray-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">{business.name}</h2> {/* Nom de l'entreprise */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-gray-700 font-semibold">Abonnés</p>
                <p className="text-xl text-blue-600">{business.subscribers}</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-gray-700 font-semibold">CA Mois (€)</p>
                <p className="text-xl text-blue-600">{business.revenue.current}</p>
                <p className="text-sm text-gray-500">Précédent: {business.revenue.previous} €</p> {/* Chiffre d'affaires précédent */}
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-gray-700 font-semibold">Personnes Contactées</p>
                <p className="text-xl text-blue-600">{business.contactsReached}</p>
              </div>
            </div>
            {/* Boutons pour actions */}
            <div className="flex space-x-8">
              {/* Bouton pour exporter vers Excel */}
              <button
                onClick={() => handleExportStats(business, 'xlsx')}
                style={{
                  backgroundColor: '#34A853',
                  color: '#FFFFFF',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                Exporter en XLSX
              </button>
              {/* Bouton pour exporter vers PDF */}
              <button
                onClick={() => handleExportStats(business, 'pdf')}
                style={{
                  backgroundColor: '#EA4335',
                  // Style effet visuel pour PDF
                }}
              >+ Voir Stats</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default SuperAdmin; // Exportation du composant