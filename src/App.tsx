import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Tractor } from "@aircall/tractor";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SWRConfig } from "swr";
import { fetcher } from "./data/_utils/fetcher";
import { UserContextProvider } from "./context/UserContext";
import LoginPage from "./pages/login/LoginPage";
import CallPage from "./pages/call/CallPage";

function App() {
  return (
    <SWRConfig value={{ fetcher }}>
      <Tractor injectStyle>
        <UserContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate replace to="/calls" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/calls" element={<CallPage />} />
            </Routes>
          </BrowserRouter>
        </UserContextProvider>
      </Tractor>
    </SWRConfig>
  );
}

export default App;
