import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

import { Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import WelcomeCard from "../../components/dashboard/WelcomeCard";
import StatCard from "../../components/dashboard/StatCard";
import QuickActionCard from "../../components/dashboard/QuickActionCard";
import AssignedLeadsTable from "../../components/employee/dashboard/AssignedLeadsTable";
import WeeklyCallsChart from "../../components/employee/dashboard/WeeklyCallsChart";
import PerformanceCard from "../../components/employee/dashboard/PerformanceCard";
import FollowupCard from "../../components/employee/dashboard/FollowupCard";
import RecentActivity from "../../components/employee/dashboard/RecentActivity";
import { employeeApi } from "../../api/employee/employeeApi";
import { routePaths } from "../../routes/routePaths";

import useAuth from "../../hooks/useAuth";

const quickActions = [
  {
    title: "My Leads",
    description: "View your assigned businesses.",
    icon: AssignmentRoundedIcon,
    to: routePaths.employeeMyLeads,
  },
  {
    title: "Start Calling",
    description: "Begin today's calling tasks.",
    icon: PhoneRoundedIcon,
    to: routePaths.employeeTodaysCalls,
  },
  {
    title: "Today's Follow-ups",
    description: "Open today's scheduled follow-ups.",
    icon: EventRoundedIcon,
    to: routePaths.employeeMyFollowups,
  },
  {
    title: "Call History",
    description: "Review previous call logs.",
    icon: HistoryRoundedIcon,
    to: routePaths.employeeMyCallLogs,
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  const [now, setNow] = useState(new Date());
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  
  const loadDashboard = async () => {

    try {

        setLoading(true);

        const response = await employeeApi.getDashboard();

        setDashboard(response.data);

    } catch (err) {

        console.error(err);

        setError("Failed to load dashboard.");

    } finally {

        setLoading(false);

    }

    };

  useEffect(() => {

    void Promise.resolve().then(loadDashboard);

    const interval = setInterval(() => {

        setNow(new Date());

    }, 1000);

    return () => clearInterval(interval);

  }, []);

  const stats = dashboard
    ? [
        {
            title: "Assigned Leads",
            value: dashboard.stats.assigned_leads,
            helperText: "Businesses assigned to you",
            icon: AssignmentTurnedInRoundedIcon,
        },
        {
            title: "High Priority",
            value: dashboard.stats.high_priority,
            helperText: "Urgent leads",
            icon: LocalFireDepartmentRoundedIcon,
        },
        {
            title: "Calls Today",
            value: dashboard.stats.calls_today,
            helperText: "Calls completed today",
            icon: CallRoundedIcon,
        },
        {
            title: "Today's Follow-ups",
            value: dashboard.stats.followups,
            helperText: "Pending follow-ups",
            icon: EventAvailableRoundedIcon,
        },
        {
            title: "Closed Leads",
            value: dashboard.stats.closed_leads,
            helperText: "Completed leads",
            icon: CheckCircleRoundedIcon,
        },
        {
            title: "Average Lead Score",
            value: dashboard.stats.average_score.toFixed(1),
            helperText: "Average ML score",
            icon: StarRoundedIcon,
        },
        ]
    : [];

  const assignedLeads = dashboard?.assigned_leads || [];

  if (loading) {

    return <Typography>Loading dashboard...</Typography>;

    }

    if (error) {

    return (
        <Typography color="error">
        {error}
        </Typography>
    );

  }

  return (
    <Stack spacing={3}>
      <WelcomeCard
        now={now}
        user={user}
      />

      <Grid container spacing={2.5}>
        {stats.map((stat) => (
          <Grid
            key={stat.title}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              xl: 2,
            }}
          >
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Stack spacing={2}>
        <Stack spacing={0.5}>
          <Typography variant="h3">
            Quick Actions
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Shortcuts to your daily work.
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          {quickActions.map((action) => (
            <Grid
              key={action.title}
              size={{
                xs: 12,
                sm: 6,
                lg: 3,
              }}
            >
              <QuickActionCard {...action} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2.5}>

          <Grid
                size={{
                xs: 12,
                }}
          >
                <AssignedLeadsTable
                    rows={assignedLeads}
                />
          </Grid>          

        </Grid>

        <Grid container spacing={2.5}>

            <Grid
                size={{
                    xs:12,
                    lg:8,
                }}
            >
                <WeeklyCallsChart
                    data={dashboard?.weekly_calls || []}
                />
            </Grid>

            <Grid
                size={{
                    xs:12,
                    lg:4,
                }}
            >
                <PerformanceCard

                    completed={dashboard?.stats.calls_today ?? 0}

                    target={20}

                />
            </Grid>

        </Grid>

        <Grid container spacing={2.5}>

            <Grid
                size={{
                xs: 12,
                lg: 6,
                }}
            >
                <FollowupCard
                    followups={dashboard?.followups || []}
                />
            </Grid>

            <Grid
                size={{
                xs: 12,
                lg: 6,
                }}
            >
                <RecentActivity
                    activities={dashboard?.activities || []}
                />
            </Grid>

        </Grid>

      </Stack>
    </Stack>
  );
}
