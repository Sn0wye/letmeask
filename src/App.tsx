import { BrowserRouter as AppRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AdminRoom } from "./pages/AdminRoom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

function App() {
  return (
    <AppRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
          <Route path="/rooms/:id" element={<Room />} />

          <Route path="/admin/rooms/:id" element={<AdminRoom />} />
        </Routes>
      </AuthContextProvider>
    </AppRouter>
  );
}

export default App;
