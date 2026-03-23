import { Route, Routes } from "react-router-dom";
import Header from "./assets/components/shared/Header";
import Footer from "./assets/components/shared/Footer";

function App() {
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<h1 className="page-title">Home Page</h1>} />
          <Route
            path="/profile/:id"
            element={<h1 className="page-title">Profile Page</h1>}
          />
          <Route
            path="/movies"
            element={<h1 className="page-title">Movies Page</h1>}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;