"use client";

import { Box, Button, CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import DeleteItemConfirmationModal from "../../../components/DeleteCarroModal";

const CarrosPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(true);
  const [carros, setCarros] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [idCarroDelete, setIdCarroDelete] = useState("");
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const router = useRouter();

  const loadCarros = async () => {
    const response = await fetch("/api/carros", {
      method: "GET",
      headers: {
        page: "0",
        size: "100",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("usuario");
      if (stored) {
        try {
          setUsuario(JSON.parse(stored));
        } catch {
          setUsuario(null);
        }
      }
    }
    setLoading(true);
    loadCarros()
      .then((response) => {
        setCarros(response.data || response);
      })
      .catch(() => {
        toast.error("Error ao carregar os dados.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    router.push(`/form-edit-carro/${id}`);
  };

  const handleDelete = (id) => {
    setIdCarroDelete(id);
    setOpenModalDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenModalDelete(false);
  };

  const isAdmin = usuario?.cargo === "Administrador do Sistema";

  const handleConfirmDelete = () => {
    fetch(`/api/carros/${idCarroDelete}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        if (!response.ok) {
          const errText = await response.text().catch(() => null);
          throw new Error(errText || `HTTP error! status: ${response.status}`);
        }

        const semBodyStatus = [204, 205, 304];
        if (
          semBodyStatus.includes(response.status) ||
          (response.status >= 100 && response.status < 200)
        ) {
          return null;
        }

        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          return response.json();
        }
        return response.text();
      })
      .then(() => loadCarros())
      .then((response) => {
        setCarros(response?.data || response || []);
        toast.success(`Carro de ID = ${idCarroDelete} excluído.`);
        setOpenModalDelete(false);
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error("Não foi possível excluir o carro selecionado.");
        setOpenModalDelete(false);
      });
  };

  const baseColumns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "modelo", headerName: "Modelo", flex: 1 },
    { field: "ano", headerName: "Ano", flex: 1 },
    { field: "cor", headerName: "Cor", flex: 1 },
    { field: "cavalosDePotencia", headerName: "Cavalos de Potência", flex: 1 },
    { field: "fabricante", headerName: "Fabricante", flex: 1 },
    { field: "pais", headerName: "País", flex: 1 },
  ];

  const columns = [...baseColumns];
  if (isAdmin) {
    columns.push({
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.id)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    });
  }

  return (
    <Box m="20px">
      <Header title="CARROS" subtitle="Lista de carros cadastrados" />
      {isAdmin && (
        <Button
          variant="contained"
          color="info"
          size="small"
          onClick={() => {
            router.push("/form-novo-carro");
          }}
        >
          Adicionar Carro
        </Button>
      )}
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
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
          <DataGrid
            rows={carros}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        )}
      </Box>

      <DeleteItemConfirmationModal
        open={openModalDelete}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        id={idCarroDelete}
      />
    </Box>
  );
};

export default CarrosPage;
