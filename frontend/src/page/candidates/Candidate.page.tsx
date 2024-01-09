import { useEffect, useState } from "react";
import "./candidates.scss";
import httpModule from "../../helper/http.module";
import { ICandidate } from "../../types/globel.typing";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CandidatesGrid from "../../components/candidates/CandidatesGrid.candidates";

function Candidate() {
  const [candidate, setCandidate] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<ICandidate[]>("/Candidate/Get")
      .then((response) => {
        setCandidate(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
        setLoading(false);
      });
  }, []);

console.log(candidate);

  return (
    <div className="content candidate">
      <div className="heading">
        <h2>Candidates</h2>
        <Button variant="outlined" onClick={() => redirect("/candidates/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : candidate.length === 0 ? (
        <h1>No Candidates Yet!</h1>
      ) : (
        <CandidatesGrid data={candidate} />
      )}
    </div>
  );
}

export default Candidate;
