import {
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    Call,
    Event,
    Notes,
} from "@mui/icons-material";

export default function LatestCallCard({
    latestCall,
}) {

    return (

        <Paper
            elevation={1}
            sx={{
                p: 2,
                borderRadius: 2,
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
            >
                Latest Call
            </Typography>

            <Stack spacing={3}>

                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >

                    <Call color="primary" />

                    <div>

                        <Typography variant="caption">
                            Outcome
                        </Typography>

                        <Typography fontWeight={600}>
                            {latestCall?.call_outcome || "-"}
                        </Typography>

                    </div>

                </Stack>

                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >

                    <Notes color="primary" />

                    <div>

                        <Typography variant="caption">
                            Notes
                        </Typography>

                        <Typography>
                            {latestCall?.notes || "-"}
                        </Typography>

                    </div>

                </Stack>

                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >

                    <Event color="primary" />

                    <div>

                        <Typography variant="caption">
                            Next Follow-up
                        </Typography>

                        <Typography>
                            {latestCall?.next_followup_date || "-"}
                        </Typography>

                    </div>

                </Stack>

            </Stack>

        </Paper>

    );

}