import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Button,
} from "@mui/material";

import {
  SettingsCard,
  SettingsHeader,
} from "../../../../components/settings";

import { employeeAppearanceService } from "../../../../services/employeeSettings/appearanceService";

import { useAppTheme } from "../../../../hooks/useAppTheme";


export default function AppearanceTab() {
  const { setMode } = useAppTheme();

  const [settings, setSettings] = useState({
    theme: "light",
  });

  const [loading, setLoading] = useState(false);


  const setValue = (key, value) => {
    if (value !== null) {
      setSettings((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };


  const loadAppearanceSettings = async () => {
    try {
      const response =
        await employeeAppearanceService.getAppearance();

      setSettings({
        theme: response.data.theme,
      });
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    void Promise.resolve().then(
      loadAppearanceSettings
    );
  }, []);


  const handleSave = async () => {
    try {
      setLoading(true);

      await employeeAppearanceService.updateAppearance({
        theme: settings.theme,
      });

      setMode(settings.theme);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box>
      <SettingsHeader
        title="Appearance Settings"
        subtitle="Adjust your workspace theme and interface appearance."
      />

      <SettingsCard>
        <Stack spacing={3}>
          <FormControl>
            <FormLabel
              sx={{
                mb: 1,
                fontWeight: 700,
              }}
            >
              Theme
            </FormLabel>

            <RadioGroup
              row
              value={settings.theme}
              onChange={(event) =>
                setValue(
                  "theme",
                  event.target.value
                )
              }
            >
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />

              <FormControlLabel
                value="dark"
                control={<Radio />}
                label="Dark"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      </SettingsCard>

      <Button
        fullWidth
        variant="contained"
        onClick={handleSave}
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Appearance Settings"}
      </Button>
    </Box>
  );
}