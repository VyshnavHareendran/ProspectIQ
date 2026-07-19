import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { authApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import { routePaths } from "../../routes/routePaths";

const ChangePassword = () => {
  const navigate = useNavigate();

  const { refreshUser } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await authApi.changePassword({
        new_password: newPassword,
      });

      const user = await refreshUser();

      if (user.role === "ADMIN") {
        navigate(routePaths.dashboard, {
          replace: true,
        });
      } else {
        navigate(routePaths.employeeDashboard, {
          replace: true,
        });
      }
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
        component="main"
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "100%",
            background:
            "radial-gradient(circle at 50% -10%, rgba(124, 45, 90, 0.13), transparent 38%), linear-gradient(180deg, #FDF9FB 0%, #F8FAFC 100%)",
            px: 2,
        }}
    >
      <Paper
        sx={{
            width: "100%",
            maxWidth: 450,
            p: 4,
            borderRadius: 3,
            boxShadow:
            "0 1px 2px rgba(15,23,42,.04), 0 24px 64px rgba(15,23,42,.10)",
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h5">
            Change Password
          </Typography>

          <Typography color="text.secondary">
            Please change your temporary password.
          </Typography>

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            fullWidth
          />

          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            Change Password
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ChangePassword;