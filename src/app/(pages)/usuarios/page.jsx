"use client";

import { Box, CircularProgress, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";

const UsuariosPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/usuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        setUsuarios(response);
      })
      .catch(() => {
        toast.error("Não foi possível carregar os dados.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.05,
      type: "number",
    },
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
      type: "string",
    },
    {
      field: "cargo",
      headerName: "Cargo",
      flex: 1,
      type: "string",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      type: "string",
    },
  ];

  return (
    <Box m="20px">
      <Header title="USUÁRIOS" subtitle="Membros de sua equipe" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid rows={usuarios} columns={columns} />
        )}
      </Box>
    </Box>
  );
};

export default UsuariosPage;
