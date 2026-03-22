import { Route,Routes } from "react-router-dom";
import Header from "./assets/components/shared/Header";
import Footer from "./assets/components/shared/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        
        <Routes>
          {/*  difining  all routes here */}
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="profile/:id" element={<h1>Profile Page</h1>} />
          <Route path="movies" element={<h1>Movies Page</h1>} />
          {/* Add more routes as needed */}
        </Routes>
        
      </main>
      <Footer />
    </div>
    
  );
}
export  default App;