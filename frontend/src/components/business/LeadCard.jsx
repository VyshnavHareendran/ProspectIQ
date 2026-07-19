import {
    Chip,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

const getPriorityColor = (priority) => {

    switch (priority) {

        case "HIGH":
            return "error";

        case "MEDIUM":
            return "warning";

        case "LOW":
            return "success";

        default:
            return "default";

    }

};

export default function LeadCard({

    leadScore,
    assignment,

}) {

    return (

        <Paper
            elevation={1}
            sx={{
                p: 2,
                borderRadius: 2,
                mb: 3,
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
            >
                Lead Information
            </Typography>

            <Grid container spacing={2}>

                <Grid size={6}>

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            textAlign: "center",
                        }}
                    >

                        <Typography
                            variant="caption"
                        >
                            Lead Score
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {leadScore?.lead_score ?? "-"}
                        </Typography>

                    </Paper>

                </Grid>

                <Grid size={6}>

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            textAlign: "center",
                        }}
                    >

                        <Typography
                            variant="caption"
                        >
                            Priority
                        </Typography>

                        <Stack
                            mt={1}
                            alignItems="center"
                        >

                            <Chip
                                label={
                                    leadScore?.priority || "-"
                                }
                                color={getPriorityColor(
                                    leadScore?.priority
                                )}
                            />

                        </Stack>

                    </Paper>

                </Grid>

            </Grid>

            <Stack spacing={2} mt={3}>

                <div>

                    <Typography variant="caption">
                        Assigned To
                    </Typography>

                    <Typography fontWeight={600}>
                        {assignment?.employee_name || "-"}
                    </Typography>

                </div>

                <div>

                    <Typography variant="caption">
                        Status
                    </Typography>

                    <Typography fontWeight={600}>
                        {assignment?.status || "-"}
                    </Typography>

                </div>

            </Stack>

        </Paper>

    );

}