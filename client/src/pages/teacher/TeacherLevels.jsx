import { TabPanel } from "@mui/lab";
import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React, { useMemo } from "react";
import { DeleteRounded } from "@mui/icons-material";
import useLevel from "../../components/hooks/useLevel";

function TeacherLevels({ onClick, id }) {
  const { levelsOption } = useLevel();

  const assigned = useMemo(() => {
    return levelsOption?.filter((level) => level?.teacher?._id === id);
  }, [levelsOption, id]);

  return (
    <TabPanel value="2">
      <List>
        {assigned?.length > 0 &&
          assigned?.map((level) => (
            <ListItem key={level?._id} divider>
              <ListItemText primary={level?.type} />

              <ListItemSecondaryAction>
                <Button
                  title="Unassigned from level"
                  color="error"
                  size="small"
                  endIcon={<DeleteRounded />}
                  onClick={() => onClick(level?._id)}
                >
                  Remove
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </TabPanel>
  );
}

export default TeacherLevels;
