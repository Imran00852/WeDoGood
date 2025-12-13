import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  LinearProgress,
  Divider,
  Chip,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import {
  useSubmitBulkReportsMutation,
  useGetJobStatusQuery,
} from "../redux/api";

const UploadCSV = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState(null);

  // Upload mutation
  const [submitBulkReports, { isLoading: isUploading }] =
    useSubmitBulkReportsMutation();

  /**
   * Job status polling
   * NOTE:
   * - Poll only when jobId exists
   * - Stop polling automatically when status === "completed"
   */
  const { data: jobStatus, isFetching: isPolling } = useGetJobStatusQuery(
    jobId,
    {
      skip: !jobId,
      pollingInterval: 2000,
    }
  );

  const isCompleted = jobStatus?.data?.status === "completed";

  // Stop polling once completed
  useGetJobStatusQuery(jobId, {
    skip: !jobId || isCompleted,
    pollingInterval: 2000,
  });

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".csv")) {
      toast.error("Please upload a CSV file");
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      return toast.error("Please select a CSV file first");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await submitBulkReports(formData).unwrap();
      setJobId(res.jobId || res.data?.jobId);
      toast.success("CSV uploaded successfully");
    } catch (err) {
      toast.error(err?.data?.msg || "Failed to upload CSV");
    }
  };

  const total = jobStatus?.data?.totalRecords || 0;
  const processed = jobStatus?.data?.processedRecords || 0;
  const failed = jobStatus?.data?.failedRecords || 0;

  const progress = total > 0 ? Math.round((processed / total) * 100) : 0;

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
            <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
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
                <UploadFileIcon />
              </Box>

              <Typography variant="h5" fontWeight={700}>
                Upload CSV Reports
              </Typography>
            </Stack>

            <Typography color="text.secondary" mb={4}>
              Upload a CSV file. Processing runs asynchronously in the
              background.
            </Typography>

            {/* Upload Box */}
            <Box
              sx={{
                border: "2px dashed #c5d0e6",
                borderRadius: 3,
                p: 4,
                textAlign: "center",
                mb: 4,
                backgroundColor: "#fdfefe",
              }}
            >
              <UploadFileIcon sx={{ fontSize: 48, color: "#2a5298", mb: 1 }} />

              <Typography fontWeight={600}>
                {file ? file.name : "Drag & drop CSV file here"}
              </Typography>

              <Typography color="text.secondary" variant="body2" mb={2}>
                or browse from your device
              </Typography>

              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                hidden
                onChange={handleFileSelect}
              />

              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  onClick={() => fileInputRef.current.click()}
                >
                  Choose File
                </Button>

                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </Stack>
            </Box>

            {/* Job Status */}
            {jobStatus && (
              <>
                <Typography fontWeight={600} mb={1}>
                  Processing Status
                </Typography>

                <LinearProgress
                  variant={total > 0 ? "determinate" : "indeterminate"}
                  value={progress}
                />

                <Stack direction="row" justifyContent="space-between" mb={3}>
                  <Chip
                    label={`Status: ${jobStatus.data.status}`}
                    color={isCompleted ? "success" : "info"}
                    size="small"
                  />

                  <Typography variant="body2" color="text.secondary">
                    {processed} / {total} processed
                  </Typography>
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Summary */}
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      Successful
                    </Typography>
                    <Chip
                      icon={<CheckCircleIcon />}
                      label={processed}
                      color="success"
                      size="small"
                    />
                  </Stack>

                  <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      Failed
                    </Typography>
                    <Chip
                      icon={<ErrorIcon />}
                      label={failed}
                      color="error"
                      size="small"
                    />
                  </Stack>
                </Stack>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default UploadCSV;
