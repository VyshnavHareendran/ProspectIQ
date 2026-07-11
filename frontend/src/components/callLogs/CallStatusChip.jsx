import { Chip } from "@mui/material";

const statusColors = {
  INTERESTED: "success",
  FOLLOW_UP: "warning",
  CALL_BACK: "info",
  NO_ANSWER: "default",
  NOT_INTERESTED: "error",
  CLOSED: "secondary",
};

const CallStatusChip = ({ status }) => {
  return (
    <Chip
      label={status}
      color={statusColors[status] || "default"}
      size="small"
    />
  );
};

export default CallStatusChip;