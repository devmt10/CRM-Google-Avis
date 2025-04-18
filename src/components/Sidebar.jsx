import React from 'react'; // Importer la bibliothèque React
import { useNavigate, useLocation } from 'react-router-dom'; // Importer les hooks useNavigate et useLocation pour gérer la navigation et la localisation des routes

// Définition du composant Sidebar
function Sidebar() {
  const navigate = useNavigate(); // Initialiser useNavigate pour permettre la navigation entre les routes
  const location = useLocation(); // Initialiser useLocation pour récupérer la route actuelle

  // Vérifier si l'utilisateur se trouve sur une page "Kingdom Ads"
  const isKingdomAds = location.pathname.startsWith('/kingdomads'); // Vérifie si l'URL commence par "/kingdomads"

  // Fonction pour ajouter un avis (simulée via un prompt)
  const handleAddReview = () => {
    const stars = prompt('Nombre d’étoiles (1-5) :'); // Demander à l'utilisateur d'entrer le nombre d'étoiles
    const text = prompt('Texte de l’avis :'); // Demander à l'utilisateur d'entrer le texte de l'avis
    if (stars && text) alert(`Avis ajouté : ${stars} ★ - ${text}`); // Afficher une alerte confirmant l'ajout de l'avis
  };

  // Rendu du contenu du composant Sidebar
  return (
    <aside className="w-64 bg-google-dark-gray text-white p-6"> {/* Une barre latérale avec un style de largeur, couleur de fond et de texte */}
      <h2 className="text-xl font-bold mb-6"> {/* Un titre */}
        {isKingdomAds ? 'Navigation' : 'Outils d’Avis'} {/* Afficher "Navigation" si l'utilisateur est sur une page Kingdom Ads, sinon "Outils d’Avis" */}
      </h2>
      <ul className="space-y-4"> {/* Une liste d'options avec un espacement vertical entre les éléments */}
        {isKingdomAds ? ( // Si l'utilisateur est sur une page Kingdom Ads
          // Afficher les options spécifiques à Kingdom Ads
          <>
            <li>
              <button
                onClick={() => navigate('/kingdomads')} // Naviguer vers la page principale de Kingdom Ads
                className="hover:text-google-yellow transition-colors bg-transparent border-none cursor-pointer" // Style CSS du bouton
              >
                Tableau de Bord {/* Bouton pour accéder au tableau de bord */}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/kingdomads/statistics')} // Naviguer vers la page des statistiques de Kingdom Ads
                className="hover:text-google-yellow transition-colors bg-transparent border-none cursor-pointer" // Style CSS du bouton
              >
                Statistiques {/* Bouton pour accéder aux statistiques */}
              </button>
            </li>
          </>
        ) : (
          // Sinon, afficher les options complètes visibles pour la route /admin (par exemple)
          <>
            <li>
              <a
                href="#"
                onClick={() => navigate('/admin')} // Naviguer vers le tableau de bord de l'administration
                className="hover:text-google-yellow transition-colors" // Style CSS pour le lien
              >
                Tableau de Bord {/* Lien vers le tableau de bord */}
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => navigate('/admin')} // Naviguer vers une route spécifique à "Avis"
                className="hover:text-google-yellow transition-colors" // Style CSS pour le lien
              >
                Avis {/* Lien pour accéder aux avis */}
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => navigate('/admin')} // Naviguer vers une route spécifique pour voir les statistiques
                className="hover:text-google-yellow transition-colors" // Style du lien
              >
                Statistiques {/* Lien pour accéder aux statistiques */}
              </a>
            </li>
            <li>
              <button
                onClick={handleAddReview} // Appeler la fonction pour ajouter un avis
                className="hover:text-google-yellow transition-colors bg-transparent border-none cursor-pointer" // Style CSS pour le bouton
              >
                Ajouter un Avis {/* Bouton pour ajouter un nouvel avis */}
              </button>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar; // Exportation du composant Sidebar