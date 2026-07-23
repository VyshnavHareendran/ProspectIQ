import { Stack, Typography } from "@mui/material";

const ProfileField = ({
  label,
  value,
}) => {

  return (

    <Stack spacing={0.5}>

      <Typography
        variant="body2"
        color="text.secondary"
        fontWeight={600}
      >
        {label}
      </Typography>

      <Typography variant="body1">
        {value ?? "-"}
      </Typography>

    </Stack>

  );

};

export default ProfileField;