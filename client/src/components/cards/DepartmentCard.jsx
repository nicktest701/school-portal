import Card from "@/theme/overrides/Card";
import { Box, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const DepartmentCard = ({ department }) => {
  return (
    <Card
      sx={{
        minHeight: 220,
        background: `linear-gradient(135deg, ${department.color}20 0%, ${department.color}40 100%)`,
        border: `2px solid ${department.color}30`,
        position: "relative",
        cursor: "grab",
        transition: "all 0.3s ease-in-out",
        overflow: "visible",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          border: `2px solid ${department.color}60`,
        },
        "&:active": {
          cursor: "grabbing",
          transform: "translateY(-2px)",
        },
      }}
      className="department-card"
    >
      {/* Color Accent Bar */}
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg, ${department.color}, ${department.color}80)`,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      />

      {/* Main Content */}
      <Box sx={{ p: 2.5, position: "relative" }}>
        {/* Action Buttons - Appear on hover */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            display: "flex",
            gap: 0.5,
            opacity: 0,
            transition: "opacity 0.2s ease-in-out",
            ".department-card:hover &": {
              opacity: 1,
            },
          }}
        >
          <Tooltip title="Edit department" arrow>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setEditingDepartment(department);
              }}
              sx={{
                backgroundColor: "white",
                boxShadow: 1,
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "white",
                },
              }}
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete department" arrow>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                deleteDepartment.mutate(department._id);
              }}
              sx={{
                backgroundColor: "white",
                boxShadow: 1,
                "&:hover": {
                  backgroundColor: "error.light",
                  color: "white",
                },
              }}
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Department Initials with colored background */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: department.color,
            color: "white",
            width: 48,
            height: 48,
            borderRadius: 2,
            mb: 2,
            fontWeight: "bold",
            fontSize: "1.2rem",
            boxShadow: 2,
          }}
        >
          {department.initials}
        </Box>

        {/* Department Name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            color: "text.primary",
            lineHeight: 1.3,
          }}
        >
          {department.name}
        </Typography>

        {/* HOD Information */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 2,
            p: 1.5,
            backgroundColor: "rgba(255,255,255,0.6)",
            borderRadius: 2,
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: department.hod
                ? department.color
                : "text.disabled",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: department.hod ? "text.primary" : "text.secondary",
              fontSize: "0.85rem",
            }}
          >
            {department.hod?.fullname || "No HOD assigned"}
          </Typography>
        </Box>

        {/* Stats Preview (Optional - Add if you have this data) */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
            pt: 2,
            borderTop: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" color="text.secondary">
              Teachers
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {department.teacherCount || "0"}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" color="text.secondary">
              Courses
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {department.courseCount || "0"}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Hover Effect Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${department.color}08 0%, ${department.color}15 100%)`,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: "none",
          ".department-card:hover &": {
            opacity: 1,
          },
        }}
      />
    </Card>
  );
};

DepartmentCard.propTypes = {
    
  department: PropTypes.shape({
    _id: PropTypes.string,
    color: PropTypes.string,
    initials: PropTypes.string,
    name: PropTypes.string,
    hod: PropTypes.shape({
      fullname: PropTypes.string,
    }),
    teacherCount: PropTypes.number,
    courseCount: PropTypes.number,
  }).isRequired,
};

export default DepartmentCard;
