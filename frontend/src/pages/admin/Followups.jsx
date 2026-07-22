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

import { callLogApi } from "../../api/callLog/callLogApi";
import BusinessProfileDrawer from "../../components/business/BusinessProfileDrawer";
import FollowupCard from "../../components/followups/FollowupCard";
import FollowupSummaryCards from "../../components/followups/FollowupSummaryCards";
import CompleteFollowupDialog from "../../components/followups/CompleteFollowupDialog";

const Followups = () => {

    const [tab, setTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [followups, setFollowups] = useState([]);

    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [employeeFilter] = useState("all");
    const [openCompleteDialog, setOpenCompleteDialog] = useState(false);
    const [selectedFollowup, setSelectedFollowup] = useState(null);
    
    const [counts, setCounts] = useState({
        today: 0,
        pending: 0,
        overdue: 0,
    });

    const loadFollowups = useCallback(async () => {

        try {

            setLoading(true);

            const [
                todayResponse,
                pendingResponse,
                overdueResponse,
            ] = await Promise.all([
                callLogApi.getTodayFollowups(),
                callLogApi.getPendingFollowups(),
                callLogApi.getOverdueFollowups(),
            ]);

            setCounts({
                today: todayResponse.data.length,
                pending: pendingResponse.data.length,
                overdue: overdueResponse.data.length,
            });

            switch (tab) {

                case 0:
                    setFollowups(todayResponse.data);
                    break;

                case 1:
                    setFollowups(pendingResponse.data);
                    break;

                case 2:
                    setFollowups(overdueResponse.data);
                    break;

                default:
                    setFollowups(todayResponse.data);

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

            const business = followup.lead_assignment.business;

            return business.business_name
                .toLowerCase()
                .includes(search.toLowerCase());

        })
        .filter((followup) => {

            if (employeeFilter === "all") {
                return true;
            }

            return (
                followup.employee.id.toString() === employeeFilter
            );

        })
        .sort((a, b) => {

            switch (sortBy) {

                case "business":
                    return a.lead_assignment.business.business_name.localeCompare(
                        b.lead_assignment.business.business_name
                    );

                case "employee":
                    return a.employee.full_name.localeCompare(
                        b.employee.full_name
                    );

                default:
                    return new Date(a.next_followup_date) -
                        new Date(b.next_followup_date);

            }

        });

    return (

        <Container maxWidth="lg" sx={{ py: 4 }}>

            <Box mb={4}>

                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    Follow-ups
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                >
                    Track scheduled customer follow-ups and stay on top of pending calls.
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

                    <MenuItem value="employee">
                        Employee Name
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
                            key={followup.id}
                            followup={followup}
                            showActions={false}
                            onViewBusiness={(businessId) => {

                                setSelectedBusiness(businessId);
                                setOpenDrawer(true);

                            }}
                            onComplete={(followup) => {

                                setSelectedFollowup(followup);
                                setOpenCompleteDialog(true);

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

            <CompleteFollowupDialog
                open={openCompleteDialog}
                followup={selectedFollowup}
                onClose={() => {
                    setOpenCompleteDialog(false);
                    setSelectedFollowup(null);
                }}
                onSaved={async () => {
                    await loadFollowups();
                }}
            />

        </Container>

    );

};

export default Followups;
