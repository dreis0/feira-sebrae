import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  DialogActions,
  Button,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import { useDatabase } from "../../database";
import { Produto } from "../../model";

interface IProdutoModalProps {
  isOpen: boolean;
  toggle: () => void;
  produtoInitialValue?: Produto;
}
export const ProdutoModal: React.FC<IProdutoModalProps> = ({
  isOpen,
  toggle,
  produtoInitialValue,
}) => {
  const db = useDatabase();
  const [produto, setProduto] = useState(produtoInitialValue ?? new Produto());
  const [validations, setValidations] = useState<{
    [id: string]: { hasError: boolean; erro: string };
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.id;
    setProduto({ ...produto, [name]: e.target.value });
  };

  const addOrUpdateProduto = () => {
    setValidations({
      ["nome"]: {
        hasError: !produto.nome || produto.nome === "",
        erro: "Digite um nome",
      },
      ["preco"]: {
        hasError: !produto.preco || produto.preco === 0,
        erro: "Digite o preço",
      },
    });

    if (
      produto.nome &&
      produto.nome !== "" &&
      produto.preco &&
      produto.preco !== 0
    ) {
      if (produto.id) db.produtos.update(produto);
      if (!produto.id) db.produtos.write(produto);
    }

    toggle();
  };

  return (
    <Dialog open={isOpen} onClose={toggle}>
      <DialogTitle>Novo Produto</DialogTitle>
      <DialogContent>
        <FormControl sx={{ width: "100%", marginLeft: 0 }}>
          <TextField
            margin="dense"
            id="nome"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={produto.nome}
            error={validations["nome"] && validations["nome"].hasError}
          ></TextField>
          {validations["nome"] && validations["nome"].hasError && (
            <FormHelperText sx={{ color: "red", margin: 0 }}>
              {validations["nome"].erro}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl sx={{ width: "100%", marginLeft: 0 }}>
          <TextField
            margin="dense"
            id="preco"
            label="Preço"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={produto.preco}
            error={validations["preco"] && validations["preco"].hasError}
          ></TextField>
          {validations["preco"] && validations["preco"].hasError && (
            <FormHelperText sx={{ color: "red", margin: 0 }}>
              {validations["preco"].erro}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl sx={{ width: "100%", marginLeft: 0 }}>
          <TextField
            margin="dense"
            id="observacao"
            label="Observação"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={produto.observacao}
            error={
              validations["observacao"] && validations["observacao"].hasError
            }
          ></TextField>
          {validations["observacao"] && validations["observacao"].hasError && (
            <FormHelperText sx={{ color: "red", margin: 0 }}>
              {validations["observacao"].erro}
            </FormHelperText>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle}>Cancelar</Button>
        <Button onClick={addOrUpdateProduto}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};
