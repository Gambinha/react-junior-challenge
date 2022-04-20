import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Catalogo from "./pages/Catalogo";
import Produto from "./pages/Produto";


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Catalogo />} />
                <Route path="/produto/:id" element={<Produto />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;