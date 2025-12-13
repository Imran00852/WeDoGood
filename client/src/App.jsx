import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import SubmitReport from "./pages/SubmitReport";
import UploadCSV from "./pages/UploadCSV";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<SubmitReport />} />
        <Route path="/upload" element={<UploadCSV />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
