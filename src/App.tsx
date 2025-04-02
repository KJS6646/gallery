import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import PrivateRoute from "PrivateRoute";
import { ConfigProvider } from "antd";
import { theme } from "test/theme";
import { LogIn } from "pages/Login/index";
import { HomePage } from "pages/Main/home/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Calendars from "pages/Calendars";
import Board from "pages/Board";
import List from "pages/List";

const queryClient = new QueryClient();
function App() {
  return (
    <HashRouter>
      <ConfigProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/login" element={<LogIn />} />
            {/* 로그인 해야 접근 가능한 페이지 */}
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<HomePage />}>
                <Route path="calendar" element={<Calendars />}></Route>
                <Route path="board" element={<Board />}></Route>
                <Route path="List" element={<List />}></Route>
              </Route>
            </Route>
            {/* 빈 페이지 */}
            <Route path="*" element={<LogIn />} />
          </Routes>
        </QueryClientProvider>
      </ConfigProvider>
    </HashRouter>
  );
}

export default App;
