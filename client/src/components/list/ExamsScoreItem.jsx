import { Delete } from '@mui/icons-material';
import {
  Button,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { gradeColor } from '../../config/gradeColor';

const ExamsScoreItem = ({ item, removeSubject, title }) => {
  return (
    <>
      <ListItem divider>
        <ListItemText sx={{ width: 120 }} secondary={item?.subject} />
        <ListItemText secondary={item?.classScore} />
        <ListItemText secondary={item?.examsScore} />
        <ListItemText secondary={item?.totalScore} />
        <ListItemText secondary={item?.grade} />
        {/* <ListItemText secondary={item?.remarks} /> */}
        <Button
        size='small'
          sx={{
            color: title ? 'text.main' : gradeColor(item?.totalScore).color,
            bgcolor:title ? 'transparent' : gradeColor(item?.totalScore).bg,
            mr:2
          }}
        >
          {item?.remarks}
        </Button>
        <ListItemSecondaryAction>
          {!title && (
            <IconButton
              color='secondary'
              onClick={() => removeSubject(item.subject)}
            >
              <Delete />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default ExamsScoreItem;
