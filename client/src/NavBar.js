import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';

import "./styles/NavBar.css"

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function NavBar(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className='NavBar'>    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ background: '#fff' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
            style={{color: "black"}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{color: "black"}}>
            books hub
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to="/">
            <ListItem button key={"home"}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
          <Tooltip title="Code source at GitHub" arrow>
              <a href="https://github.com/yousefalkhatibDev/books-hub">
                <ListItem button key={"source"} >
                      <ListItemIcon>
                        <CodeOffIcon />
                      </ListItemIcon>
                    <ListItemText primary={"Source"} />
                </ListItem>
              </a>
            </Tooltip>
           
        </List>
        <Divider />
        <List>
           <Link to="/book/fav">
              <ListItem button key={"fav-books"}>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary={"Favorite books"} />
              </ListItem>
            </Link>
            <Link to="/mybooks">
              <ListItem button key={"user-books"}>
                <ListItemIcon>
                  <ImportContactsIcon />
                </ListItemIcon>
                <ListItemText primary={"My books"} />
              </ListItem>
            </Link>
            
            
            <Link to="/book/new" >
              <ListItem button key={"add-book"}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={"Add your own book"} />
              </ListItem>
            </Link>
            <Divider />
            {props.isLoggedIn ?
           <Tooltip title={`log out from ${props.userInfo.username}`} arrow>
            <Link to="/logout">
              <ListItem button key={"logout"}>
                <ListItemIcon>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItem>
            </Link>
            </Tooltip>
            :
            <div>
            <Link to="/login">
              <ListItem button key={"login"}>
                <ListItemIcon>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItem>
            </Link>
          
            <Link to="/register">
              <ListItem button key={"register"}>
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary={"Register"} />
              </ListItem>
            </Link>
          </div>
           }
           {props.isLoggedIn && 
            <Tooltip title={props.userInfo.email} arrow>
              <ListItem button key={"user-info"} >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                <ListItemText primary={props.userInfo.username} />
              </ListItem>
            </Tooltip>
            }
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      
    </Box>
    </div>
  );
}