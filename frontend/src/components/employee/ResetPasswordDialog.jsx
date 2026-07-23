import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { employeeManagementApi } from "../../api/admin/employeeManagementApi";

export default function ResetPasswordDialog({
  open,
  employee,
  onClose,
  onPasswordReset,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("");

  const handleClose = () => {
    if (loading) return;

    setError("");
    setTemporaryPassword("");
    onClose();
  };

  const handleReset = async () => {
    if (!employee?.id) return;

    try {
      setLoading(true);
      setError("");

      const response =
        await employeeManagementApi.resetPassword(employee.id);

      setTemporaryPassword(
        response.data.temporary_password
      );

      onPasswordReset?.(response.data);
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Unable to reset employee password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Reset Employee Password
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.5} sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          {!temporaryPassword ? (
            <>
              <Alert severity="warning">
                Resetting the password will immediately
                invalidate the employee&apos;s current password.
              </Alert>

              <Box>
                <Typography fontWeight={700}>
                  {employee?.full_name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {employee?.email}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                A new temporary password will be generated.
                The employee must use this password to sign in
                and will be required to change it.
              </Typography>
            </>
          ) : (
            <>
              <Alert severity="success">
                Password reset successfully.
              </Alert>

              <Typography variant="body2">
                Give this temporary password to the employee.
                It is shown here so you can copy it before
                closing this window.
              </Typography>

              <Divider />

              <TextField
                fullWidth
                label="Temporary Password"
                value={temporaryPassword}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />

              <Alert severity="info">
                The employee will be required to change this
                temporary password after signing in.
              </Alert>
            </>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={handleClose}
          disabled={loading}
        >
          {temporaryPassword ? "Close" : "Cancel"}
        </Button>

        {!temporaryPassword && (
          <Button
            variant="contained"
            color="warning"
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}