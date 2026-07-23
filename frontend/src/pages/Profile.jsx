import { Alert, Box, Snackbar, Stack, Typography } from "@mui/material";

import ProfileCard from "../components/profile/ProfileCard";

import useProfile from "../hooks/useProfile";

const Profile = () => {

  const {

    profile,

    loading,

    error,

    setError,

  } = useProfile();

  return (

    <Box p={{ xs: 2, md: 3 }}>

      <Stack spacing={3}>

        <Box>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            My Profile
          </Typography>

          <Typography color="text.secondary">
            View your account information.
          </Typography>

        </Box>

        <ProfileCard
          profile={profile}
          loading={loading}
        />

      </Stack>

      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={() => setError(false)}
      >
        <Alert
          severity="error"
          onClose={() => setError(false)}
        >
          Unable to load profile.
        </Alert>
      </Snackbar>

    </Box>

  );

};

export default Profile;