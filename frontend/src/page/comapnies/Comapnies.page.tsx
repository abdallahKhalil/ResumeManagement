import { useEffect, useState } from "react";
import "./companies.scss";
import httpModule from "../../helper/http.module";
import { ICompany } from "../../types/globel.typing";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ComapaniesGrid from "../../components/companies/companiesGrid.companies";

function Comapnies() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<ICompany[]>("/Company/Get")
      .then((response) => {
        setCompanies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
        setLoading(false);
      });
  }, []);

  console.log(companies);

  return (
    <div className="content companies">
      <div className="heading">
        <h2>Companies</h2>
        <Button variant="outlined" onClick={() => redirect("/companies/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : companies.length === 0 ? (
        <h1>No Companies Yet!</h1>
      ) : (
        <ComapaniesGrid data={companies} />
      )}
    </div>
  );
}

export default Comapnies;
