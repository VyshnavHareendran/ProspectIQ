import {
    Box,
    Divider,
    Link,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    Email,
    Language,
    Phone,
} from "@mui/icons-material";

export default function ContactCard({ business }) {

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "#fff",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
            >
                Contact Information
            </Typography>

            <Stack spacing={2}>

                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                >

                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: "rgba(124,58,237,0.08)",
                            border: "1px solid",
                            borderColor: "rgba(124,58,237,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <Phone
                            sx={{
                                color: "primary.main",
                            }}
                        />
                    </Box>

                    <Box sx={{ flex: 1 }}>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Phone
                        </Typography>

                        <Typography
                            variant="body1"
                            fontWeight={600}
                        >
                            {business.phone_number}
                        </Typography>

                    </Box>

                </Stack>

                <Divider sx={{ ml: 8 }} />

                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: "rgba(124,58,237,0.08)",
                            border: "1px solid",
                            borderColor: "rgba(124,58,237,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <Email
                            sx={{
                                color: "primary.main",
                            }}
                        />
                    </Box>

                    <Box sx={{ flex: 1 }} >
                        <Typography
                            variant="body1"
                            fontWeight={600}
                        >
                            Email
                        </Typography>

                        <Typography>
                            {business.email || "-"}
                        </Typography>
                    </Box>
                </Stack>

                <Divider sx={{ ml: 8 }} />

                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: "rgba(124,58,237,0.08)",
                            border: "1px solid",
                            borderColor: "rgba(124,58,237,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <Language
                            sx={{
                                color: "primary.main",
                            }}
                        />
                    </Box>

                    <Box sx={{ flex: 1 }} >
                        <Typography variant="caption">
                            Website
                        </Typography>

                        {business.website_url ? (
                            <Link
                                href={business.website_url}
                                target="_blank"
                            >
                                Visit Website
                            </Link>
                        ) : (
                            <Typography>-</Typography>
                        )}
                    </Box>
                </Stack>
                
                <Divider sx={{ ml: 8 }} />

                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                >
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: "rgba(124,58,237,0.08)",
                            border: "1px solid",
                            borderColor: "rgba(124,58,237,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <Language
                            sx={{
                                color: "primary.main",
                            }}
                        />
                    </Box>

                    <Box sx={{ flex: 1 }} >
                        <Typography variant="caption">
                            Address
                        </Typography>

                        <Typography>
                            {business.address}
                        </Typography>

                        <Typography color="text.secondary">
                            {business.city}
                        </Typography>
                    </Box>
                </Stack>

            </Stack>

        </Paper>

    );

}