import { useEffect, useState } from "react";

import {
    Drawer,
    Box,
    Typography,
    Divider,
    CircularProgress,
} from "@mui/material";


import BusinessHeader from "./BusinessHeader";
import ContactCard from "./ContactCard";
import LeadCard from "./LeadCard";
import LatestCallCard from "./LatestCallCard";

import businessProfileApi from "../../api/business/businessProfileApi";


export default function BusinessProfileDrawer({
    open,
    onClose,
    businessId,
}) {

const [loading, setLoading] = useState(false);

const [profile, setProfile] = useState(null);

useEffect(() => {

    if (!open || !businessId) return;

    const loadProfile = async () => {

        try {

            setLoading(true);

            const response =
                await businessProfileApi.getProfile(
                    businessId
                );

            setProfile(response.data);

        }

        finally {

            setLoading(false);

        }

    };

    loadProfile();

}, [open, businessId]);


return (
    <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
            sx: {
                width: 420,
                position: "relative",
            },
        }}
    >
        <Box
            sx={{
                width: 420,
                p: 3,
                height: "100%",
                overflowY: "auto",
            }}
        >
            {loading ? (
                <CircularProgress />
            ) : !profile ? (
                <Typography>No profile found.</Typography>
            ) : (

                <Box>

                        <BusinessHeader
                            business={profile.business}
                            onClose={onClose}
                        />

                        <Divider sx={{ mb: 2 }} />

                        <ContactCard
                            business={profile.business}
                        />

                        <Divider sx={{ my: 3 }} />

                        <LeadCard
                            leadScore={profile.lead_score}
                            assignment={profile.assignment}
                        />

                        <Divider sx={{ my: 3 }} />

                        <LatestCallCard
                            latestCall={profile.latest_call}
                        />

                </Box>

            )}
            
        </Box>
    </Drawer>
);

}