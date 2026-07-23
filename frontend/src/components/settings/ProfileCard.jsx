import {
  Avatar,
  Chip,
  Stack,
  Typography,
  Divider,
  Button,
} from "@mui/material";

import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { InfoRow, SettingsCard } from ".";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function ProfileCard({
    user,
    onPhotoUpload,
    onPhotoReset,
  }) {
  const initials = `${user.firstName?.[0] || user.full_name?.[0] || ""}${user.lastName?.[0] || ""}`;
  const displayName = user.full_name || `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return (
    <SettingsCard
      sx={{
        p: { xs: 2.5, sm: 3 },
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
      >
        <Avatar
            src={
              user.avatar_url
                ? `${API_BASE_URL}${user.avatar_url}`
                : undefined
            }
          sx={{
            width: 90,
            height: 90,
            fontSize: 30,
            bgcolor: "primary.main",
          }}
        >
          {initials || "U"}
        </Avatar>

        <Typography
          variant="h6"
          fontWeight={700}
        >
          {displayName}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {user.email}
        </Typography>

        <Chip
          label={user.designation}
          color="primary"
          size="small"
        />

        <Divider flexItem sx={{ my: 1 }} />

            <InfoRow
            label="Department"
            value={user.department}
            />

            <InfoRow
            label="Employee ID"
            value={user.employee_id || "N/A"}
            />

            <InfoRow
            label="Joined Date"
            value={user.joined_date || "N/A"}
            />

            <InfoRow
            label="Last Login"
            value={user.last_login || "Current session"}
            />

            <Divider flexItem sx={{ my: 1 }} />

            <Button
              fullWidth
              variant="outlined"
              component="label"
              startIcon={<PhotoCameraRoundedIcon />}
            >
              Change Profile Photo

              <input
                hidden
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={onPhotoUpload}
              />
              </Button>
              {onPhotoReset && user.avatar_url && (
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlineRoundedIcon />}
                  onClick={onPhotoReset}
                >
                  Reset Profile Photo
                </Button>
              )}
      </Stack>
    </SettingsCard>
  );
}
