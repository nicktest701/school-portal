
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import {
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  
} from '@mui/material';


const LevelSubjectItem = ({ name, removeSubject }) => {
  return (
    <>
      <ListItem>
        <ListItemText
          secondary={name}
          secondaryTypographyProps={{ fontSize: 12, fontStyle: 'italic' }}
        />
        <ListItemSecondaryAction
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <IconButton onClick={() => removeSubject(name)}>
            <DeleteOutline />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default LevelSubjectItem;
