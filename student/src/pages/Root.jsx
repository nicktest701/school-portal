import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Sidebar from "./layouts/Sidebar";
import Content from "./layouts/Content";
import { Box } from "@mui/material";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";

function Root() {
  return (
    <ProtectedRoute>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Sidebar />
        <Box sx={{ flex: 1, bgcolor: "whitesmoke" }}>
          <Header />
          <Content>
            <Suspense fallback={<LoadingSpinner />}>
              <Outlet />
            </Suspense>
          </Content>
          <Footer bgcolor="transparent" color="#333" />
        </Box>
      </Box>
    </ProtectedRoute>
  );
}

export default Root;
