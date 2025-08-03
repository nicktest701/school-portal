import React from "react";
import Box from "@mui/material/Box";

import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import ProfileItem from "@/components/typo/ProfileItem";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";

import { Typography } from "@mui/material";

const ViewParent = ({ open, setOpen, parents }) => {
  //CLOSE view User Info
  const handleClose = () => setOpen(false);

  //New Parent

  return (
    <>
      <Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
        <CustomDialogTitle title="Parent Information" onClose={handleClose} />
        <DialogContent>
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
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default React.memo(ViewParent);
