import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

export default function RecentActivity({

  activities = [],

}) {

  const data = activities;

  if (data.length === 0) {
    return (
        <Card sx={{ height: "100%" }}>
        <CardContent>

            <Typography variant="h5">
            Recent Activity
            </Typography>

            <Typography
            color="text.secondary"
            sx={{ mt: 3 }}
            >
            No recent activity.
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
            Recent Activity
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Your latest work.
          </Typography>
        </Stack>

        <List>

          {data.map((item, index) => (
            <div key={item.id}>

              <ListItem disablePadding>

                <ListItemAvatar>
                  <Avatar>
                    <HistoryRoundedIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                    primary={`Called ${item.business}`}
                    secondary={`${item.outcome.replace("_", " ")} • ${new Date(
                        item.created_at
                    ).toLocaleString()}`}
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