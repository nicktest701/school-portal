import {
  Box,
  Button,
  DialogActions,
  Divider,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

function PublishResultOption({
  open,
  onClose,
  value = "sms",
  setValue,
  handlePublish,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          //   p: 2,
          borderRadius: 2,
          width: { xs: 300, md: 500 },
        }}
      >
        <Stack padding={2} spacing={1}>
          <Typography variant="body2" color="primary.main">
            Kindly select how you want to publish the results.
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-labelledby="status"
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              <FormControlLabel
                value="sms"
                control={<Radio size="small" />}
                label="SMS"
              />
              <FormControlLabel
                value="email"
                control={<Radio size="small" />}
                label="Email"
              />
              <FormControlLabel
                value="both"
                control={<Radio size="small" />}
                label="Both"
              />
            </RadioGroup>
          </FormControl>
          <Divider />
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handlePublish}>
              Publish Now
            </Button>
          </DialogActions>
        </Stack>
      </Box>
    </Modal>
  );
}
PublishResultOption.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
};

export default PublishResultOption;
