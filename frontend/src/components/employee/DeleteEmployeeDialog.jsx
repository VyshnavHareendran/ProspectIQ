import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const DeleteEmployeeDialog = ({
  open,
  employee,
  onClose,
  onConfirm,
}) => {
  if (!employee) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>

      <DialogTitle color="error">
        Delete Employee
      </DialogTitle>

      <DialogContent>

        <DialogContentText sx={{ mb: 2 }}>
          Are you sure you want to delete this employee?
        </DialogContentText>

        <Typography>
          <strong>Name:</strong> {employee.full_name}
        </Typography>

        <Typography>
          <strong>Email:</strong> {employee.email}
        </Typography>

        <Typography
          color="error"
          sx={{ mt: 3 }}
        >
          This employee will:
        </Typography>

        <Typography>• Lose access immediately.</Typography>

        <Typography>
          • Be removed from Employee Management.
        </Typography>

        <Typography>
          • Remain available in reports and call logs.
        </Typography>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default DeleteEmployeeDialog;