import React, { useState, use } from "react";
import {
  Box,
  Grid2 as Grid,
  Card,
  CardMedia,
  CardActions,
  Button,
  Modal,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Close, Delete, PreviewRounded } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "@/context/providers/UserProvider";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { putTerm } from "@/api/termAPI";
import Swal from "sweetalert2";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";

// Sample report card templates (replace with your actual HTML/CSS templates)
const reportCardTemplates = [
  {
    id: 1,
    name: "Report 1",
    thumbnail: "https://loremflickr.com/400/300",
    html: '<div style="border: 1px solid #000; padding: 20px; text-align: center;"><h1>Report Card</h1><p>Report 1</p></div>',
  },
  {
    id: 2,
    name: "Report 2",
    thumbnail: "https://loremflickr.com/400/300",
    html: '<div style="border: 1px solid #000; padding: 20px; text-align: center;"><h1>Report Card</h1><p>Report 2</p></div>',
  },
  {
    id: 3,
    name: "Report 3",
    thumbnail: "https://loremflickr.com/400/300",
    html: '<div style="border: 1px solid #000; padding: 20px; text-align: center;"><h1>Report Card</h1><p>Template 3</p></div>',
  },
];

const ReportTemplates = () => {
  const queryClient = useQueryClient();
  const { updateSession, session } = use(UserContext);
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [defaultTemplate, setDefaultTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreview = (template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: putTerm,
  });
  const handleSetDefault = ({ name, thumbnail }) => {
    const details = {
      sessionId: session?.sessionId,
      id: session?.termId,
      report: {
        name,
        thumbnail,
      },
    };

    Swal.fire({
      title: "Changing report",
      text: "Set as default report template?",
      showCancelButton: true,
      backdrop: "rgba(0,0,0,0.2)",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(details, {
          onSettled: () => {
            queryClient.invalidateQueries(["terms"]);
            queryClient.invalidateQueries(["terms/:id"]);
          },
          onSuccess: (data) => {
            updateSession({
              report: {
                name,
                thumbnail,
              },
            });
            schoolSessionDispatch(alertSuccess(data));
            setDefaultTemplate(selectedTemplate);
            setIsModalOpen(false);
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Select Report Card Template
      </Typography>
      <Grid container spacing={3}>
        {reportCardTemplates.map((template) => (
          <Grid
            key={template.id}
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Card
              sx={{ cursor: "pointer" }}
              onClick={() => handlePreview(template)}
            >
              <CardMedia
                component="img"
                height="600"
                image={template.thumbnail}
                alt={template.name}
                loading="lazy"
              />
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Tooltip title="Preview" placement="top">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handlePreview(template)}
                  >
                    <PreviewRounded />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Remove" placement="top">
                  <IconButton size="small" color="primary">
                    <Delete />
                  </IconButton>
                </Tooltip>
                {defaultTemplate?.id === template.id && (
                  <Typography variant="body2" color="textSecondary">
                    (Default)
                  </Typography>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Preview Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            outline: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSetDefault(selectedTemplate)}
              loading={isPending}
            >
              Set as Default
            </Button>
            <IconButton
              variant="outlined"
              color="secondary"
              size="large"
              onClick={handleCloseModal}
              disabled={isPending}
            >
              <Close />
            </IconButton>
          </Box>
          <Typography variant="h6" gutterBottom>
            Preview: {selectedTemplate?.name}
          </Typography>
          <div
            dangerouslySetInnerHTML={{ __html: selectedTemplate?.html }}
            style={{ marginBottom: 16 }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ReportTemplates;
