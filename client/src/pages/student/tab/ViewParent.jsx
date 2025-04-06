import React, { useContext, useState } from "react";
import { Add, Edit, MessageRounded } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import ProfileItem from "@/components/typo/ProfileItem";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";
import { StudentContext } from "@/context/providers/StudentProvider";
import ParentEdit from "./ParentEdit";
import { Typography } from "@mui/material";
import ParentNew from "./ParentNew";

const ViewParent = ({ open, setOpen, parents }) => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const { studentDispatch } = useContext(StudentContext);
  const [openNewParent, setOpenNewParent] = useState(false);


  //CLOSE view User Info
  const handleClose = () => setOpen(false);

  // OPEN Quick Message
  const openQuickMessage = (phonenumber, email) => {
    schoolSessionDispatch({
      type: "sendQuickMessage",
      payload: {
        open: true,
        data: {
          email,
          phonenumber,
        },
      },
    });
  };

  //EDIT Student Info
  const openParentEdit = (parent) => {
    studentDispatch({
      type: "editParent",
      payload: {
        open: true,
        data: parent,
      },
    });
  };

  //New Parent

  return (
    <>
      <Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
        <CustomDialogTitle title="Parent Information" onClose={handleClose} />
        <DialogContent >
          {parents?.length > 0 ? (
            parents?.map((parent, index) => {
              return (
                <Box key={parent?._id}>
                  <Divider flexItem>
                    <Chip
                      label={`Parent /Guardian ${index + 1}`}
                      color="primary"
                    />
                  </Divider>

                  <ProfileItem
                    label="Name"
                    text={`${parent?.firstname} ${parent?.surname}`}
                  />

                  <ProfileItem
                    label="Relationship"
                    text={parent?.relationship}
                  />
                  <ProfileItem label="Gender" text={parent?.gender} />
                  <ProfileItem label="Email Address" text={parent?.email} />
                  <ProfileItem
                    label="Telephone No."
                    text={parent?.phonenumber}
                  />
                  <ProfileItem label="Address" text={parent?.address} />
                  <ProfileItem label="Residence" text={parent?.residence} />
                  <ProfileItem label="Nationality" text={parent?.nationality} />
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    paddingY={2}
                    gap={1}
                  >
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                      <Button
                        size="small"
                        startIcon={<MessageRounded />}
                        onClick={() =>
                          openQuickMessage(parent?.phonenumber, parent?.email)
                        }
                      >
                        Send Message
                      </Button>
                      <Button
                        size="small"
                        endIcon={<Edit />}
                        onClick={() => openParentEdit(parent)}
                      >
                        Edit
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography>No Parent info available</Typography>
              <Button
                startIcon={<Add />}
                onClick={() => setOpenNewParent(true)}
              >
                Add New
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
      <ParentEdit />
      <ParentNew open={openNewParent} setOpen={setOpenNewParent} />
    </>
  );
};

export default React.memo(ViewParent);
