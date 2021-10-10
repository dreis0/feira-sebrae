import {
  SwipeableDrawer,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Add as AddIcon,
  OutdoorGrill as GrillIcon,
  Storefront as StorefrontIcon,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";

interface ISideMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const SideMenu: React.FC<ISideMenuProps> = ({ isOpen, toggleMenu }) => {
  const history = useHistory();
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const redirectTo = (rota: string) => {
    history.push(rota);
    toggleMenu();
  };

  return (
    <SwipeableDrawer
      open={isOpen}
      onClose={toggleMenu}
      onOpen={toggleMenu}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <Box sx={{ width: 250 }} role="presentation" onKeyDown={toggleMenu}>
        <List>
          <ListItem button onClick={() => redirectTo("/novo")}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Novo pedido" />
          </ListItem>
          <ListItem button onClick={() => redirectTo("/pedidos")}>
            <ListItemIcon>
              <GrillIcon />
            </ListItemIcon>
            <ListItemText primary="Ver pedidos" />
          </ListItem>
          <ListItem button onClick={() => redirectTo("/produtos")}>
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary="Produtos" />
          </ListItem>
        </List>
      </Box>
    </SwipeableDrawer>
  );
};
