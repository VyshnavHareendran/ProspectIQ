import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

export default function FollowupCard({
  followups = [],
}) {

  const data = followups;

  if (data.length === 0) {
        return (
            <Card sx={{ height: "100%" }}>
                <CardContent>

                    <Stack spacing={0.5}>
                        <Typography variant="h5">
                            Today's Follow-ups
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Scheduled follow-up calls.
                        </Typography>
                    </Stack>

                    <Typography
                        sx={{ mt: 4 }}
                        color="text.secondary"
                    >
                        No follow-ups scheduled today.
                    </Typography>

                </CardContent>
            </Card>
        );
    }

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>

        <Stack spacing={0.5} mb={2}>
          <Typography variant="h5">
            Today's Follow-ups
          </Typography>

          <Typography
            color="text.secondary"
            variant="body2"
          >
            Scheduled follow-up calls.
          </Typography>
        </Stack>

        <List>

          {data.map((item, index) => (
            <div key={item.id}>

              <ListItem disablePadding>

                <ListItemAvatar>
                  <Avatar>
                    <EventAvailableRoundedIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={item.business}
                  secondary={item.time}
                />

                <Chip
                    label={item.priority}
                    color={
                        item.priority === "HIGH"
                            ? "error"
                            : item.priority === "MEDIUM"
                            ? "warning"
                            : "success"
                    }
                    size="small"
                />

              </ListItem>

              {index !== data.length - 1 && (
                <Divider sx={{ my: 1 }} />
              )}

            </div>
          ))}

        </List>

      </CardContent>
    </Card>
  );
}