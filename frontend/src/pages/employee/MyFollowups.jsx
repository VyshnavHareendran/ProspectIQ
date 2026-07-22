import { useCallback, useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Container,
    MenuItem,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";

import { followupApi } from "../../api/followup/followupApi";
import BusinessProfileDrawer from "../../components/business/BusinessProfileDrawer";
import FollowupCard from "../../components/followups/FollowupCard";
import FollowupSummaryCards from "../../components/followups/FollowupSummaryCards";
import CloseLeadDialog from "../../components/employee/CloseLeadDialog";
import CallDialog from "../../components/employee/CallDialog";

const Followups = () => {

    const [tab, setTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [followups, setFollowups] = useState([]);

    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [selectedLead, setSelectedLead] = useState(null);

    const [openCloseDialog, setOpenCloseDialog] = useState(false);

    const [selectedLeadToClose, setSelectedLeadToClose] = useState(null);

    const [openCallDialog, setOpenCallDialog] = useState(false);


    const [counts, setCounts] = useState({
        today: 0,
        pending: 0,
        overdue: 0,
    });

    const loadFollowups = useCallback(async () => {

        try {

            setLoading(true);

            const response = await followupApi.getFollowups();

            const data = response.data;

            setCounts(data.stats);

            switch (tab) {

                case 0:
                    setFollowups(data.today);
                    break;

                case 1:
                    setFollowups(data.pending);
                    break;

                case 2:
                    setFollowups(data.overdue);
                    break;

                default:
                    setFollowups(data.today);

            }

        }

        catch (error) {

            console.error("Failed to load follow-ups:", error);

        }

        finally {

            setLoading(false);

        }

    }, [tab]);

    
    useEffect(() => {

        void Promise.resolve().then(loadFollowups);

    }, [loadFollowups]);

    const filteredFollowups = [...followups]
        .filter((followup) => {

            const business = followup.assignment.business;

            return business.business_name
                .toLowerCase()
                .includes(search.toLowerCase());

        })
        .sort((a, b) => {

            switch (sortBy) {

                case "business":
                    return a.assignment.business.business_name.localeCompare(
                        b.assignment.business.business_name
                    );

                default:
                    return new Date(a.latest_call.next_followup_date) -
                        new Date(b.latest_call.next_followup_date);

            }

        });

    return (

        <Container maxWidth="lg" sx={{ py: 4 }}>

            <Box mb={4}>

                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    My Follow-ups
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                >
                    Track your scheduled customer follow-ups and complete them on time.
                </Typography>

            </Box>

            <FollowupSummaryCards counts={counts} />

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 3,
                    flexWrap: "wrap",
                }}
            >

                <TextField
                    placeholder="Search Business..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ flex: 1, minWidth: 260 }}
                />

                <TextField
                    select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{ width: 220 }}
                >

                    <MenuItem value="date">
                        Follow-up Date
                    </MenuItem>

                    <MenuItem value="business">
                        Business Name
                    </MenuItem>

                </TextField>

            </Box>

            <Tabs
                value={tab}
                onChange={(e, value) => setTab(value)}
                variant="fullWidth"
                sx={{
                    mb: 4,
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Tab label="Today" />
                <Tab label="Pending" />
                <Tab label="Overdue" />
            </Tabs>

            {loading ? (

                <Box
                    display="flex"
                    justifyContent="center"
                    py={8}
                >
                    <CircularProgress />
                </Box>

            ) : filteredFollowups.length === 0 ? (

                <Box
                    py={8}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >

                    <Typography variant="h1">
                        📅
                    </Typography>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        mt={2}
                    >
                        You're all caught up!
                    </Typography>

                    <Typography
                        color="text.secondary"
                        mt={1}
                    >
                        No follow-ups available for this category.
                    </Typography>

                </Box>

            ) : (

                <Stack spacing={2}>

                    {filteredFollowups.map((followup) => (

                        <FollowupCard
                            key={followup.assignment.id}
                            followup={followup}
                            onCall={(followup) => {

                                const lead = {

                                    assignment_id: followup.assignment.id,

                                    employee_id: followup.assignment.employee_id,

                                    status: followup.assignment.status,

                                    remarks: followup.assignment.remarks,

                                    call_outcome: followup.assignment.call_outcome,

                                    business_name:
                                        followup.assignment.business.business_name,

                                    phone_number:
                                        followup.assignment.business.phone_number,

                                    email:
                                        followup.assignment.business.email,

                                    website_url:
                                        followup.assignment.business.website_url,

                                    google_maps_link:
                                        followup.assignment.business.google_maps_link,

                                    queue_id: null,

                                };

                                setSelectedLead(lead);

                                setOpenCallDialog(true);

                            }}
                            onViewBusiness={(businessId) => {

                                setSelectedBusiness(businessId);

                                setOpenDrawer(true);

                            }}
                            onComplete={(followup) => {

                                const lead = {

                                    assignment_id: followup.assignment.id,

                                    employee_id: followup.assignment.employee_id,

                                    remarks: followup.assignment.remarks,

                                    business_name:
                                        followup.assignment.business.business_name,

                                };

                                setSelectedLeadToClose(lead);

                                setOpenCloseDialog(true);

                            }}
                        />

                    ))}

                </Stack>

            )}

            <BusinessProfileDrawer
                open={openDrawer}
                onClose={() => {

                    setOpenDrawer(false);
                    setSelectedBusiness(null);

                }}
                businessId={selectedBusiness}
            />

            <CallDialog
                open={openCallDialog}
                lead={selectedLead}
                onClose={() => {

                    setOpenCallDialog(false);

                    setSelectedLead(null);

                }}
                onSuccess={async () => {

                    await loadFollowups();

                }}
            />

            <CloseLeadDialog
                open={openCloseDialog}
                lead={selectedLeadToClose}
                onClose={() => {

                    setOpenCloseDialog(false);

                    setSelectedLeadToClose(null);

                }}
                onSuccess={async () => {

                    await loadFollowups();

                }}
            />

        </Container>

    );

};

export default Followups;
