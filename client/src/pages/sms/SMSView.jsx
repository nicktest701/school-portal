import { useContext } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { deleteMessage, resendMessage } from "../../api/messageAPI";
import Transition from "../../components/animations/Transition";
import CustomDialogTitle from "../../components/dialog/CustomDialogTitle";

function SMSView() {
  const queryClient = useQueryClient();

  const {
    schoolSessionState: {
      messageData: { open, data },
    },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const { mutateAsync, isPending } = useMutation(resendMessage);
  const onSend = () => {
    const message = {
      id: data?._id,
      type: data?.type,
      body: data?.body,
      recipient: data?.recipient,
    };

    mutateAsync(message, {
      onSettled: () => {
        queryClient.invalidateQueries(["messages"]);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        handleClose();
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  const { mutateAsync: deleteMutateAsync, isPending: dLoading } =
    useMutation(deleteMessage);
  const handleDelete = () => {
    Swal.fire({
      title: "Removing Message",
      text: "Do you want to delete message?",
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        deleteMutateAsync(data?._id, {
          onSettled: () => {
            queryClient.invalidateQueries(["messages"]);
          },
          onSuccess: (data) => {
            schoolSessionDispatch(alertSuccess(data));
            handleClose();
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };

  const handleClose = () => {
    schoolSessionDispatch({
      type: "viewMessage",
      payload: {
        data: {},
        open: false,
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Transition}
    >
      <CustomDialogTitle title="Messages" onClose={handleClose} />

      <DialogContent>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={1}
          py={1}
        >
          <Tooltip title="Delete">
            {/* <IconButton color='error' onClick={handleDelete}>
              <DeleteForeverRounded />
            </IconButton> */}
            <Button
              color="error"
              loading={dLoading}
              onClick={handleDelete}
            >
              Remove
            </Button>
          </Tooltip>
          {/* {!data.active && ( */}
          <Tooltip title="Resend">
            {/* <IconButton color='success' onClick={onSend}>
              <RefreshRounded />
            </IconButton> */}
            <Button
              loading={isPending}
              variant="contained"
              onClick={onSend}
            >
              Resend
            </Button>
          </Tooltip>
          {/* // )} */}
        </Stack>
        <Chip
          label={data?.active ? "Delivered" : "Not Delivered"}
          color={data?.active ? "success" : "error"}
          sx={{ color: "#fff" }}
          size="small"
        />
        <Stack>
          <ListItemText
            primary="Date of Issue"
            secondary={moment(new Date(data?.createdAt)).format("Do MMMM YYYY")}
          />
          <ListItemText primary="Type" secondary={data?.type} />
          <ListItemText
            primary="Receipient"
            secondary={
              data?.recipient?.type === "Individual"
                ? data?.recipient?.email[0] || data?.recipient?.phonenumber[0]
                : data?.recipient?.type
            }
          />

          <ListItemText
            primary={data?.body?.title}
            // secondary={data?.body?.message}
          />
          <div
            style={{ padding: "16px" }}
            dangerouslySetInnerHTML={{ __html: data?.body?.message }}
          ></div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SMSView;
