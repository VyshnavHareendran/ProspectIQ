import {
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import TodayIcon from "@mui/icons-material/Today";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const cards = [
    {
        title: "Today's Follow-ups",
        valueKey: "today",
        icon: <TodayIcon color="warning" />,
    },
    {
        title: "Pending",
        valueKey: "pending",
        icon: <ScheduleIcon color="info" />,
    },
    {
        title: "Overdue",
        valueKey: "overdue",
        icon: <WarningAmberIcon color="error" />,
    },
];

const FollowupSummaryCards = ({ counts }) => {
    return (
        <Grid container spacing={2} mb={3}>
            {cards.map((card) => (
                <Grid key={card.valueKey} size={{ xs: 12, md: 4 }}>
                    <Card
                        elevation={0}
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                        }}
                    >
                        <CardContent>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <div>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {card.title}
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        fontWeight={700}
                                    >
                                        {counts[card.valueKey]}
                                    </Typography>
                                </div>

                                {card.icon}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default FollowupSummaryCards;