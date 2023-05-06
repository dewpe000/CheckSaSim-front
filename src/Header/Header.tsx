import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography, Toolbar, Box, AppBar} from '@mui/material';

interface HeaderProps {
    onChangeBarOpen: (isAdmin: boolean) => void,
    onChangeModalOpen: (open: boolean) => void,
}
export function Header(props: HeaderProps) {
    return (
        <div className="App">
             <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton
                        size="large"      
                        color="inherit"
                        onClick={() => props.onChangeBarOpen(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        건강과 사회 그리고 심리학 자기 평가
                    </Typography>
                    <IconButton
                        size="large"   
                        color="inherit"
                        onClick={() => props.onChangeModalOpen(true)}
                    >
                        <AccountCircleIcon/>
                    </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
