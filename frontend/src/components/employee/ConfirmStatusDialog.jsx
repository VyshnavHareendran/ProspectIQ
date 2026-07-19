import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const ConfirmStatusDialog = ({
  open,
  employee,
  onClose,
  onConfirm,
}) => {
  if (!employee) return null;

  const action = employee.is_active ? "Disable" : "Enable";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{action} Employee</DialogTitle>

      <DialogContent>
        <Typography gutterBottom>
          Are you sure you want to <strong>{action.toLowerCase()}</strong> this
          employee?
        </Typography>

        <Typography variant="body2">
          <strong>Name:</strong> {employee.full_name}
        </Typography>

        <Typography variant="body2">
          <strong>Email:</strong> {employee.email}
        </Typography>

        {employee.is_active && (
          <Typography color="error" sx={{ mt: 2 }}>
            This employee will no longer be able to log in.
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color={employee.is_active ? "error" : "success"}
          onClick={onConfirm}
        >
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmStatusDialog;