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
            return;
        }
        try {
            const response = await employeeManagementApi.createEmployee({
                full_name: fullName,
                email,
                role,
            });
        } catch (err) {
            console.log(err);

        }
    };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Employee</DialogTitle>

      <DialogContent>

        <Stack spacing={3} mt={1}>

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

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
  );
};

export default AddEmployeeDialog;