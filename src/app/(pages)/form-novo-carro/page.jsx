"use client";

import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Header from "../../../components/Header";

const checkoutSchema = yup.object().shape({
  modelo: yup.string().required("required"),
  fabricante: yup.string().required("required"),
  ano: yup.number().required("required"),
  cor: yup.string().required("required"),
  cavalosDePotencia: yup.number().required("required"),
  pais: yup.string().required("required"),
});

const FormNovoCarroPage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const router = useRouter();

  const handleFormSubmit = (values) => {
    fetch("/api/carros", {
      method: "POST",
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
        toast.success("Carro criado com sucesso.");
        router.push("/carros");
      })
      .catch(() => {
        toast.error("Error ao criar o novo carro.");
        router.push("/carros");
      });
  };

  const initialValues = {
    modelo: "",
    fabricante: "",
    ano: 2025,
    cor: "",
    cavalosDePotencia: 150,
    pais: "",
  };

  return (
    <Box m="20px">
      <Header title="Criar Carro" subtitle="Insira os valores do novo carro" />
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
    </Box>
  );
};

export default FormNovoCarroPage;
