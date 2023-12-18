import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import UserSidebar from "./scenes/global/UserSidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard";
import UserDashboard from "./scenes/dashboard/user.dashboard";
import Register from "./scenes/register";
import UserRegister from "./scenes/register/user.register";
import UserRegisterUpdate from "./scenes/register/user.update";

import Submission from "./scenes/submission";
import UserSubmission from "./scenes/submission/user.submission";

import CreateTopic from "./scenes/dashboard/create";
import Update from "./scenes/dashboard/update";
import LoginPopup from "./components/common/LoginPopup";
import { useEffect, useState } from "react";

function App() {
  const [theme, colorMode] = useMode();
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  
  const checkAccessToken = () => {
    const localAccessToken = localStorage.getItem("accessToken");
    const localRole = localStorage.getItem("role");
    if (accessToken) setAccessToken(localAccessToken);
    else setAccessToken(null);

    if (role) setRole(localRole);
    else setRole(null);
  };
  
  useEffect(() => {
    checkAccessToken();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {
            !accessToken && 
            <LoginPopup />
          }

          {role === 'admin' ? <Sidebar /> : <UserSidebar />}
          {/* redirect to dashboard if user is admin */}

          <main className="content">
            <Routes>
              {/* admin */}
              <Route path="/admin" index element={<Dashboard />} />
              <Route path="/admin/create-topic" index element={<CreateTopic />} />
              <Route path="/admin/topic/:id" index element={<Update />} />
              <Route path="/admin/registers" element={<Register />} />
              <Route path="/admin/submissions" element={<Submission />} />
              {/* user */}
              <Route path="/" index element={<UserDashboard />} />
              <Route path="/:id" index element={<UserDashboard />} />
              <Route path="/registers" element={<UserRegister />} />
              <Route path="/registers/:id" element={<UserRegisterUpdate />} />
              <Route path="/submissions" element={<UserSubmission />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
