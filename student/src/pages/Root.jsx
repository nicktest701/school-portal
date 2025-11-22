import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Sidebar from "./layouts/Sidebar";
import Content from "./layouts/Content";
import { Box } from "@mui/material";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import HomeLinks from "@/components/HomeLinks";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Root() {
  return (
    <ProtectedRoute>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Sidebar />
        <Box sx={{ flex: 1, bgcolor: "#ffffff" }}>
          <Header />
          <Content>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                px: 2,
                bgcolor: "#ffffff",
              }}
            >
              <HomeLinks />
            </Box>
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
