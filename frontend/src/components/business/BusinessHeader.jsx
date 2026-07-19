import {
    Avatar,
    Box,
    IconButton,
    Typography,
} from "@mui/material";

import {
    Business,
    Close,
    Star,
} from "@mui/icons-material";

export default function BusinessHeader({
    business,
    onClose,
}) {

    return (

        <Box
            sx={{
                position: "relative",
                mb: 3,
            }}
        >

            {/* Close Button */}
            <IconButton
                onClick={onClose}
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,

                    width: 44,
                    height: 44,

                    borderRadius: 2,

                    color: "primary.main",

                    border: "1px solid",

                    borderColor: "primary.main",

                    bgcolor: "rgba(124,58,237,0.06)",

                    transition: "0.2s",

                    "&:hover": {
                        bgcolor: "primary.main",
                        color: "#fff",
                    },
                }}
            >
                <Close fontSize="small" />
            </IconButton>

            {/* Business Info */}
            <Box
                display="flex"
                gap={2}
                alignItems="center"
            >

                <Avatar
                    sx={{
                        width: 60,
                        height: 60,
                        bgcolor: "primary.main",
                    }}
                >
                    <Business />
                </Avatar>

                <Box>

                    <Typography
                        variant="h4"
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

            </Box>

            {/* Rating */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 3,
                }}
            >

                <Star
                    sx={{
                        color: "#F59E0B",
                    }}
                />

                <Typography fontWeight={700}>
                    {business.google_rating}
                </Typography>

                <Typography color="text.secondary">
                    ({business.review_count} Reviews)
                </Typography>

            </Box>

        </Box>

    );

}