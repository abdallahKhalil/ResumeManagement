import { useEffect, useState } from "react";
import { ICompany, ICreateJobsDto } from "../../types/globel.typing";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./jobs.scss";
import httpModule from "../../helper/http.module";

const jobLevel: string[] = [
  "Intern",
  "Junior",
  "MidLevel",
  "Senior",
  "TeamLead",
  "CTO",
  "Architect",
];

function AddJobs() {
  const [job, setJob] = useState<ICreateJobsDto>({
    title: "",
    level: "",
    companyId: "",
  });
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<ICompany[]>("/Company/Get")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (job.title === "" || job.level === "" || job.companyId === "") {
      alert("Please Fill the companf detailes!");
      return;
    }

    httpModule
      .post("/Job/Create", job)
      .then((response) => {
        redirect("/jobs");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClickBackBtn = () => {
    redirect("/jobs");
  };

  return (
    <div className="content">
      <div className="add-job">
        <h2>Add New Job</h2>

        <TextField
          autoComplete="off"
          label="Job Title"
          variant="outlined"
          value={job.title}
          style={{ width: "100%" }}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Job Level</InputLabel>
          <Select
            value={job.level}
            label="Job Level"
            onChange={(e) => setJob({ ...job, level: e.target.value })}
          >
            {jobLevel.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Company</InputLabel>
          <Select
            value={job.companyId}
            label="Company"
            onChange={(e) => setJob({ ...job, companyId: e.target.value })}
          >
            {companies.map((company) => (
              <MenuItem
                key={company.id.toString()}
                value={company.id.toString()}
              >
                {company.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
            style={{ width: 60 }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddJobs;
