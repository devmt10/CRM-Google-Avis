import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ajouté
import ReviewGraph, { ReviewGraph2 } from './ReviewGraph';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

function MainContent() {
  const navigate = useNavigate(); // Ajouté
  const recentReviews = [
    { id: 1, stars: 5, text: 'Service excellent !', date: '2025-03-10' },
    { id: 2, stars: 2, text: 'Trop lent.', date: '2025-03-12' },
  ];

  const stats = {
    fiveStar: 12,
    fourStar: 2,
    threeStar: 5,
    twoStar: 3,
    oneStar: 1,
    total: 23,
  };

  const averageRating = (
    (stats.fiveStar * 5 + stats.fourStar * 4 + stats.threeStar * 3 + stats.twoStar * 2 + stats.oneStar * 1) /
    stats.total
  ).toFixed(1);

  const handleRespond = (reviewId) => {
    const response = prompt('Entrez votre réponse :');
    if (response) alert(`Réponse envoyée pour l’avis ${reviewId} : ${response}`);
  };

  const handleExportStats = (format) => {
    switch (format) {
      case 'xlsx':
        const xlsxData = [
          ['Catégorie', 'Valeur'],
          ['Avis 5 étoiles', stats.fiveStar],
          ['Avis 4 étoiles', stats.fourStar],
          ['Avis 3 étoiles', stats.threeStar],
          ['Avis 2 étoiles', stats.twoStar],
          ['Avis 1 étoile', stats.oneStar],
          ['Total', stats.total],
          ['Note Moyenne', averageRating],
        ];
        const xlsxSheet = XLSX.utils.aoa_to_sheet(xlsxData);
        const xlsxBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(xlsxBook, xlsxSheet, 'Statistiques');
        XLSX.writeFile(xlsxBook, 'statistiques.xlsx');
        break;

      case 'csv':
        const csvData = [
          ['Catégorie', 'Valeur'],
          ['Avis 5 étoiles', stats.fiveStar],
          ['Avis 4 étoiles', stats.fourStar],
          ['Avis 3 étoiles', stats.threeStar],
          ['Avis 2 étoiles', stats.twoStar],
          ['Avis 1 étoile', stats.oneStar],
          ['Total', stats.total],
          ['Note Moyenne', averageRating],
        ];
        const csvSheet = XLSX.utils.aoa_to_sheet(csvData);
        XLSX.writeFile(csvSheet, 'statistiques.csv', { bookType: 'csv' });
        break;

      case 'txt':
        const txtContent = `
          Statistiques des Avis Google (Mensuel - Janvier)
          --------------------------------------------
          Avis 5 étoiles: ${stats.fiveStar}
          Avis 4 étoiles: ${stats.fourStar}
          Avis 3 étoiles: ${stats.threeStar}
          Avis 2 étoiles: ${stats.twoStar}
          Avis 1 étoile: ${stats.oneStar}
          Total: ${stats.total}
          Note Moyenne: ${averageRating}
        `;
        const txtBlob = new Blob([txtContent], { type: 'text/plain' });
        const txtUrl = URL.createObjectURL(txtBlob);
        const txtLink = document.createElement('a');
        txtLink.href = txtUrl;
        txtLink.download = 'statistiques.txt';
        txtLink.click();
        URL.revokeObjectURL(txtUrl);
        break;

      case 'pdf':
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Statistiques des Avis Google (Mensuel - Janvier)', 10, 10);
        doc.setFontSize(12);
        doc.text(`Avis 5 étoiles: ${stats.fiveStar}`, 10, 20);
        doc.text(`Avis 4 étoiles: ${stats.fourStar}`, 10, 30);
        doc.text(`Avis 3 étoiles: ${stats.threeStar}`, 10, 40);
        doc.text(`Avis 2 étoiles: ${stats.twoStar}`, 10, 50);
        doc.text(`Avis 1 étoile: ${stats.oneStar}`, 10, 60);
        doc.text(`Total: ${stats.total}`, 10, 70);
        doc.text(`Note Moyenne: ${averageRating}`, 10, 80);
        doc.save('statistiques.pdf');
        break;

      default:
        console.error('Format non supporté : ', format);
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de Bord Google Avis</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Derniers Avis</h2>
          {recentReviews.map((review) => (
            <div key={review.id} className="mb-4 bg-white p-3 rounded-md shadow-sm">
              <p className="text-gray-700">
                <span className="font-bold text-yellow-500">{review.stars} ★</span> - {review.text} ({review.date})
              </p>
              <button
                onClick={() => handleRespond(review.id)}
                className="mt-2 text-blue-600 hover:text-yellow-500 underline text-sm"
              >
                Répondre
              </button>
            </div>
          ))}
          {/* Bouton pour donner un avis */}
          <button
            onClick={() => navigate('/feedback')}
            className="mt-4 text-blue-600 hover:text-yellow-500 underline text-sm font-semibold"
          >
            Donner un Avis
          </button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Résumé des Statistiques</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-gray-700 font-semibold">Note Moyenne</p>
                <p className="text-2xl text-blue-600">{averageRating} / 5</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-gray-700 font-semibold">Total Avis</p>
                <p className="text-2xl text-blue-600">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Statistiques Mensuelles</h2>
            <ReviewGraph />
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Statistiques Annuelles</h2>
            <ReviewGraph2 />
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleExportStats('xlsx')}
              style={{
                width: '100%',
                backgroundColor: '#34A853',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                fontWeight: '500',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#2F9747')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#34A853')}
            >
              Exporter en Excel (.xlsx)
            </button>
            <button
              onClick={() => handleExportStats('csv')}
              style={{
                width: '100%',
                backgroundColor: '#4285F4',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                fontWeight: '500',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#3A78D8')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#4285F4')}
            >
              Exporter en Excel CSV (.csv) - Mac Compatible
            </button>
            <button
              onClick={() => handleExportStats('txt')}
              style={{
                width: '100%',
                backgroundColor: '#5F6368',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                fontWeight: '500',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#54575C')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#5F6368')}
            >
              Exporter en Texte (.txt)
            </button>
            <button
              onClick={() => handleExportStats('pdf')}
              style={{
                width: '100%',
                backgroundColor: '#EA4335',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                fontWeight: '500',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#D13A2D')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#EA4335')}
            >
              Exporter en PDF (.pdf)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainContent;