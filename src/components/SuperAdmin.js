import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

function SuperAdmin() {
  const navigate = useNavigate();

  const superAdminData = [
    { id: 1, name: 'Business A', subscribers: 150, revenue: { current: 5000, previous: 4500 }, contactsReached: 200 },
    { id: 2, name: 'Business B', subscribers: 80, revenue: { current: 3000, previous: 3200 }, contactsReached: 150 },
  ];

  const totalSubscribers = superAdminData.reduce((sum, b) => sum + b.subscribers, 0);
  const totalRevenue = superAdminData.reduce((sum, b) => sum + b.revenue.current, 0);
  const totalContacts = superAdminData.reduce((sum, b) => sum + b.contactsReached, 0);

  const handleExportStats = (business, format) => {
    const data = [
      ['Métrique', 'Valeur'],
      ['Abonnés', business.subscribers],
      ['CA Mois Actuel (€)', business.revenue.current],
      ['CA Mois Précédent (€)', business.revenue.previous],
      ['Personnes Contactées', business.contactsReached],
    ];

    switch (format) {
      case 'xlsx':
        const xlsxSheet = XLSX.utils.aoa_to_sheet(data);
        const xlsxBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(xlsxBook, xlsxSheet, 'Kingdom Ads Stats');
        XLSX.writeFile(xlsxBook, `stats_${business.name}.xlsx`);
        break;
      case 'csv':
        const csvSheet = XLSX.utils.aoa_to_sheet(data);
        XLSX.writeFile(csvSheet, `stats_${business.name}.csv`, { bookType: 'csv' });
        break;
      case 'pdf':
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`Kingdom Ads - ${business.name}`, 10, 10);
        doc.setFontSize(12);
        doc.text(`Abonnés: ${business.subscribers}`, 10, 20);
        doc.text(`CA Mois Actuel: ${business.revenue.current} €`, 10, 30);
        doc.text(`CA Mois Précédent: ${business.revenue.previous} €`, 10, 40);
        doc.text(`Personnes Contactées: ${business.contactsReached}`, 10, 50);
        doc.save(`stats_${business.name}.pdf`);
        break;
      default:
        console.error('Format non supporté : ', format);
    }
  };

  const handleViewBusinessAdmin = (businessId) => {
    navigate(`/admin/${businessId}`);
  };

  return (
    <main className="flex-1 p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de Bord - Kingdom Ads</h1>

      {/* Résumé Global */}
      <div className="p-4 bg-gray-100 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Résumé Global</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded-md shadow-sm">
            <p className="text-gray-700 font-semibold">Abonnés Totaux</p>
            <p className="text-2xl text-blue-600">{totalSubscribers}</p>
          </div>
          <div className="bg-white p-3 rounded-md shadow-sm">
            <p className="text-gray-700 font-semibold">CA Mois (€)</p>
            <p className="text-2xl text-blue-600">{totalRevenue}</p>
          </div>
          <div className="bg-white p-3 rounded-md shadow-sm">
            <p className="text-gray-700 font-semibold">Personnes Contactées</p>
            <p className="text-2xl text-blue-600">{totalContacts}</p>
          </div>
        </div>
      </div>

      {/* Liste des Business */}
      <div className="space-y-6">
        {superAdminData.map((business) => (
          <div key={business.id} className="p-4 bg-gray-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">{business.name}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-gray-700 font-semibold">Abonnés</p>
                <p className="text-xl text-blue-600">{business.subscribers}</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-gray-700 font-semibold">CA Mois (€)</p>
                <p className="text-xl text-blue-600">{business.revenue.current}</p>
                <p className="text-sm text-gray-500">Précédent: {business.revenue.previous} €</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-gray-700 font-semibold">Personnes Contactées</p>
                <p className="text-xl text-blue-600">{business.contactsReached}</p>
              </div>
            </div>
            <div className="flex space-x-8">
              <button
                onClick={() => handleExportStats(business, 'xlsx')}
                style={{ backgroundColor: '#34A853', color: '#FFFFFF', padding: '8px 16px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontWeight: '500', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#2F9747')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#34A853')}
              >
                Exporter en XLSX
              </button>
              <button
                onClick={() => handleExportStats(business, 'csv')}
                style={{ backgroundColor: '#4285F4', color: '#FFFFFF', padding: '8px 16px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontWeight: '500', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#3A78D8')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#4285F4')}
              >
                Exporter en CSV (Mac)
              </button>
              <button
                onClick={() => handleExportStats(business, 'pdf')}
                style={{ backgroundColor: '#EA4335', color: '#FFFFFF', padding: '8px 16px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontWeight: '500', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#D13A2D')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#EA4335')}
              >
                Exporter en PDF
              </button>
              <button
                onClick={() => handleViewBusinessAdmin(business.id)}
                className="text-blue-600 hover:text-yellow-500 underline"
              >
                Voir Page Admin
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lien vers Statistiques */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/kingdomads/statistics')}
          className="text-blue-600 hover:text-yellow-500 underline text-lg font-semibold"
        >
          Voir les Statistiques
        </button>
      </div>
    </main>
  );
}

export default SuperAdmin;