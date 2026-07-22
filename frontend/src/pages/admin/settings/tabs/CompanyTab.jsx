import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import {
  FormSection,
  SettingsCard,
  SettingsHeader,
} from "../../../../components/settings";

import { Snackbar, Alert } from "@mui/material";

import { settingsApi } from "../../../../api/admin/settingsApi";

export default function CompanyTab() {
  const [company, setCompany] = useState({
      name: "",
      industry: "",
      website: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
      timezone: "",
      currency: "",
      businessHours: "",
  });

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
      open: false,
      severity: "success",
      message: "",
  });

  const handleChange = (event) => {
    setCompany((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const loadCompany = async () => {

      try {

          const response = await settingsApi.getCompany();

          setCompany(response.data);

      } catch (error) {

          console.error(error);

      }

  };

  useEffect(() => {

      void Promise.resolve().then(loadCompany);

  }, []);

  const handleSave = async () => {

      try {

          setLoading(true);

          await settingsApi.updateCompany(company);

          setSnackbar({
              open: true,
              severity: "success",
              message: "Company settings updated successfully.",
          });

      } catch (error) {

          setSnackbar({
              open: true,
              severity: "error",
              message:
                  error.response?.data?.detail ||
                  "Failed to update company settings.",
          });

      } finally {

          setLoading(false);

      }

  };

  return (
    <Box>
      <SettingsHeader
        title="Company Settings"
        subtitle="Maintain company identity, locale, and business operating details."
      />

      <SettingsCard>
        <Stack spacing={3}>
          <FormSection title="Company Information">
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Company Name" name="name" value={company.name} onChange={handleChange} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Industry" name="industry" value={company.industry} onChange={handleChange} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Website" name="website" value={company.website} onChange={handleChange} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Phone" name="phone" value={company.phone} onChange={handleChange} />
              </Grid>
              <Grid size={12}>
                <TextField fullWidth multiline minRows={3} label="Address" name="address" value={company.address} onChange={handleChange} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField fullWidth label="City" name="city" value={company.city} onChange={handleChange} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField fullWidth label="State" name="state" value={company.state} onChange={handleChange} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField fullWidth label="Country" name="country" value={company.country} onChange={handleChange} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField select fullWidth label="Timezone" name="timezone" value={company.timezone} onChange={handleChange}>
                  <MenuItem value="Asia/Kolkata">Asia/Kolkata</MenuItem>
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="America/New_York">America/New York</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField select fullWidth label="Currency" name="currency" value={company.currency} onChange={handleChange}>
                  <MenuItem value="INR">INR</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                    fullWidth
                    label="Business Hours"
                    name="business_hours"
                    value={company.business_hours}
                    onChange={handleChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
              </Grid>
            </Grid>
          </FormSection>

          <Button
              variant="contained"
              size="large"
              onClick={handleSave}
              disabled={loading}
          >
              {loading
                  ? "Saving..."
                  : "Save Company Settings"}
          </Button>
        </Stack>
      </SettingsCard>
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
          >
              {snackbar.message}
          </Alert>
      </Snackbar>

    </Box>
  );
}
