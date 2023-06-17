import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/404" element={<NotFound />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
