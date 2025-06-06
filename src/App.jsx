import {Link, BrowserRouter as Router, Routes, Route} from 'react-router'
import './App.css'
import NavBar from './IU/navBar'
import Home from './pages/home'
import Search from './pages/search'
import NewRestaurants from './pages/newRestaurants'
import { useEffect } from 'react'
import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min'



// import addRestaurants from './JS/addRestaurants'
// import searchRestaurants from './JS/searchRestaurants'





function App(){
return(
  <Router>
    <div>
      <NavBar />
      <div>
        <Routes>
          <Route path="" element={<Home/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
          <Route path="/new" element={<NewRestaurants/>}></Route> 
        </Routes>
      </div>
    </div>
   
  </Router>
  
)

}







export default App

//// http://localhost:5173/
//npm run dev



// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
