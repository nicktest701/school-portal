import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
// import CalendarEvent from "./CalendarEvent";
import { Box, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllEvents } from "../../api/eventAPI";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "@mui/material";
import { getAllHolidays } from "@/api/holidayAPI";
import _ from "lodash";
import { useAuth } from "@/context/AuthProvider";

function CustomEvent() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  // const [anchorEl, setAnchorEl] = useState(null);
  // const [selectedEvent, setSelectedEvent] = useState(null);

  const events = useQuery({
    queryKey: ["events"],
    queryFn: () => getAllEvents(),
    initialData: [],
  });

  const holidays = useQuery({
    queryKey: ["holidays"],
    queryFn: () => getAllHolidays(""),
    initialData: [],
    select: (holidays) => {
      return holidays.map((holiday) => {
        return {
          title: holiday.name,
          start: holiday.date,
          end: holiday.date,
          type: "holiday",
        };
      });
    },
    // staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  // const handleDateSelect = (selectInfo) => {
  //   // const { start, end } = selectInfo;
  //   // console.log("Selected range:", start, end);
  //   // Add any other logic you need here, such as updating state or making an API call
  // };
  // Handle mouse hover to open popover
  // const handleEventMouseEnter = (info) => {
  //   setAnchorEl(info.el);
  //   setSelectedEvent(info.event);
  // };

  // // Close the popover
  // const handleEventMouseLeave = () => {
  //   setAnchorEl(null);
  //   setSelectedEvent(null);
  // };

  const eventDetails = _.union(events?.data, holidays.data, [
    {
      _id: "1",
      title: `Start of ${session?.core?.term} (${session?.core?.academicYear})`,
      date: moment(new Date(session?.core?.from)).format("YYYY-MM-DD"),
      color: theme?.palette?.error?.main,
    },
    {
      _id: "2",
      title: `MidTerm Examination Week`,
      start: moment(new Date(session?.exams?.midTermExams?.from)).format(
        "YYYY-MM-DD"
      ),
      end: moment(new Date(session?.exams?.midTermExams?.to)).format(
        "YYYY-MM-DD"
      ),
      color: theme?.palette?.info?.main,
    },
    {
      _id: "3",
      title: `Revision Week`,
      start: moment(new Date(session?.exams?.revisionWeek?.from)).format(
        "YYYY-MM-DD"
      ),
      end: moment(new Date(session?.exams?.revisionWeek?.to)).format(
        "YYYY-MM-DD"
      ),
          color: theme?.palette?.warning?.main,
    },
    {
      _id: "4",
      title: `Examination Week`,
      start: moment(new Date(session?.exams?.finalExams?.from)).format(
        "YYYY-MM-DD"
      ),
      end: moment(new Date(session?.exams?.finalExams?.to)).format(
        "YYYY-MM-DD"
      ),
      color: "teal",
    },
    {
      _id: "5",
      title: `End of ${session?.core?.term} (${session?.core?.academicYear})`,
      date: moment(new Date(session?.core?.to)).format("YYYY-MM-DD"),
      color: theme?.palette?.success?.main,
    },
    {
      _id: "6",
      title: `Vacation Date for ${session?.core?.term}`,
      date: moment(new Date(session?.core?.vacationDate)).format("YYYY-MM-DD"),
      color: theme?.palette?.success?.main,
    },
  ]);

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
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        initialView="listWeek"
        headerToolbar={{
          left: matches ? "prev,next,today" : "prev,next",
          center: "title",
          right: matches ? "dayGridMonth,listWeek" : "",
        }}
        editable={true}
        selectable={true}
        // select={handleDateSelect}

        selectMirror={true}
        dayMaxEvents={true}
        initialDate={moment().format("YYYY-MM-DD")}
        events={eventDetails}
        eventBackgroundColor="var(--primary)"
        eventBorderColor="white"
        // eventTextColor="#333"
        eventContent={(eventInfo) => (
          <Tooltip
            slotProps={{
              tooltip: {
                sx: { fontSize: 14, textTransform: "uppercase" },
              },
            }}
            title={eventInfo?.event?.extendedProps?.type}
          >
            <Box
              sx={{
                cursor: "pointer",
                px: 1,
                bgcolor:
                  eventInfo?.event?.extendedProps?.type === "holiday"
                    ? "var(--secondary)"
                    : null,
              }}
            >
              <Typography>{eventInfo?.event?.title}</Typography>
            </Box>
          </Tooltip>
        )}
        eventClick={({ event: { extendedProps } }) => {
          if (["1", "2", "3", "4", "5", "6"].includes(extendedProps?._id)) {
            return;
          }
          navigate(`/events/${extendedProps?._id}`);
        }}
        loading={events.isPending || holidays.isPending}
      />
    </Box>
  );
}

export default CustomEvent;
