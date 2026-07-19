import {
  Box,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { employeeApi } from "../../api/employee/employeeApi";

import MyLeadsTable from "../../components/employee/MyLeadsTable";
import UpdateLeadDialog from "../../components/employee/UpdateLeadDialog";
import BusinessProfileDrawer from "../../components/business/BusinessProfileDrawer";

const MyLeads = () => {

    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [openBusinessDrawer, setOpenBusinessDrawer] = useState(false);

    const loadLeads = async () => {

        try {

            const response =
                await employeeApi.getMyLeads();

            console.log(response.data);

            setLeads(response.data);

        } catch (error) {

            console.error(error);

        }
    };

    const handleUpdate = (lead) => {
        setSelectedLead(lead);
        setOpenDialog(true);
    };

        const handleViewBusiness = (businessId) => {
        setSelectedBusiness(businessId);
        setOpenBusinessDrawer(true);
    };

    
    useEffect(() => {
        const fetchLeads = async () => {
            await loadLeads();
        };

        fetchLeads();
    }, []);

    return (
    <>
        <Box mb={4}>
        <Typography variant="h3" fontWeight={700}>
            My Leads
        </Typography>

        <Typography
            variant="body1"
            color="text.secondary"
            mt={1}
        >
            Manage and update your assigned business leads.
        </Typography>
        </Box>

        <MyLeadsTable
            leads={leads}
            onUpdate={handleUpdate}
            onViewBusiness={handleViewBusiness}
        />

        <UpdateLeadDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            lead={selectedLead}
            onSuccess={loadLeads}
        />

        <BusinessProfileDrawer
            open={openBusinessDrawer}
            businessId={selectedBusiness}
            onClose={() => {
                setOpenBusinessDrawer(false);
                setSelectedBusiness(null);
            }}
        />
    </>
    );

};

export default MyLeads;