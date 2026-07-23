import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ProfileField from "./ProfileField";

const ProfileCard = ({
  profile,
  loading,
}) => {

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography>
            Loading profile...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">
            Unable to load profile.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (

    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>

        <Stack
          spacing={2}
          alignItems="center"
        >

          <Avatar
            sx={{
              width: 88,
              height: 88,
              bgcolor: "primary.main",
            }}
          >
            <PersonRoundedIcon fontSize="large" />
          </Avatar>

          <Typography
            variant="h5"
            fontWeight={700}
          >
            {profile.full_name}
          </Typography>

          <Chip
            color="primary"
            label={profile.role}
          />

        </Stack>

        <Divider
          sx={{
            my: 3,
          }}
        />

        <Grid
          container
          spacing={3}
        >

          <Grid size={{ xs: 12, md: 6 }}>
            <ProfileField
              label="Full Name"
              value={profile.full_name}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ProfileField
              label="Email"
              value={profile.email}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ProfileField
              label="Role"
              value={profile.role}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ProfileField
              label="Status"
              value={
                profile.is_active
                  ? "Active"
                  : "Inactive"
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ProfileField
              label="User ID"
              value={profile.id}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ProfileField
              label="Joined On"
              value={
                new Date(
                  profile.created_at
                ).toLocaleDateString()
              }
            />
          </Grid>

        </Grid>

      </CardContent>
    </Card>

  );

};

export default ProfileCard;