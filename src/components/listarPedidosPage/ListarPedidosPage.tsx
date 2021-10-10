import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDatabase } from "../../database";
import { Pedido } from "../../model/Pedido";

export const ListarPedidosPage: React.FC = () => {
  var db = useDatabase();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    db.pedidos.get().then((res) => {
      var filteredAndOrdered = res
        .filter((x) => !x.pronto)
        .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

      setPedidos(filteredAndOrdered);
    });

    db.pedidos.listen((x) => {
      var filteredAndOrdered = x
        .filter((inner) => !inner.pronto)
        .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

      setPedidos(filteredAndOrdered);
    });
  }, [db.pedidos]);

  const getTimespan = (p: Pedido) => {
    var span = Date.now() - p.timestamp.seconds * 1000;
    return (span / (60 * 1000)).toFixed(0);
  };

  const updatePronto = (pedido: Pedido) => {
    pedido.pronto = true;
    db.pedidos.update(pedido);
    console.log(pedido);
  };

  return pedidos.length === 0 ? (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={4}
      sx={{
        padding: "4px",
      }}
    >
      <Typography variant="h6">Sem pedidos por enquanto</Typography>
    </Grid>
  ) : (
    <>
      {pedidos.map((x) => (
        <Grid
          key={x.id}
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
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 16 }}
                color="text.primary"
                gutterBottom
              >
                {x.quantidade} x {x.produto.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pedido feito a {getTimespan(x)} minuto(s)
              </Typography>
              {x.observacao && (
                <Typography variant="body2" color="text.secondary">
                  Observação: {x.observacao}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => updatePronto(x)}>
                Pronto
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
};
