import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useState } from "react";
import toast from "react-hot-toast";

import { useSubmitSingleReportMutation } from "../redux/api";

const SubmitReport = () => {
  const [formData, setFormData] = useState({
    ngoId: "",
    month: "",
    peopleHelped: "",
    eventsConducted: "",
    fundsUtilized: "",
  });

  const [submitSingleReport, { isLoading }] = useSubmitSingleReportMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } =
      formData;

    if (
      !ngoId ||
      !month ||
      !peopleHelped ||
      !eventsConducted ||
      !fundsUtilized
    ) {
      return toast.error("All fields are required");
    }

    try {
      await submitSingleReport({
        ngoId,
        month,
        peopleHelped: Number(peopleHelped),
        eventsConducted: Number(eventsConducted),
        fundsUtilized: Number(fundsUtilized),
      }).unwrap();

      toast.success("Report submitted successfully");

      setFormData({
        ngoId: "",
        month: "",
        peopleHelped: "",
        eventsConducted: "",
        fundsUtilized: "",
      });
    } catch (err) {
      toast.error(err?.data?.msg || "Failed to submit report");
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #f7f9fc 0%, #eef2f7 100%)",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Container maxWidth="sm" sx={{ py: { xs: 5, md: 8 } }}>
        <Card elevation={6} sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {/* Header */}
            <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  backgroundColor: "rgba(42,82,152,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2a5298",
                }}
              >
                <PostAddIcon />
              </Box>

              <Typography variant="h5" fontWeight={700}>
                Submit NGO Report
              </Typography>
            </Stack>

            <Typography color="text.secondary" mb={4}>
              Enter monthly NGO performance details below.
            </Typography>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="NGO ID"
                    name="ngoId"
                    value={formData.ngoId}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Month"
                    type="month"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="People Helped"
                    type="number"
                    name="peopleHelped"
                    value={formData.peopleHelped}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Events Conducted"
                    type="number"
                    name="eventsConducted"
                    value={formData.eventsConducted}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Funds Utilized"
                    type="number"
                    name="fundsUtilized"
                    value={formData.fundsUtilized}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isLoading}
                    sx={{
                      py: 1.3,
                      fontWeight: 600,
                      borderRadius: 2,
                    }}
                  >
                    {isLoading ? "Submitting..." : "Submit Report"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SubmitReport;
