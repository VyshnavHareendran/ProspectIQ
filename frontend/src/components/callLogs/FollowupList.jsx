import {
  Card,
  CardContent,
  Grid,
  Typography,
  Stack,
} from "@mui/material";

import CallStatusChip from "./CallStatusChip";

const FollowupList = ({
  title,
  followups = [],
  businessById = {},
}) => {
  return (
    <>
      <Typography
        variant="h6"
        sx={{ mt: 4, mb: 2 }}
      >
        {title}
      </Typography>

      <Grid container spacing={2}>
        {followups.length === 0 ? (
          <Grid size={12}>
            <Typography color="text.secondary">
              No follow-ups available.
            </Typography>
          </Grid>
        ) : (
          followups.map((item) => (
            <Grid
              key={item.id}
              size={{
                xs: 12,
                md: 6,
                lg: 4,
              }}
            >
              <Card>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2">
                      Business
                    </Typography>

                    <Typography>
                      {businessById[item.business_id]?.business_name || item.business_id}
                    </Typography>

                    <CallStatusChip
                      status={item.call_status}
                    />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Follow-up:
                      {" "}
                      {item.next_followup_date}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default FollowupList;
