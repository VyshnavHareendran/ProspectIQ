import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const EmployeeCreatedDialog = ({
  open,
  onClose,
  employee,
  onCopy,
}) => {
  if (!employee) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
        employee.temporary_password
    );

    onCopy();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Employee Created Successfully
      </DialogTitle>

      <DialogContent>

        <Stack spacing={3} mt={1}>

          <div>
            <Typography variant="subtitle2">
              Name
            </Typography>

            <TextField
              fullWidth
              value={employee.full_name}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>

          <div>
            <Typography variant="subtitle2">
              Email
            </Typography>

            <TextField
              fullWidth
              value={employee.email}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>

          <div>
            <Typography variant="subtitle2">
              Temporary Password
            </Typography>

            <TextField
              fullWidth
              value={employee.temporary_password}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={handleCopy}
          variant="outlined"
        >
          Copy Password
        </Button>

        <Button
          onClick={onClose}
          variant="contained"
        >
          Close
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default EmployeeCreatedDialog;