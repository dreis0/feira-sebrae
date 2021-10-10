import {
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDatabase } from "../../database";
import { Produto } from "../../model";
import { ProdutoModal } from "./NovoProdutoModal";

export const ProdutosPage: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isModalNovoOpen, setIsModalNovoOpen] = useState(false);
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<
    Produto | undefined
  >();

  const db = useDatabase();

  useEffect(() => {
    db.produtos.get().then((res) => {
      setProdutos(res.filter((x) => x.ativo));
    });

    db.produtos.listen((x) => {
      setProdutos(x.filter((inner) => inner.ativo));
    });
  }, [db.pedidos]);

  const removeProduto = (p: Produto) => {
    p.ativo = false;
    db.produtos.update(p);
  };

  const openEditarModal = (p: Produto) => {
    setProdutoSelecionado(p);
    setIsModalEditarOpen(true);
  };

  const closeEditarModal = () => {
    setProdutoSelecionado(undefined);
    setIsModalEditarOpen(false);
  };

  return (
    <>
      <Grid item xs={12}>
        <Button
          onClick={() => setIsModalNovoOpen(true)}
          variant="contained"
          sx={{ width: "100%" }}
        >
          Novo
        </Button>
      </Grid>
      {produtos.map((p) => (
        <Grid
          key={p.id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          sx={{
            padding: "4px",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  fontSize: 16,
                }}
                color="text.primary"
                gutterBottom
              >
                {p.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                R${Number(p.preco).toFixed(2)}
              </Typography>
              {p.observacao && (
                <Typography variant="body2" color="text.secondary">
                  Observação: {p.observacao}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => removeProduto(p)}>
                Excluir
              </Button>
              <Button size="small" onClick={() => openEditarModal(p)}>
                Editar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      {isModalNovoOpen && (
        <ProdutoModal
          isOpen={isModalNovoOpen}
          toggle={() => setIsModalNovoOpen(!isModalNovoOpen)}
        ></ProdutoModal>
      )}
      {isModalEditarOpen && produtoSelecionado && (
        <ProdutoModal
          isOpen={isModalEditarOpen}
          toggle={closeEditarModal}
          produtoInitialValue={produtoSelecionado}
        ></ProdutoModal>
      )}
    </>
  );
};
