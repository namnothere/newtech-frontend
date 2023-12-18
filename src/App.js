import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard";
import Register from "./scenes/register";
import Submission from "./scenes/submission";
import CreateTopic from "./scenes/dashboard/create";
import Update from "./scenes/dashboard/update";
import LoginPopup from "./components/common/LoginPopup";
import { useEffect, useState } from "react";



function App() {
  const [theme, colorMode] = useMode();
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  
  const checkAccessToken = () => {
    const localAccessToken = localStorage.getItem("accessToken");
    if (accessToken) setAccessToken(localAccessToken);
    else setAccessToken(null);
  };
  
  useEffect(() => {
    checkAccessToken();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Routes>
              <Route path="/" index element={<Dashboard />} />
              <Route path="/create-topic" index element={<CreateTopic />} />
              <Route path="/topic/:id" index element={<Update />} />
              <Route path="/registers" element={<Register />} />
              <Route path="/submissions" element={<Submission />} />
            </Routes>

            {
              !accessToken && 
              <LoginPopup />
            }
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
