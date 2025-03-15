import {
  Container,
  Box,
  Typography,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import React from "react";
import { EMPTY_IMAGES } from "../../config/images";
import { getEvent } from "../../api/eventAPI";
import Back from "../../components/Back";
import moment from "moment";

function ViewEvent() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  const event = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
    initialData: queryClient
      .getQueryData(["events", id])
      ?.find((event) => event?._id === id),
    enabled: !!id,
  });

  return (
    <Container>
      <Box
        // className={loaded ? "loaded" : ""}
        sx={{
          background: `linear-gradient(to bottom,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.9)),url(${
            event?.data?.album || EMPTY_IMAGES?.level
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          p: 4,
          mb: 4,
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <Back to={searchParams.get("redirect_to") || "/"} />
        </div>

        <Box
          spacing={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          width="100%"
        >
          <ListItemText
            primary={
              <Typography variant="h3" color="primary">
                {event?.data?.title}
              </Typography>
            }
            secondary={
              <Typography variant="subtitle" color="" paragraph>
                {event?.data?.caption}
              </Typography>
            }
            aria-autocomplete=""
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            <Avatar>{event?.data?.createdBy?.fullname[0]}</Avatar>
            <ListItemText
              primary={event?.data?.createdBy?.fullname}
              secondary={moment(event?.data?.createdAt)?.format("LLL")}
              aria-autocomplete=""
              slotProps={{
                primary: {
                  color: "secondary.main",
                },
                secondary: {
                  whiteSpace: "nowrap",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
      <div
        style={{ padding: "16px" }}
        dangerouslySetInnerHTML={{ __html: event?.data?.description }}
      ></div>
    </Container>
  );
}

export default ViewEvent;
