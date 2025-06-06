import React, { useState, useEffect } from 'react';
import { FirebaseFirestore } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const Search = () => {
    
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasSearched, setHasSearched] = useState(false);


    
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                
                const restaurantsCollectionRef = collection(FirebaseFirestore, "restaurants"); 
                const querySnapshot = await getDocs(restaurantsCollectionRef);
                const fetchedData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAllRestaurants(fetchedData);
                setFilteredRestaurants(fetchedData); 
            } catch (error) {
                console.error("Error al obtener los restaurantes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []); 

    
    useEffect(() => { // aquí lo que hacemos es usar un if para que verifique si ha buscado, y si es así, solo lista lo que se buscó de acuerdo a lo que se escribe en la casilla de búsqueda
        //si no ha buscado, se listan todos los restaurantes o no se filtra nada... voy a dejar un comentario para cada opción
        if (!loading && hasSearched) { 
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = allRestaurants.filter(restaurant =>
                restaurant.name.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredRestaurants(filtered);
        } else if (!loading && !hasSearched) {

             setFilteredRestaurants([]);// no se lista nada hasta que se introduce algo en el cuadro de busqueda 
            // setFilteredRestaurants(allRestaurants);// se listan todos los restaurantes por defecto y cuando se ingresa un parámetro de búsqueda, se actualiza la lista
        }
    }, [searchQuery, allRestaurants, loading, hasSearched]); 

    
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
       
        if (e.target.value === "") {
            setFilteredRestaurants(allRestaurants);
            setHasSearched(false); 
        }
    };

    
    const handleSearchClick = () => {
        setHasSearched(true); 
    };

    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    if (loading) {
        return <p className="text-center mt-5">Cargando restaurantes...</p>;
    }

    return (
        <div>
            <div className="container my-4 rounded-3" id="searchContainer">
                <h2 className="text-center pb-3 m">Buscar restaurantes</h2>
                <div className="d-flex flex-column align-items-center">
                    <div className="mb-3" style={{ width: '100%', maxWidth: '400px' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nombre"
                            value={searchQuery} 
                            onChange={handleInputChange} 
                            onKeyPress={handleKeyPress} 
                        />
                        <button
                            className="btn btn-primary mt-3 w-100"
                            type="button"
                            onClick={handleSearchClick} 
                            style={{ color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(158, 9, 9)' }}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
            <div id="results" className="mt-4 row g-4 p-3 m-4 justify-content-center">
                {hasSearched && filteredRestaurants.length === 0 ? ( 
                    <p className="text-center">No se encontraron restaurantes.</p>
                ) : (
                    filteredRestaurants.map(restaurant => (
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
                )}
            </div>
        </div>
    );
}

export default Search;



