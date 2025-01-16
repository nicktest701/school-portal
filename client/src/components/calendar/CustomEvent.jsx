import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import CalendarEvent from "./CalendarEvent";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllEvents } from "../../api/eventAPI";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useMediaQuery, useTheme } from "@mui/material";
import { Popover, Typography } from "@mui/material";
import { useState } from "react";

function CustomEvent() {
  const session = JSON.parse(localStorage.getItem("@school_session"));
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  // const handleDateSelect = (selectInfo) => {
  //   // const { start, end } = selectInfo;
  //   // console.log("Selected range:", start, end);
  //   // Add any other logic you need here, such as updating state or making an API call
  // };
  // Handle mouse hover to open popover
  const handleEventMouseEnter = (info) => {
    setAnchorEl(info.el);
    setSelectedEvent(info.event);
  };

  // Close the popover
  const handleEventMouseLeave = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };


  return (
    <Box
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
          right: matches ? "dayGridMonth,timeGridWeek,timeGridDay" : "",
        }}
        editable={true}
        selectable={true}
        // select={handleDateSelect}
        selectMirror={true}
        dayMaxEvents={true}
        initialDate={moment().format("YYYY-MM-DD")}
        events={[
          events?.data,
          {
            _id: "1",
            title: `Start of ${session?.term} (${session?.academicYear})`,
            date: moment(session?.from).format("YYYY-MM-DD"),
          },
          {
            _id: "2",
            title: `End of ${session?.term} (${session?.academicYear})`,
            date: moment(session?.to).format("YYYY-MM-DD"),
          },
          {
            _id: "3",
            title: `Vacation Date for ${session?.term}`,
            date: moment(session?.vacationDate).format("YYYY-MM-DD"),
          },
        ]}
        eventBackgroundColor="transparent"
        eventBorderColor="white"
        eventTextColor="#333"
        eventContent={(eventInfo) => (
          <Box
            sx={{
              cursor: "pointer",
              // width: "20ch",
              whiteSpace: "wrap",
              width: "12ch",
              fontSize: "10px",
              pl: 1,
              bgcolor:'lightgray'
              
            }}
          >
            <strong>{eventInfo?.event?.title}</strong>
          </Box>
        )}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        eventClick={({ event: { extendedProps } }) => {
          if (["1", "2", "3", "4"].includes(extendedProps?._id)) {
            return;
          }
          navigate(`/events/${extendedProps?._id}`);
        }}
        loading={events.isLoading}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleEventMouseLeave}
     
      >
        {selectedEvent && (
          <Typography sx={{ p: 2 }}>
            <strong>{selectedEvent.title}</strong>
            <br />
            <strong>Date:</strong>{" "}
            {moment(selectedEvent.start).format("MMMM Do, YYYY")}
          </Typography>
        )}
      </Popover>
    </Box>
  );
}

export default CustomEvent;
