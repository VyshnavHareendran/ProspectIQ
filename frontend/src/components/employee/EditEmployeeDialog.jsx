import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import { employeeManagementApi } from "../../api/admin/employeeManagementApi";

export default function EditEmployeeDialog({
  open,
  employee,
  onClose,
  onEmployeeUpdated,
}) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && employee) {
      setFormData({
        full_name: employee.full_name || "",
        email: employee.email || "",
      });

      setError("");
    }
  }, [open, employee]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const fullName = formData.full_name.trim();
    const email = formData.email.trim();

    if (!fullName || !email) {
      setError("Full name and email are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await employeeManagementApi.updateEmployee(
        employee.id,
        {
          full_name: fullName,
          email,
        }
      );

      onEmployeeUpdated(response.data);
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Unable to update employee."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit Employee</DialogTitle>

      <DialogContent>
        <Stack spacing={2.5} sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            required
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            disabled={saving}
          />

          <TextField
            fullWidth
            required
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={saving}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={onClose}
          disabled={saving}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}