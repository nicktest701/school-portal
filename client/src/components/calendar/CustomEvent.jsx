import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarEvent from "./CalendarEvent";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllEvents } from "../../api/eventAPI";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useMediaQuery, useTheme } from "@mui/material";

function CustomEvent() {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const events = useQuery({
    queryKey: ["events"],
    queryFn: () => getAllEvents(),
    initialData: [],
    select: (events) => {
      return events.map((event) => {
        return {
          _id: event?._id,
          title: event?.title,
          date: moment(event?.createdAt).format("YYYY-MM-DD"),
        };
      });
    },
  });

  const handleDateSelect = (selectInfo) => {
    const { start, end } = selectInfo;
    console.log("Selected range:", start, end);
    // Add any other logic you need here, such as updating state or making an API call
  };

  return (
    <Container
      sx={{
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: "0 2px 3px rgba(0,0,0,0.1)",
        p: 2,
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: matches ? "prev,next,today" : "prev,next",
          center: "title",
          right: matches
            ? "dayGridMonth,timeGridWeek,timeGridDay"
            : "",
        }}
        editable={true}
        selectable={true}
        select={handleDateSelect}
        selectMirror={true}
        dayMaxEvents={true}
        initialDate={moment().format("YYYY-MM-DD")}
        events={events?.data}
        eventBackgroundColor="#012e54"
        eventBorderColor="white"
        eventTextColor="#ffc09f"
        eventContent={CalendarEvent}
        eventClick={({ event: { extendedProps } }) => {
          navigate(`/events/${extendedProps?._id}`);
        }}
        loading={events.isLoading}
      />
    </Container>
  );
}

export default CustomEvent;
