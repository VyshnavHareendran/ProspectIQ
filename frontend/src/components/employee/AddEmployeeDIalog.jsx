import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Snackbar,
} from "@mui/material";

import { employeeManagementApi } from "../../api/admin/employeeManagementApi";

const AddEmployeeDialog = ({
  open,
  onClose,
  onEmployeeCreated,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("EMPLOYEE");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const resetForm = () => {
    setFullName("");
    setEmail("");
    setRole("EMPLOYEE");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleCreate = async () => {

      setError("");

      if (!fullName || !email) {

          setError("Full name and email are required.");

          return;
      }

      try {

          setLoading(true);

          const response = await employeeManagementApi.createEmployee({

              full_name: fullName,

              email,

              role,

          });

          onEmployeeCreated(response.data);

          handleClose();

      } catch (err) {

          const message =
              err.response?.data?.detail ??
              "Unable to create employee.";

          setError(message);

          setSnackbarOpen(true);

      } finally {

          setLoading(false);

      }
  };

  return (
   <> 
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Employee</DialogTitle>

      <DialogContent>

        <Stack spacing={3} mt={1}>

          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            fullWidth
          />

          <TextField
            label="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>

            <Select
              value={role}
              label="Role"
              onChange={(e) =>
                setRole(e.target.value)
              }
            >
              <MenuItem value="EMPLOYEE">
                Employee
              </MenuItem>

              <MenuItem value="ADMIN">
                Admin
              </MenuItem>

            </Select>
          </FormControl>

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={loading}
        >
          Create Employee
        </Button>

      </DialogActions>

    </Dialog>
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
    >

        <Alert
            severity="error"
            onClose={() => setSnackbarOpen(false)}
            variant="filled"
        >
            {error}
        </Alert>

    </Snackbar>
   </>
  );
};

export default AddEmployeeDialog;