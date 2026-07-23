import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Grid, Snackbar } from "@mui/material";

import {
  ProfileCard,
  PersonalInformationForm,
  SettingsHeader,
} from "../../../../components/settings";
import useAuth from "../../../../hooks/useAuth";
import { profileService } from "../../../../services/settings";
import { getSettingsErrorMessage } from "../../../../services/settings/errorUtils";


export default function AccountTab() {
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    full_name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    employee_id: "",
    joined_date: "",
    last_login: "",
    avatar_url: "",   // <-- Add this line
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    const loadProfile = async () => {
      try {
        const response = await profileService.getProfile({
          signal: controller.signal,
        });
        const profile = response.data;
        const [firstName = "", ...rest] = profile.full_name.split(" ");

        if (active) {
          setFormData({
            firstName,
            lastName: rest.join(" "),
            full_name: profile.full_name,
            email: profile.email,
            phone: profile.phone || "",
            department: profile.department || "",
            designation: profile.designation || "",
            employee_id: profile.employee_id || "",
            joined_date: profile.created_at
              ? new Date(profile.created_at).toLocaleDateString()
              : "N/A",
            last_login: profile.last_login || "Current session",
            avatar_url: profile.avatar_url || "",
          });
        }
      } catch (error) {
        if (active && error.name !== "CanceledError") {
          setFeedback({
            severity: "error",
            message: getSettingsErrorMessage(error, "Unable to load profile."),
          });
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Maximum file size = 2 MB
    if (file.size > 2 * 1024 * 1024) {
      setFeedback({
        severity: "error",
        message: "Profile photo must be smaller than 2 MB.",
      });
      return;
    }

    try {
      const response = await profileService.uploadProfilePhoto(file);

      setFormData((prev) => ({
        ...prev,
        avatar_url: response.data.avatar_url,
      }));

      setFeedback({
        severity: "success",
        message: "Profile photo updated successfully.",
      });
    } catch (error) {
      setFeedback({
        severity: "error",
        message: getSettingsErrorMessage(
          error,
          "Unable to upload profile photo."
        ),
      });
    }
  };

  const handlePhotoReset = async () => {
    try {
      const response = await profileService.resetProfilePhoto();

      setFormData((prev) => ({
        ...prev,
        avatar_url: response.data.avatar_url || "",
      }));

      await refreshUser();

      setFeedback({
        severity: "success",
        message: "Profile photo reset successfully.",
      });
    } catch (error) {
      setFeedback({
        severity: "error",
        message: getSettingsErrorMessage(
          error,
          "Unable to reset profile photo."
        ),
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const response = await profileService.updateProfile({
        full_name: fullName,
        phone: formData.phone,
        department: formData.department,
        designation: formData.designation,
      });

      setFormData((prev) => ({
        ...prev,
        full_name: response.data.full_name,
      }));
      await refreshUser();
      setFeedback({
        severity: "success",
        message: "Profile updated successfully.",
      });
    } catch (error) {
      setFeedback({
        severity: "error",
        message: getSettingsErrorMessage(error, "Unable to update profile."),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <SettingsHeader
        title="Account Settings"
        subtitle="Manage your profile information and account preferences."
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 4 }}>
            <ProfileCard
              user={formData}
              onPhotoUpload={handlePhotoUpload}
              onPhotoReset={handlePhotoReset}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 8 }}>
            <PersonalInformationForm
              formData={formData}
              handleChange={handleChange}
              onSubmit={handleSave}
              saving={saving}
            />
          </Grid>
        </Grid>
      )}

      <Snackbar
        open={Boolean(feedback)}
        autoHideDuration={4000}
        onClose={() => setFeedback(null)}
      >
        {feedback ? (
          <Alert severity={feedback.severity} onClose={() => setFeedback(null)}>
            {feedback.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Box>
  );
}
