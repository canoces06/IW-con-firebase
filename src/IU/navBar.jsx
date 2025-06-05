import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav class="bg-dark text-white py-3 border rounded-4">
      <div class="container mx-auto d-flex justify-content-between ">
        <img src="https://img.icons8.com/?size=50&id=yjC4qBFRHbVO&format=png&color=000000" alt="imagen" class ="p-0 m-0" id="img"/>
        <h1 class="h3 fw-bold m-2 pe-4" id="dir">Directorio de Restaurantes</h1>
        <div class="d-flex gap-4 m-2 p-1 ">
          <Link to ="/" class="link-secondary">Home</Link>
          <Link to ="/search" class="link-secondary">Search</Link>
          <Link to ="/new" class="link-secondary">New</Link> 
         

          
        </div>
      </div>
    </nav>
  )
}

export default NavBar
