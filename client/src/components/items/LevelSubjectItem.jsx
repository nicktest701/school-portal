import DeleteOutline from "@mui/icons-material/DeleteOutline";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";

const LevelSubjectItem = ({ subject, removeSubject }) => {
  return (
    <>
      <ListItem sx={{ mt: 3 }}>
        <ListItemText
          secondary={subject?.name}
          secondaryTypographyProps={{
            fontSize: 12,
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        />
        <ListItemSecondaryAction
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton onClick={() => removeSubject(subject?._id)}>
            <DeleteOutline />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default LevelSubjectItem;
