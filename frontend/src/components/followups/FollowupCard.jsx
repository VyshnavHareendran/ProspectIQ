import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import CallIcon from "@mui/icons-material/Call";
import EventIcon from "@mui/icons-material/Event";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import FollowupStatusChip from "./FollowupStatusChip";

const FollowupCard = ({
    followup,
    onViewBusiness,
    onComplete,
    onCall,
    showActions = true,
}) => {

    const assignment =
        followup.assignment ?? followup.lead_assignment;
    const latestCall = followup.latest_call ?? followup;
    const business = assignment?.business;

    if (!business) {
        return null;
    }

    return (

        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                transition: "0.25s",
                cursor: "pointer",

                "&:hover": {
                    boxShadow: 3,
                    transform: "translateY(-2px)",
                },
            }}
        >

            <CardContent sx={{ p: 3 }}>

                {/* Header */}

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >

                    <Stack
                        direction="row"
                        spacing={2}
                    >

                        <Avatar
                            sx={{
                                width: 58,
                                height: 58,
                                bgcolor: "primary.main",
                            }}
                        >
                            <BusinessIcon />
                        </Avatar>

                        <Box>

                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                {business.business_name}
                            </Typography>

                            <Typography
                                color="text.secondary"
                            >
                                {business.category}
                            </Typography>

                        </Box>

                    </Stack>

                    <FollowupStatusChip
                        date={latestCall?.next_followup_date}
                    />

                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Information */}

                <Stack spacing={2}>

                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                    >

                        <PhoneOutlinedIcon color="primary" />

                        <Typography>

                            {business.phone_number}

                        </Typography>

                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                    >

                        <LocationOnOutlinedIcon color="primary" />

                        <Typography>

                            {business.city}

                        </Typography>

                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Outcome
                            </Typography>

                            <Box mt={0.5}>

                                <Chip
                                    label={latestCall?.call_outcome ?? "Unknown"}
                                    color="primary"
                                    variant="outlined"
                                />

                            </Box>

                        </Box>

                        <Box textAlign="right">

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Next Follow-up
                            </Typography>

                            <Box mt={0.5}>

                                <FollowupStatusChip
                                    date={latestCall?.next_followup_date}
                                />

                            </Box>

                        </Box>

                    </Stack>

                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Footer */}

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                    spacing={2}
                >
                    {showActions ? (
                        <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                        >
                            <Button
                                size="small"
                                startIcon={<CallIcon />}
                                variant="outlined"
                                onClick={() => onCall?.(followup)}
                            >
                                Call
                            </Button>

                            <Button
                                size="small"
                                startIcon={<EventIcon />}
                                variant="outlined"
                                onClick={() => {

                                }}
                            >
                                Reschedule
                            </Button>

                            <Button
                                size="small"
                                startIcon={<CheckCircleIcon />}
                                color="success"
                                variant="outlined"
                                onClick={() => onComplete?.(followup)}
                            >
                                Complete
                            </Button>
                        </Stack>
                    ) : (
                        <Box />
                    )}

                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() =>
                            onViewBusiness(business.id)
                        }
                    >
                        View Business
                    </Button>

                </Stack>

            </CardContent>

        </Card>

    );

};

export default FollowupCard;
