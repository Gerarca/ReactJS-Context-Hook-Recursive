import {
    AppBar,
    Toolbar,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    Link,
    MenuItem,
  } from "@material-ui/core";
  import MenuIcon from "@material-ui/icons/Menu";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import React, { useState, useEffect } from "react";
  import { Link as RouterLink } from "react-router-dom";
  import Logo from '../../Static/img/logo.png';

  const headersData = [
    {
      label: "Home",
      href: "/",
    },    
    {
      label: "Añadir Categoria",
      href: "/addcat",
    },
    {
      label: "Listado de categorias",
      href: "/allcat",
    },
  ];
  
  const useStyles = makeStyles(() => ({
    header: {        
      backgroundColor: "#ffffff",      
      paddingRight: "79px",
      paddingLeft: "118px",
      "@media (max-width: 900px)": {
        paddingLeft: 0,
        minWidth: "300px",
      },
    }, 
    menuButton: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 700,
      color: "#ff0000",
      size: "18px",
      marginLeft: "38px",
      "&:hover": {
        color: "#c40303",
      },    
    },    
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    drawerContainer: {
      padding: "20px 30px",
    },
  }));
  
  export default function Header() {
    const { header, menuButton, toolbar, drawerContainer } = useStyles();
  
    const [state, setState] = useState({
      mobileView: false,
      drawerOpen: false,
    });
  
    const { mobileView, drawerOpen } = state;
  
    useEffect(() => {
      const setResponsiveness = () => {
        return window.innerWidth < 900
          ? setState((prevState) => ({ ...prevState, mobileView: true }))
          : setState((prevState) => ({ ...prevState, mobileView: false }));
      };
  
      setResponsiveness();
  
      window.addEventListener("resize", () => setResponsiveness());
    }, []);
  
    const displayDesktop = () => {
      return (
        <Toolbar className={toolbar}>
          {LogoHeader}
          <div>{getMenuButtons()}</div>
        </Toolbar>
      );
    };
  
    const displayMobile = () => {
      const handleDrawerOpen = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: true }));
      const handleDrawerClose = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: false }));
  
      return (        
        <Toolbar>
          <IconButton
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon style={{fill: "red"}} />
          </IconButton>
  
          <Drawer
            {...{
              anchor: "left",
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
          >
            <div className={drawerContainer}>{getDrawerChoices()}</div>
          </Drawer>
  
          <div>{LogoHeader}</div>
        </Toolbar>        
      );
    };
  
    const getDrawerChoices = () => {
      return headersData.map(({ label, href }) => {
        return (       
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: "inherit",
              style: { textDecoration: "none", color: "#ff0000" },
              key: label,
            }}
          >
            <MenuItem>{label}</MenuItem>
          </Link>        
        );
      });
    };
  
    const LogoHeader = (
      <img className="img-fluid" src={Logo} alt="Logo" width="100px" height="200px" />
    );
  
    const getMenuButtons = () => {
      return headersData.map(({ label, href }) => {
        return (        
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: RouterLink,
              className: menuButton,
            }}
          >
            {label}
          </Button>        
        );
      });
    };
  
    return (
      <header>
        <AppBar className={header}>
          {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
      </header>
    );
  }