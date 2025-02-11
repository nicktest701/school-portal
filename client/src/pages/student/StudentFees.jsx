import { Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import StudentFeeReportListItem from "@/components/list/StudentFeeReportListItem";
import { v4 as uuid } from "uuid";
const StudentFees = ({ data }) => {
  const { studentId } = useParams();

  return (
    <Box>
      <Typography
        variant="h5"
        color="primary.main"
        bgcolor="lightgray"
        p={1}
        sx={{ fontWeight: "bold", width: "100%" }}
      >
        Student Fees History
      </Typography>
      <Stack
        sx={{
          width: "100%",
          maxHeight: "100vh",
          overflowY: "scroll",
          // border: "1px solid black",
        }}
      >
        {data?.fees !== undefined ? (
          <>
            {data?.fees.map((session) => {
              const id = uuid();
              return (
                <StudentFeeReportListItem
                  key={id}
                  item={session}
                  studentId={studentId}
                />
              );
            })}
          </>
        ) : (
          <div>No Fees History Available</div>
        )}
      </Stack>
    </Box>
  );
};
StudentFees.propTypes = {
  studentId: PropTypes.string,
};

export default StudentFees;
