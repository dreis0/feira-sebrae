import {
  FormControl,
  Grid,
  TextField,
  Select,
  InputLabel,
  SelectChangeEvent,
  MenuItem,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDatabase } from "../../database";
import { Pedido, Produto } from "../../model";

export const NovoPedidoPage = () => {
  const db = useDatabase();
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [novoPedido, setNovoPedido] = useState<Pedido>(new Pedido());
  const [produtoSelecionado, setProdutoSelecionado] = useState<string>("");

  useEffect(() => {
    db.produtos.get().then((res) => {
      setProdutos(res.filter((x) => x.ativo));
    });

    db.produtos.listen((x) => {
      setProdutos(x.filter((inner) => inner.ativo));
    });
  }, [db.produtos]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.id;
    setNovoPedido({ ...novoPedido, [name]: e.target.value });
  };

  const handleProdutoChange = (e: SelectChangeEvent) => {
    setProdutoSelecionado(e.target.value);
  };

  const addPedido = () => {
    const p = produtos.filter((x) => x.id == produtoSelecionado)[0];
    var pedido = { ...novoPedido, produto: p };
    db.pedidos.write(pedido);
    setNovoPedido(new Pedido());
    setProdutoSelecionado("")
  };

  return (
    <>
      <Grid item xs={12} sx={{ padding: "4px 16px" }}>
        <FormControl sx={{ width: "100%", marginLeft: 0 }}>
          <InputLabel id="demo-simple-select-label">Produto</InputLabel>
          <Select
            margin="dense"
            id="nome"
            label="Quantidade"
            fullWidth
            variant="standard"
            onChange={handleProdutoChange}
            value={produtoSelecionado}
          >
            <MenuItem value="">Selecione</MenuItem>
            {produtos.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ padding: "4px 16px" }}>
        <FormControl sx={{ width: "100%", marginLeft: 0 }}>
          <TextField
            margin="dense"
            id="quantidade"
            label="Quantidade"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={novoPedido.quantidade}
          ></TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ padding: "4px 16px" }}>
        <FormControl sx={{ width: "100%", marginLeft: 0 }}>
          <TextField
            margin="dense"
            id="observacao"
            label="Observação"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={novoPedido.observacao}
          ></TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ padding: "4px 8px" }}>
        <Button onClick={addPedido}>Adiconar</Button>
      </Grid>
    </>
  );
};
