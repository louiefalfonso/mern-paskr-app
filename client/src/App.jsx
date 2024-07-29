import { Route, Routes, Navigate} from "react-router-dom";
import { Toaster } from "sonner";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6] ">
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Toaster richColors />
    </main>
  );
}

export default App;
