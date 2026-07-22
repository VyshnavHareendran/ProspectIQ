import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import {
  FormSection,
  InfoRow,
  SettingsCard,
  SettingsHeader,
} from "../../../../components/settings";

import { authApi } from "../../../../api/auth/authApi";


export default function SecurityTab() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [session, setSession] = useState({
      browser: "",
      operating_system: "",
      ip_address: "",
      last_login: "",
  });

  const strength = useMemo(() => {
    const password = passwords.newPassword;
    let score = 0;

    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;

    return score;
  }, [passwords.newPassword]);

  const strengthLabel =
    strength >= 75 ? "Strong" : strength >= 50 ? "Good" : strength >= 25 ? "Weak" : "Not set";

  const handleChange = (event) => {
    setPasswords((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  
  const validateForm = () => {

    const validationErrors = {};

    if (!passwords.currentPassword.trim()) {
      validationErrors.currentPassword = "Current password is required.";
    }

    if (!passwords.newPassword.trim()) {
      validationErrors.newPassword = "New password is required.";
    }

    if (!passwords.confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm your password.";
    }

    if (
      passwords.newPassword &&
      passwords.confirmPassword &&
      passwords.newPassword !== passwords.confirmPassword
    ) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleUpdatePassword = async () => {

    if (!validateForm()) return;

    try {

      setLoading(true);

      await authApi.changePassword({

        current_password: passwords.currentPassword,

        new_password: passwords.newPassword,

        confirm_password: passwords.confirmPassword,

      });

      setSnackbar({
        open: true,
        severity: "success",
        message: "Password updated successfully.",
      });

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setErrors({});

    } catch (error) {

      setSnackbar({
        open: true,
        severity: "error",
        message:
          error.response?.data?.detail ||
          "Failed to update password.",
      });

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    const loadCurrentSession = async () => {
      try {
        const response = await authApi.getCurrentSession();
        setSession(response.data);
      } catch (error) {
        console.error("Failed to load current session:", error);
      }
    };

    loadCurrentSession();
  }, []);

  const passwordFieldProps = {
    type: showPassword ? "text" : "password",
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            edge="end"
            aria-label="toggle password visibility"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
          </IconButton>
        </InputAdornment>
      ),
    },
  };



  return (
    <Box>
      <SettingsHeader
        title="Security Settings"
        subtitle="Manage password policies, authentication, and device access."
      />

      <Stack spacing={3}>
        <SettingsCard>
          <FormSection
            title="Change Password"
            subtitle="Use a unique password with at least 8 characters."
          >
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Current Password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handleChange}
                  error={!!errors.currentPassword}
                  helperText={errors.currentPassword}
                  {...passwordFieldProps}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} />
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword}
                  {...passwordFieldProps}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  {...passwordFieldProps}
                />
              </Grid>
            </Grid>

            <Box>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Password strength
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  {strengthLabel}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={strength}
                color={strength >= 75 ? "success" : strength >= 50 ? "primary" : "warning"}
                sx={{ height: 8, borderRadius: 999 }}
              />
            </Box>

            <Button
              variant="contained"
              sx={{ alignSelf: "flex-start" }}
              onClick={handleUpdatePassword}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </FormSection>
        </SettingsCard>
        <SettingsCard>
          <FormSection title="Active Sessions">
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              alignItems={{ xs: "flex-start", md: "center" }}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 0 }}>
                <DevicesRoundedIcon color="primary" />
                <Box sx={{ minWidth: 0 }}>
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <Typography variant="subtitle1" fontWeight={700}>
                      Current Device
                    </Typography>
                    <Chip label="Active now" color="success" size="small" />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Chrome on Windows 11
                  </Typography>
                </Box>
              </Stack>
              <Button variant="outlined" color="error" startIcon={<LogoutRoundedIcon />}>
                Logout Other Devices
              </Button>
            </Stack>

            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InfoRow label="Browser" value={session.browser} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InfoRow label="OS" value={session.operating_system} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InfoRow label="IP" value={session.ip_address} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InfoRow label="Last Login" value={session.last_login} />
              </Grid>
            </Grid>
          </FormSection>
        </SettingsCard>
      </Stack>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() =>
            setSnackbar((prev) => ({
              ...prev,
              open: false,
            }))
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
