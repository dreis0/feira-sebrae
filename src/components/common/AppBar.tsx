import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  AppBar as MaterialAppBar,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

interface IAppBarProps {
  toggleMenu: () => void;
}

export const AppBar: React.FC<IAppBarProps> = ({
  toggleMenu,
}: IAppBarProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MaterialAppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Feira Sebrae
          </Typography>
        </Toolbar>
      </MaterialAppBar>
    </Box>
  );
};
