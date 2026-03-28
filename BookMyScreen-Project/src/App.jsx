import { Route, Routes } from "react-router-dom";
import Header from "./assets/components/shared/Header";
import Footer from "./assets/components/shared/Footer";
import Home from "./pages/Home";
import Movies from "./pages/Movies";

function App() {
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile/:id"
            element={<h1 className="page-title">Profile Page</h1>}
          />
          <Route
            path="/movies"
            element={<Movies />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;