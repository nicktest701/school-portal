import {
  Container,
  Box,
  Stack,
  Typography,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import React from "react";
import { EMPTY_IMAGES } from "../../config/images";
import { getEvent } from "../../api/eventAPI";
import Back from "../../components/Back";
import moment from "moment";

function ViewEvent() {
  const queryClient = useQueryClient();

  const { id } = useParams();
  // const [loaded, setLoaded] = useState(false);

  //   useEffect(() => {
  //     // Load the low-quality image initially
  //     const backgroundDiv = document.getElementById("background-div");
  //     backgroundDiv.style.background = `url(${EMPTY_IMAGES.level})`;

  //     // Create an image object for the original image
  //     const originalImage = new Image();
  //     originalImage.src = EMPTY_IMAGES.level;

  //     // Replace low-quality image with original image on load
  //     originalImage.onload = () => {
  //       backgroundDiv.style.backgroundImage = `url(${EMPTY_IMAGES.level})`;
  //       setLoaded(true);
  //     };
  //   }, []);

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
          background: `linear-gradient(to bottom,rgba(1, 46, 84,0.95),rgba(1, 46, 84,0.7)),url(${
            event?.data?.album || EMPTY_IMAGES?.level
          })`,
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          width: "100%",
          height: "50svh",
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Back to={-1} color="secondary.main" />
        <Box>
          <Typography variant="h2" color="#fff" paragraph>
            {event?.data?.title}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Avatar />
          <ListItemText
            primary="Hello"
            secondary={`Created on - ${moment(event?.data?.createdAt)?.format("LLL")}`}
            primaryTypographyProps={{
              color: "#fff",
            }}
            secondaryTypographyProps={{
              color: "#fff",
            }}
          />
        </Stack>
      </Box>
      <div
        style={{ padding: "16px" }}
        dangerouslySetInnerHTML={{ __html: event?.data?.description }}
      ></div>
    </Container>
  );
}

export default ViewEvent;
