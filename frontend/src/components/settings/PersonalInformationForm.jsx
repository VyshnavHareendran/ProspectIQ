import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { FormSection, SettingsCard } from ".";

export default function PersonalInformationForm({
  formData,
  handleChange,
  onSubmit,
  saving = false,
}) {
  return (
    <SettingsCard>
      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
      >
        Personal Information
      </Typography>

      <FormSection title="Basic Details">
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email"
              value={formData.email}
              disabled
              helperText="Email address cannot be changed."
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </FormSection>

      <Box sx={{ mt: 3 }}>
        <FormSection title="Organization" divider>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </FormSection>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Changes are saved to your account profile.
        </Typography>

        <Button
          variant="contained"
          size="large"
          disabled={saving}
          onClick={onSubmit}
          sx={{
            minWidth: 180,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </SettingsCard>
  );
}
