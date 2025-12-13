import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #f7f9fc 0%, #eef2f7 100%)",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        {/* Hero Section */}
        <Stack spacing={2.5} maxWidth={720} mb={{ xs: 5, md: 8 }}>
          <Typography variant={isMobile ? "h4" : "h3"} fontWeight={700}>
            NGO Impact Reporting Platform
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary"
          >
            Submit reports, process bulk NGO data asynchronously, and visualize
            real-world impact through a unified dashboard.
          </Typography>
        </Stack>

        {/* Feature Cards */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<PostAddIcon />}
              title="Submit Report"
              description="Quickly add individual monthly NGO reports with validation."
              action={() => navigate("/submit")}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<UploadFileIcon />}
              title="Upload CSV"
              description="Upload large CSV files and track background processing in real time."
              action={() => navigate("/upload")}
              highlighted
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<AssessmentIcon />}
              title="Dashboard"
              description="View aggregated NGO metrics by month in a clean dashboard."
              action={() => navigate("/dashboard")}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const FeatureCard = ({ icon, title, description, action, highlighted }) => {
  return (
    <Card
      elevation={highlighted ? 8 : 3}
      sx={{
        height: "100%",
        borderRadius: 4,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.35s ease",
        border: highlighted ? "2px solid #2a5298" : "none",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 10,
        },
        "&::before": highlighted
          ? {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(120deg, rgba(42,82,152,0.08), rgba(42,82,152,0))",
            }
          : {},
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            color: "#2a5298",
            fontSize: 42,
            mb: 2,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "rgba(42,82,152,0.1)",
          }}
        >
          {icon}
        </Box>

        <Typography variant="h5" fontWeight={600} gutterBottom>
          {title}
        </Typography>

        <Typography color="text.secondary" mb={3}>
          {description}
        </Typography>

        <Button
          variant={highlighted ? "contained" : "outlined"}
          size="medium"
          onClick={action}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};

export default Home;
