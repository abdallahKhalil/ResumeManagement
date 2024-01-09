import { useEffect, useState } from "react";
import { IJobs, ICreateCandidateDto } from "../../types/globel.typing";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./candidates.scss";
import httpModule from "../../helper/http.module";

function AddCandidate() {
  const [candidate, setCandidate] = useState<ICreateCandidateDto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    jobId: "",
  });
  const [jobs, setJobs] = useState<IJobs[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>();
  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<IJobs[]>("/Job/Get")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (
      candidate.firstName === "" ||
      candidate.lastName === "" ||
      candidate.email === "" ||
      candidate.phone === "" ||
      candidate.coverLetter === "" ||
      candidate.jobId === "" ||
      !pdfFile
    ) {
      alert("Please Fill the companf detailes!");
      return;
    }
    const newCandidateFormData = new FormData();

    newCandidateFormData.append("firstName", candidate.firstName.toString());
    newCandidateFormData.append("lastName", candidate.lastName.toString());
    newCandidateFormData.append("email", candidate.email.toString());
    newCandidateFormData.append("phone", candidate.phone.toString());
    newCandidateFormData.append("coverLetter", candidate.coverLetter.toString());
    newCandidateFormData.append("jobId", candidate.jobId.toString());
    newCandidateFormData.append("pdfFile", pdfFile);

    httpModule
      .post("/Candidate/Create", newCandidateFormData)
      .then((response) => {
        redirect("/candidates");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClickBackBtn = () => {
    redirect("/candidates");
  };

  return (
    <div className="content">
      <div className="add-candidate">
        <h2>Add New Candidate</h2>

        <FormControl fullWidth>
          <InputLabel>Jobs</InputLabel>
          <Select
            value={candidate.jobId}
            label="Jobs"
            onChange={(e) =>
              setCandidate({ ...candidate, jobId: e.target.value })
            }
          >
            {jobs.map((job) => (
              <MenuItem key={String(job.id)} value={String(job.id)}>
                {job.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          autoComplete="off"
          label="First Name"
          variant="outlined"
          value={candidate.firstName}
          style={{ width: "100%" }}
          onChange={(e) =>
            setCandidate({ ...candidate, firstName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Last Name"
          variant="outlined"
          value={candidate.lastName}
          style={{ width: "100%" }}
          onChange={(e) =>
            setCandidate({ ...candidate, lastName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="E-mail"
          variant="outlined"
          value={candidate.email}
          style={{ width: "100%" }}
          onChange={(e) =>
            setCandidate({ ...candidate, email: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Phone Number"
          variant="outlined"
          value={candidate.phone}
          style={{ width: "100%" }}
          onChange={(e) =>
            setCandidate({ ...candidate, phone: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Cover Lettet"
          variant="outlined"
          value={candidate.coverLetter}
          style={{ width: "100%" }}
          onChange={(e) =>
            setCandidate({ ...candidate, coverLetter: e.target.value })
          }
          multiline
        />
        <input type="file" onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)} />
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
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

export default AddCandidate;
