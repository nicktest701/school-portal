function CalendarEvent({ timeText, event }) {
  return (
    <div>
      <div>
        {/* <p>{timeText}</p> */}
        <p>{event?.title}</p>
      </div>
    </div>
  );
}

export default CalendarEvent;
