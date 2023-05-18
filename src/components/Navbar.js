import React from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
} from "@material-ui/core";
import {Link, NavLink, BrowserRouter} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(10),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(20),
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
}));

function Navbar() {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                    News
                </Typography>


                <div className={classes.navlinks}>
                    <Link to="/home" className={classes.link}>
                        Home
                    </Link>
                    <Link to="/login" className={classes.link}>
                        login
                    </Link>
                    <Link to="/register" className={classes.link}>
                        signup
                    </Link>
                    <Link to="/news" className={classes.link}>
                        my news
                    </Link>
                    <Link to="/my-preferences" className={classes.link}>
                        my preferences
                    </Link>
                </div>

            </Toolbar>
        </AppBar>
    );
}
export default Navbar;