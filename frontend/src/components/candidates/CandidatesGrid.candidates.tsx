import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import moment from "moment";
import React from "react";
import { ICandidate } from "../../types/globel.typing";
import { baseUrl } from "../../constants/url.constants";
import { PictureAsPdf } from "@mui/icons-material";
import './candidatesGrid.scss';

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "email", headerName: "E-mail", width: 200 },
  { field: "phone", headerName: "Phone Number", width: 150 },
  { field: "coverLetter", headerName: "Cover Letter", width: 400 },
  { field: "jobTitle", headerName: "Iob Title", width: 200 },
  {
    field: "resumeUrl",
    headerName: "Download",
    width: 150,
    renderCell: (params) => (
      <a href={`${baseUrl}/Candidate/download/${params.row.resumeURL}`}><PictureAsPdf/></a>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).fromNow(),
  },
];
interface ICandidatesGrid {
  data: ICandidate[];
}

function CandidatesGrid({ data }: ICandidatesGrid) {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="candidate-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
}

export default CandidatesGrid;
