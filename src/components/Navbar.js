import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { images } from './constants/image-constant';
import ConnectWallet from './connect/connectWallet';
import './Navbar.css'
import { useState, useEffect } from 'react';
import * as utils from "./utils";
const {
    Logo,
    User,
} = images;
let address = sessionStorage.getItem('address')
let shortenedAddress = ''
if (address != null) {
    address = address.toUpperCase()
    shortenedAddress = address.substring(0, 6) + '...' + address.substring(address.length - 4)
}
const settings = [shortenedAddress, 'Logout'];

const Navbar = () => {
    const [tooltip, setTooltip] = useState('Account Info')

    useEffect(() => {
        if (address == null) {
            setTooltip('Connect Wallet')
        } else {
            address = address.toUpperCase()
        }

    }, [])
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const addMap = (event) => {
        if (event.target.innerText != 'Logout') {
            navigator.clipboard.writeText(address)
        } else {
            utils.handleClickDisconnect();
        }
        handleCloseUserMenu();
    };

    return (
        <AppBar style={{ backgroundColor: '#F8F8FF' }} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <a href='/'>
                        <img className='navbar-logo' src={Logo}></img>
                    </a>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={tooltip}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {address == null ?

                                    <ConnectWallet /> :
                                    <Avatar alt="User" src={User} />
                                }
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={(e) => addMap(e)}
                                >
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
