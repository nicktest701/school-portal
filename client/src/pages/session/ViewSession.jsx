import React from "react";
import moment from "moment";
import {
  Stack,
  Typography,
  Divider,
  Container,
  TextField,
  Button,
} from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTerm } from "@/api/termAPI";

import CustomTitle from "@/components/custom/CustomTitle";
import Edit from "@mui/icons-material/Edit";

const ViewSession = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const session = useQuery({
    queryKey: ["terms/:id", id],
    queryFn: () => getTerm(id),
    initialData: queryClient
      .getQueryData(["terms"])
      ?.find((term) => term?.termId === id),
    enabled: !!id,
  });

  //Edit session
  const handleEditSession = () => {
    setSearchParams((params) => {
      params.set("_id", id);
      params.set("edit_session", true);

      return params;
    });
  };

  return (
    <Container>
      <CustomTitle
        title={session?.data?.academicYear}
        subtitle="Create, update, and oversee academic sessions to ensure smooth academic operations"
        // img={session_icon}
        color="primary.main"
        showBack={true}
        to="/session"
        right={
          <Button
            startIcon={<Edit />}
            sx={{ bgcolor: "rgba(1, 46, 84,0.1)" }}
            onClick={handleEditSession}
          >
            Edit Session
          </Button>
        }
      />
      {session?.isLoading ? (
        <p>Please Wait..</p>
      ) : (
        <>
          <Container
            sx={{
              bgcolor: "#fff",
              py: 4,
            }}
          >
            <Stack spacing={2} paddingY={2}>
              <TextField
                label="Academic Year"
                value={session?.data?.academicYear}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                size="small"
              />
              <TextField
                label="Term/Semester"
                value={session?.data?.term}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                size="small"
              />

              <Typography fontSize={13}>Duration</Typography>

              <TextField
                label="Start of Academic Term/Semester"
                value={moment(new Date(session?.data?.from))?.format(
                  "Do MMMM YYYY"
                )}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                size="small"
              />

              <TextField
                label="End of Academic Term/Semester"
                value={moment(new Date(session?.data?.to))?.format(
                  "Do MMMM YYYY"
                )}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                size="small"
              />

              <Typography fontSize={13}>Vacation</Typography>

              <TextField
                label="Vacation Date"
                value={moment(new Date(session?.data?.vacationDate))?.format(
                  "Do MMMM YYYY"
                )}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                size="small"
              />

              <TextField
                label="Next Term Begins"
                value={moment(new Date(session?.data?.reOpeningDate))?.format(
                  "Do MMMM YYYY"
                )}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                size="small"
              />

              <Divider />
            </Stack>
          </Container>
        </>
      )}
    </Container>
  );
};

export default ViewSession;
