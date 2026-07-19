import { Chip } from "@mui/material";

const colors = {
  NEW: "warning",
  IN_PROGRESS: "info",
  FOLLOW_UP: "secondary",
  CLOSED: "success",
};

const LeadStatusChip = ({ status }) => (
  <Chip
    label={status}
    color={colors[status] || "default"}
    size="small"
  />
);

export default LeadStatusChip;