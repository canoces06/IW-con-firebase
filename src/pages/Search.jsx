import React, { useState, useEffect } from 'react'; // Importa useState
import { FirebaseFirestore } from '../firebase/config'; // Ajusta la ruta
import { collection, getDocs } from 'firebase/firestore';

const Search = () => {
    const [allRestaurants, setAllRestaurants] = useState([]); // Guarda todos los restaurantes de Firestore
    const [searchResults, setSearchResults] = useState([]); // Guarda los resultados de la búsqueda

    useEffect(() => {
        const fetchAndSetRestaurants = async () => {
            try {
                const restaurantsCollectionRef = collection(FirebaseFirestore, "restaurants");
                const querySnapshot = await getDocs(restaurantsCollectionRef);
                const fetchedRestaurants = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAllRestaurants(fetchedRestaurants); // Guarda todos los restaurantes
                setSearchResults(fetchedRestaurants); // Inicialmente, muestra todos los restaurantes
            } catch (error) {
                console.error("Error al obtener los restaurantes para la búsqueda: ", error);
            }
        };

        fetchAndSetRestaurants();

        const searchInput = document.getElementById('searchInput');
        const btnBuscar = document.getElementById('btnBuscar');

        const performSearch = () => {
            const query = searchInput.value.toLowerCase();
            // Filtra sobre 'allRestaurants' que ya cargamos
            const filtered = allRestaurants.filter(restaurant =>
                restaurant.name.toLowerCase().includes(query)
            );
            setSearchResults(filtered); // Actualiza los resultados de la búsqueda
        };

        if (searchInput && btnBuscar) {
            searchInput.addEventListener('input', performSearch);
            btnBuscar.addEventListener('click', performSearch);

            return () => {
                searchInput.removeEventListener('input', performSearch);
                btnBuscar.removeEventListener('click', performSearch);
            };
        }
    }, [allRestaurants]); // allRestaurants como dependencia para que el filtro funcione si cambian

    return (
        <div>
            <div className="container my-4 rounded-3" id="searchContainer">
                <h2 className="text-center pb-3 m">Buscar restaurantes</h2>
                <div className="d-flex flex-column align-items-center">
                    <div className="mb-3" id="inputContainer" style={{ width: '100%', maxWidth: '400px' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nombre"
                            id="searchInput"
                        />
                        <button
                            className="btn btn-primary mt-3 w-100"
                            type="button"
                            id="btnBuscar"
                            style={{ color: 'rgb(0, 0, 0)', backgroundColor: 'rgb(51, 136, 206)' }}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
            <div id="results" className="mt-4 row g-4 p-3 m-4 justify-content-center">
                {searchResults.length > 0 ? (
                    searchResults.map(restaurant => (
                        <div key={restaurant.id} className="col-12 col-md-6 col-lg-3 p-3 m-3 mine">
                            <div className="rounded shadow overflow-hidden justify-content-right">
                                <img src={restaurant.image} alt={restaurant.name} className="w-50 img-cover" />
                                <div className="p-4">
                                    <h3 className="fs-3 fw-bold m-2">{restaurant.name}</h3>
                                    <p className="m-2">{restaurant.description}</p>
                                    <p className="text m-2"><strong>Dirección: </strong>{restaurant.address}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No se encontraron restaurantes.</p>
                )}
            </div>
        </div>
    );
}

export default Search;









// import React, { useEffect } from 'react';
// import { restaurants } from '../data';
// const search = () => {


//     useEffect(() => {

//         const searchInput = document.getElementById('searchInput');
//         const resultsContainer = document.getElementById('results');
//         const btnBuscar = document.getElementById('btnBuscar');


//         const performSearch = () => {
//             const query = searchInput.value.toLowerCase();
//             resultsContainer.innerHTML = '';


//             restaurants
//                 .filter(restaurant => restaurant.name.toLowerCase().includes(query))
//                 .forEach(restaurant => {

//                     resultsContainer.innerHTML += `
//                     <div id = "resultsContainer" class="col-12 col-md-6 col-lg-3 p-3 m-3 mine">
//                         <div class="rounded shadow overflow-hidden justify-content-right">
//                             <img src="${restaurant.image}" alt="${restaurant.name}" class="w-50 img-cover">
//                              <div class="p-4">
//                             <h3 class="fs-3 fw-bold m-2">${restaurant.name}</h3>
//                             <p class="m-2">${restaurant.description}</p>
//                             <p class="text m-2"><strong>Dirección: </strong>${restaurant.address}</p>
//                         </div>
//                         </div>
                       
//                     </div>
//                 `;
//                 });


//             if (resultsContainer.innerHTML === '') {
//                 resultsContainer.innerHTML = '<p class="text-center">No se encontraron restaurantes.</p>';
//             }
//         };


//         if (searchInput && resultsContainer && btnBuscar) {

//             searchInput.addEventListener('input', performSearch);

//             btnBuscar.addEventListener('click', performSearch);


//             return () => {
//                 searchInput.removeEventListener('input', performSearch);
//                 btnBuscar.removeEventListener('click', performSearch);
//             };
//         } else {

//             console.warn("");
//         }
//     }, []);

//     return (
//         <div>


//             <div className="container my-4 rounded-3" id="searchContainer">
//                 <h2 className="text-center pb-3 m">Buscar restaurantes</h2>
//                 <div className="d-flex flex-column align-items-center">
//                     <div className="mb-3" id="inputContainer" style={{ width: '100%', maxWidth: '400px' }}>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Buscar por nombre"
//                             id="searchInput"
//                         />
//                         <button
//                             className="btn btn-primary mt-3 w-100"
//                             type="button"
//                             id="btnBuscar"
//                             style={{color: 'rgb(0, 0, 0)', backgroundColor: 'rgb(51, 136, 206)' }}
//                         >
//                             Buscar
//                         </button>
//                     </div>
//                 </div>


//             </div>
//             <div id="results" className="mt-4 row g-4 p-3 m-4 justify-content-center">
//             </div>
//         </div>
//     );
// }

// export default search;