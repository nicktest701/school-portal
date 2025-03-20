import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, ListItemText } from "@mui/material";
import FeesDashboardCard from "@/components/cards/FeesDashboardCard";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import {
  getAllCurrentFeesSummary,
  getAllRecentlyPaidFees,
} from "@/api/currentFeeAPI";
import { UserContext } from "@/context/providers/UserProvider";
import { EMPTY_IMAGES } from "@/config/images";
import teacher_icon from "@/assets/images/header/teacher_ico.svg";
import moment from "moment";
import CustomTitle from "@/components/custom/CustomTitle";
import { useNavigate } from "react-router-dom";
const FeeHome = () => {
  const {
    session: { sessionId, termId, from, to },
  } = useContext(UserContext);
  const navigate = useNavigate();

  const feeSummary = useQuery({
    queryKey: ["current-fees-summary"],
    queryFn: () =>
      getAllCurrentFeesSummary({ session: sessionId, term: termId, from, to }),
    enabled: !!sessionId && !!termId,
  });

  const recentFees = useQuery({
    queryKey: ["recent-fees"],
    queryFn: () => getAllRecentlyPaidFees({ session: sessionId, term: termId }),
    enabled: !!sessionId && !!termId,
  });

  const handleMakePayment = () => {
    navigate(`/fee/payment`);
  };

  return (
    <>
      <CustomTitle
        title="Fees Payment"
        subtitle="Track and manage school fee payments and financial records efficiently to maintain fiscal responsibility."
        img={teacher_icon}
        color="primary.main"
      />

      <Box
        sx={{
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 2,
          py: 3,
        }}
      >
        <FeesDashboardCard text="Today" value={feeSummary?.data?.today} />
        <FeesDashboardCard text="Month" value={feeSummary?.data?.month} />
        <FeesDashboardCard text="Term" value={feeSummary?.data?.term} />
        <FeesDashboardCard text="Year" value={feeSummary?.data?.year} />
      </Box>

      <CustomizedMaterialTable
        isPending={recentFees.isPending}
        title="Recent Fee Payment"
        icon={teacher_icon}
        columns={[
          {
            title: "Date of Payment",
            field: "date",
            type: "date",
            render: ({ date }) => (
              <ListItemText
                primary={moment(date).format("ddd,LL")}
                secondary={moment(date).format("hh:mm a")}
                slotProps={{
                  secondary: {
                    color: "secondary.main",
                  },
                }}
              />
            ),
          },
          {
            title: "Student",
            field: "student",
          },
          {
            title: "Level",
            field: "level",
          },
          {
            title: "Amount Paid",
            field: "paid",
          },
          {
            title: "Outstanding",
            field: "outstanding",
          },
        ]}
        data={recentFees.data}
        actions={[]}
        showAddButton={true}
        addButtonImg={EMPTY_IMAGES.level}
        addButtonMessage=" No recent fee payment !"
        addButtonText="Make New Payment"
        onAddButtonClicked={handleMakePayment}
        handleRefresh={recentFees.refetch}
      />
    </>
  );
};

export default FeeHome;
