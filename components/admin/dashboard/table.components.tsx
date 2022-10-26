import AddOutlined from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import moment from "moment";
import { useState } from "react";
import { News } from "../../../src/generated/client";
import DashboardModal, { AddDashboardModal } from "./modal.components";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },

  {
    field: "logo",
    headerName: "Logo",
    renderCell: (params: GridValueGetterParams<any, News>) => (
      <Avatar
        alt={params.row.title!}
        src={params.row.logo ? params.row.logo : ""}
        title={params.row.title!}
      />
    ),
  },

  {
    field: "publisher",
    headerName: "Publisher",
    width: 150,
    maxWidth: 250,
  },

  {
    field: "title",
    headerName: "Title",
    minWidth: 400,
    maxWidth: 600,
    renderCell: (params: GridValueGetterParams<any, News>) => (
      <p dir="auto">{params.row.title}</p>
    ),
  },
  {
    field: "description",
    headerName: "Description",
    renderCell: (params: GridValueGetterParams<any, News>) => (
      <p dir="auto">{params.row.description}</p>
    ),
    minWidth: 400,
    maxWidth: 600,
  },

  {
    field: "date",
    headerName: "Date",
    width: 160,
    maxWidth: 230,

    valueGetter: (params: GridValueGetterParams<any, News>) =>
      moment(params.row.date).format("DD-MM-yyy hh:mm a"),
  },
  {
    field: "lang",
    headerName: "Lang",
    width: 60,
  },

  {
    renderCell: (params: GridValueGetterParams<any, News>) => (
      <a
        style={{ color: "blueviolet" }}
        href={params.row.url!}
        target={"_blank"}
      >
        {params.row.url}
      </a>
    ),
    field: "url",
    headerName: "URL",
    width: 100,
    maxWidth: 230,
  },

  {
    renderCell: (params: GridValueGetterParams<any, News>) => (
      <a
        style={{ color: "blueviolet" }}
        href={params.row.image!}
        target={"_blank"}
      >
        {params.row.image}
      </a>
    ),
    field: "image",
    headerName: "Image",
    width: 100,
    maxWidth: 230,
  },

  {
    renderCell: (params: GridValueGetterParams<any, News>) => (
      <a
        style={{ color: "blueviolet" }}
        href={params.row.video!}
        target={"_blank"}
      >
        {params.row.video}
      </a>
    ),
    field: "video",
    headerName: "Video",
    width: 100,
    maxWidth: 230,
  },
];

export default function DashboardTable(props: {
  news: News[];
  child: any;
  onUpdate: () => void;
}) {
  const [modal, setModal] = useState<any>([]);
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      {modal}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Table</h1>
        <IconButton
          color="inherit"
          onClick={() => {
            setModal([
              <AddDashboardModal
                onClose={(e) => {
                  if (e) {
                    props.onUpdate();
                  }
                  setModal([]);
                }}
                news={undefined}
              />,
            ]);
          }}
        >
          <AddOutlined />
        </IconButton>
      </div>
      {props.child}
      <DataGrid
        rows={props.news}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        onRowDoubleClick={(e) => {
          setModal(() => [
            <DashboardModal
              onClose={() => setModal([])}
              news={e.row}
              key={Date.now()}
            />,
          ]);
        }}
      />
    </Box>
  );
}
