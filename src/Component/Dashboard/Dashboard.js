import React, { useState } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';

import ContentIntro from './Intro/ContentIntro';
import ContentAboutMe from './AboutMe/ContentAboutMe';
import ContentMyProject from './Project/ContentMyProject';
import ContentContact from './Contact/ContentContact';
import ContentComic from './Gallery/Comic/ContentComic';
import Content3D from './Gallery/3D/Content3D';
import ContentNFT from './Gallery/NFT/ContentNFT';


import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import CollectionsIcon from '@mui/icons-material/Collections';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import PhotoIcon from '@mui/icons-material/Photo';
import LandscapeIcon from '@mui/icons-material/Landscape';

import { signout } from '../../firebase/authentication';
import Collapse from '@mui/material/Collapse';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const listNav = [
    {
        key : 1,
        name : 'Intro',
        link : '/dashboard/intro',
        icon : <FaceRetouchingNaturalIcon />,
    },
    {
        key : 2,
        name : 'About Me',
        link : '/dashboard/aboutme',
        icon : <AssignmentIndIcon />,
    },
    {
        key : 3,
        name : 'Contact',
        link : '/dashboard/contact',
        icon : <ConnectWithoutContactIcon />,
    },
    {
        key : 4,
        name : 'My Project',
        link : '/dashboard/project',
        icon : <ArtTrackIcon />,
    },
    {
        key : 5,
        name : 'Gallery',
        link : '',
        icon : <CollectionsIcon />,
    },
]



const listGallery = [
  {
      key : 1,
      name : 'Comic',
      link : '/dashboard/gallery/comic',
      icon : <LandscapeIcon />,
  },
  {
      key : 2,
      name : '3D',
      link : '/dashboard/gallery/3d',
      icon : <ThreeDRotationIcon />,
  },
  {
      key : 3,
      name : 'NFT',
      link : '/dashboard/gallery/nft',
      icon : <PhotoIcon />,
  },
]


export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [expand, setExpand] = useState(false);
  const [indeks, setIndeks] = useState(0);
  const navigate = useNavigate();

  const handleLogOut = async () => {
      await signout()
      navigate('/');
  };
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (event , index) => {
    if(listNav[index].name === 'Gallery'){
      setExpand(!expand)
    }
    setIndeks(index)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {listNav.map((text, index) => (
              <NavLink to={text.link} key={text.name}>
                {text.name !== 'Gallery' ? 
                  <ListItemButton
                      key={text.name}
                      selected={indeks === index}
                      onClick={(event) => handleListItemClick(event, index)}
                      sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                      }}
                  >
                      <ListItemIcon
                          sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                          }}
                      >
                          {text.icon}
                      </ListItemIcon>
                      <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0, color:"black" }} />
                  </ListItemButton>  
                  :
                  <ListItemButton
                      key={text.name}
                      selected={indeks === index}
                      onClick={(event) => handleListItemClick(event, index)}
                      sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                      }}
                  >
                      <ListItemIcon
                          sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                          }}
                      >
                          {text.icon}
                      </ListItemIcon>
                      <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0, color:"black" }} />
                      {expand ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                }
            </NavLink>
          ))}
        </List>
        
        {/* Disini data expand Gallery */}
        <Collapse in={expand} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {listGallery.map((text, index) => (
              <NavLink to={text.link} key={text.name}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText primary={text.name} sx={{ opacity: expand ? 1 : 0, color:"black" }}/>
                </ListItemButton>
              </NavLink>
            ))}
          </List>
        </Collapse>
        <Divider />
        <List>
            <ListItemButton
                sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                }}
                onClick={handleLogOut}
            >
                <ListItemIcon
                sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                }}
                >
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
            <Route path="/intro" element={<ContentIntro />}/>
            <Route path="/aboutme" element={<ContentAboutMe />}/>
            <Route path='/contact' element={<ContentContact />} />
            <Route path='/project' element={<ContentMyProject />} />
            <Route path='/gallery/comic' element={<ContentComic />} />
            <Route path='/gallery/3d' element={<Content3D />} />
            <Route path='/gallery/nft' element={<ContentNFT />} />
        </Routes>
      </Box>
    </Box>
  );
}