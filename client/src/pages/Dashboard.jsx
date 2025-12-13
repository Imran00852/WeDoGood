import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  TextField,
  Divider,
  Skeleton,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useState } from "react";

import { useGetDashboardStatsQuery } from "../redux/api";

const Dashboard = () => {
  const [month, setMonth] = useState("2025-06");

  const {
    data: response,
    isLoading,
    isError,
  } = useGetDashboardStatsQuery(month);

  const stats = response?.data ?? {};

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #f7f9fc 0%, #eef2f7 100%)",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={3}
          mb={5}
        >
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Admin Dashboard
            </Typography>
            <Typography color="text.secondary">
              Aggregated NGO performance overview
            </Typography>
          </Box>

          <TextField
            type="month"
            label="Select Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            sx={{ minWidth: 200 }}
          />
        </Stack>

        {/* Error */}
        {isError && (
          <Typography color="error" mb={3}>
            Failed to load dashboard data
          </Typography>
        )}

        {/* Stats Cards */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="NGOs Reporting"
              value={
                typeof stats.totalNGOsReporting === "number"
                  ? stats.totalNGOsReporting
                  : "—"
              }
              icon={<ApartmentIcon />}
              loading={isLoading}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="People Helped"
              value={
                typeof stats.totalPeopleHelped === "number"
                  ? stats.totalPeopleHelped.toLocaleString()
                  : "—"
              }
              icon={<PeopleIcon />}
              loading={isLoading}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Events Conducted"
              value={
                typeof stats.totalEventsConducted === "number"
                  ? stats.totalEventsConducted
                  : "—"
              }
              icon={<EventIcon />}
              loading={isLoading}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Funds Utilized"
              value={
                typeof stats.totalFundsUtilized === "number"
                  ? `₹ ${stats.totalFundsUtilized.toLocaleString()}`
                  : "—"
              }
              icon={<AccountBalanceWalletIcon />}
              loading={isLoading}
            />
          </Grid>
        </Grid>

        {/* Footer */}
        <Divider sx={{ my: 6 }} />

        <Typography variant="body2" color="text.secondary">
          Showing aggregated data for <strong>{month}</strong>. Data refreshes
          automatically when reports are updated.
        </Typography>
      </Container>
    </Box>
  );
};

const StatCard = ({ title, value, icon, loading }) => {
  return (
    <Card
      elevation={6}
      sx={{
        borderRadius: 4,
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 10,
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "rgba(42,82,152,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2a5298",
            }}
          >
            {icon}
          </Box>

          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>

          {loading ? (
            <Skeleton width={80} height={32} />
          ) : (
            <Typography variant="h5" fontWeight={700}>
              {value}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
