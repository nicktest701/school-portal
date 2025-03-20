import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Modal,
  IconButton,
  Stack,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SelectInput from "@/components/inputs/SelectInput";

const reportTemplates = [
  { id: "template1", name: "Template 1", preview: "/images/template1.png" },
  { id: "template2", name: "Template 2", preview: "/images/template2.png" },
  { id: "template3", name: "Template 3", preview: "/images/template3.png" },
];

const Report = ({ control, setValue, watch, errors }) => {
  const selectedTemplate = watch("report.template");
  const [previewTemplate, setPreviewTemplate] = useState(null); // Template for modal preview

 
  return (
    <div>
      {/* Title */}
      <Typography variant="h5" fontWeight="bold">
        Report Customization
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        fontStyle="italic"
        mb={3}
      >
        Customize your reports by selecting a preferred template and setting the
        report dimensions.
      </Typography>

      <Stack spacing={2} py={2}>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          {/* Report Template Selection */}
          <Box mb={4}>
            <Typography variant="h6" fontWeight="medium">
              Report Template
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Choose a template, preview it, and select your preferred layout.
            </Typography>

            <Grid container spacing={2}>
              {reportTemplates.map((template) => (
                <Grid item xs={12} sm={4} key={template.id}>
                  <Card
                    sx={{
                      border:
                        selectedTemplate === template.id
                          ? "2px solid var(--primary)"
                          : "2px solid transparent",
                      boxShadow: selectedTemplate === template.id ? 4 : 1,
                    }}
                  >
                    <CardActionArea
                      onClick={() => setPreviewTemplate(template)}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={template.preview}
                        alt={template.name}
                      />
                      <CardContent>
                        <Typography variant="body1" align="center">
                          {template.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {errors?.report?.template && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors?.report?.template?.message}
              </FormHelperText>
            )}
          </Box>
        </Paper>

        {/* Report Dimension Selection */}
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Box>
            <Typography variant="h6" fontWeight="medium">
              Report Dimension
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Select the preferred paper size for your reports.
            </Typography>
            <FormControl fullWidth>
              <SelectInput
                label="Term/Semester"
                size="small"
                name="report.dimension"
                control={control}
                fullWidth
                margin="normal"
                required
              >
                <MenuItem value="Letter">Letter</MenuItem>
                <MenuItem value="A4">A4</MenuItem>
                <MenuItem value="A3">A3</MenuItem>
              </SelectInput>

             
            </FormControl>
          </Box>

          {/* Modal for Template Preview */}
          <Modal
            open={!!previewTemplate}
            onClose={() => setPreviewTemplate(null)}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 2,
                borderRadius: 2,
                maxWidth: "90vw",
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: 10, right: 10 }}
                onClick={() => setPreviewTemplate(null)}
              >
                <CloseIcon />
              </IconButton>
              {previewTemplate && (
                <>
                  <Typography variant="h6" mb={2}>
                    {previewTemplate.name}
                  </Typography>
                  <CardMedia
                    component="img"
                    image={previewTemplate.preview}
                    alt={previewTemplate.name}
                    sx={{
                      maxHeight: "80vh",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <Box mt={2}>
                    <Typography
                      variant="button"
                      color={
                        selectedTemplate === previewTemplate.id
                          ? "primary"
                          : "textSecondary"
                      }
                      onClick={() => {
                        setPreviewTemplate(null);
                        setValue("report.template", previewTemplate.id);
                      }}
                      sx={{
                        cursor: "pointer",
                        fontWeight: "bold",
                        p: 1,
                        border: "1px solid",
                        borderRadius: 1,
                        "&:hover": {
                          bgcolor: "primary.light",
                        },
                      }}
                    >
                      {selectedTemplate === previewTemplate.id
                        ? "Selected"
                        : "Select Template"}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          </Modal>
        </Paper>
      </Stack>
    </div>
  );
};

export default Report;
