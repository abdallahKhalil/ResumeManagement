import { useEffect, useState } from "react";
import "./jobs.scss";
import httpModule from "../../helper/http.module";
import { IJobs } from "../../types/globel.typing";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import JobsGrid from "../../components/jobs/JobsGrid.jobs";

function Jobs() {
  const [jobs, setJobs] = useState<IJobs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IJobs[]>("/Job/Get")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
        setLoading(false);
      });
  }, []);

  console.log(jobs);

  return (
    <div className="content jobs">
      <div className="heading">
        <h2>Jobs</h2>
        <Button variant="outlined" onClick={() => redirect("/jobs/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : jobs.length === 0 ? (
        <h1>No Jobs Yet!</h1>
      ) : (
        <JobsGrid data={jobs} />
      )}
    </div>
  );
}

export default Jobs;
