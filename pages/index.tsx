// TODO: Fix eslint rule
/* eslint-disable react/jsx-key */
import type { NextPage } from 'next';
import { Box, Button, Container, FormHelperText, TextField, Typography } from "@mui/material";
import { FormEventHandler, useState } from 'react';

interface FormValues {
  file: unknown;
  emailList: string;
}

const initialState: FormValues = {
  file: null,
  emailList: "",
}

const Home: NextPage = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit: FormEventHandler = async (e) => {
    try {
      e.preventDefault();
      const payload = {};
      setIsSending(true);
      await fetch("/newsletter", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } catch (error) {
      // TODO: Error monitoring using Sentry or similar platforms
      setError(error as Error);
    } finally {
      setIsSending(false);
    }
  }

  // TODO: Visibility of system status
  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3} py={3}>
        <Typography component="h1">Aplicación de Newsletter</Typography>
        <Box>
          <Button variant="text" component="label">
            Subir Archivo
            <input required type="file" hidden accept="image/jpeg,image/gif,image/png,application/pdf" multiple={false} />
          </Button>
          <FormHelperText>Imágenes o PDFs no mayores a 2MB</FormHelperText>
        </Box>
        <TextField required label="Emails" variant='standard' helperText="Escribe los emails separados por comas" value={formValues.emailList} onChange={e => setFormValues(v => ({...v, [e.target.name]: e.target.value}))} />
        <Button disabled={!formValues.emailList || !formValues.file || isSending} type="submit" variant="contained" size="large">{isSending ? "Enviando..." : "Enviar"}</Button>
      </Box>
    </Container>
  )
}

export default Home
