import { useState } from "react";
import { createTheme, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import "./App.css";
import { AppBar, SideMenu, ListarPedidosPage, ProdutosPage, NovoPedidoPage } from "./components";
import { Switch, Route, BrowserRouter } from "react-router-dom";

function App() {
  const [isDark, setDark] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      background: {},
    },
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppBar toggleMenu={toggleMenu} />
        <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <CssBaseline />
        <Grid container sx={{ width: "100%", margin: 0, padding: "8px" }}>
          <Switch>
            <Route path="/pedidos">
              <ListarPedidosPage />
            </Route>
            <Route path="/novo">
              <NovoPedidoPage />
            </Route>
            <Route path="/produtos">
              <ProdutosPage />
            </Route>
            <Route path="*">
              <ListarPedidosPage />
            </Route>
          </Switch>
        </Grid>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

/*
 
 
 */
