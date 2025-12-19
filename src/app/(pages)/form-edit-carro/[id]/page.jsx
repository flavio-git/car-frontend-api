"use client";

import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import Header from "../../../../components/Header";

const checkoutSchema = yup.object().shape({
  modelo: yup.string().required("required"),
  fabricante: yup.string().required("required"),
  ano: yup.number().required("required"),
  cor: yup.string().required("required"),
  cavalosDePotencia: yup.number().required("required"),
  pais: yup.string().required("required"),
});

const FormEditCarroPage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const router = useRouter();
  const params = useParams();

  const [carro, setCarro] = useState(null);

  const id = params?.id;

  const handleFormSubmit = (values) => {
    if (!id) {
      toast.error(`Carro com ID = ${id} não encontrado.`);
      return;
    }
    fetch(`/api/carros/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        toast.success("Carro editado com sucesso.");
        router.push("/carros");
      })
      .catch(() => {
        toast.error("Error ao editar o carro.");
        router.push("/carros");
      });
  };

  useEffect(() => {
    if (!id) {
      toast.error(`Carro com ID = ${id} não encontrado.`);
    } else {
      fetch(`/api/carros/${id}`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((response) => {
          setCarro(response.data || response);
        })
        .catch((error) => {
          console.error("Error fetching carro:", error);
        });
    }
  }, [id]);

  const initialValues = {
    modelo: carro?.modelo || "",
    fabricante: carro?.fabricante || "",
    ano: carro?.ano || 2020,
    cor: carro?.cor || "",
    cavalosDePotencia: carro?.cavalosDePotencia || 150,
    pais: carro?.pais || "Brasil",
  };

  return (
    <Box m="20px">
      <Header title="Editar Carro" subtitle="Alterando os valores do carro" />
      {carro?.modelo && (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Modelo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.modelo}
                  name="modelo"
                  error={!!touched.modelo && !!errors.modelo}
                  helperText={touched.modelo && errors.modelo}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Fabricante"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fabricante}
                  name="fabricante"
                  error={!!touched.fabricante && !!errors.fabricante}
                  helperText={touched.fabricante && errors.fabricante}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Ano"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ano}
                  name="ano"
                  error={!!touched.ano && !!errors.ano}
                  helperText={touched.ano && errors.ano}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Cor"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cor}
                  name="cor"
                  error={!!touched.cor && !!errors.cor}
                  helperText={touched.cor && errors.cor}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Cavalos de Potência"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cavalosDePotencia}
                  name="cavalosDePotencia"
                  error={
                    !!touched.cavalosDePotencia && !!errors.cavalosDePotencia
                  }
                  helperText={
                    touched.cavalosDePotencia && errors.cavalosDePotencia
                  }
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="País"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pais}
                  name="pais"
                  error={!!touched.pais && !!errors.pais}
                  helperText={touched.pais && errors.pais}
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Salvar
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default FormEditCarroPage;
