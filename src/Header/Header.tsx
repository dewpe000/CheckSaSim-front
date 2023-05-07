import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography, Toolbar, Box} from '@mui/material';

interface HeaderProps {
    isAdmin: boolean,
    onChangeBarOpen: (isAdmin: boolean) => void,
    onChangeModalOpen: (open: boolean) => void,
}
export function Header(props: HeaderProps) {
    return (
        <div className="App">
             <Box sx={{ flexGrow: 1,mt:1 }}>
                    <Toolbar>
                    <IconButton
                        size="large"      
                        color="primary"
                        onClick={() => props.onChangeBarOpen(true)}
                        sx={{ mr: 2}}
                        >
                        <MenuIcon sx= {{fontSize:"2.5rem"}}/>
                    </IconButton>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign:"center"}} color="primary.main">
                        건강과 사회 그리고 심리학
                    </Typography>
                    {props.isAdmin ? 
                        <Typography>관리자</Typography>
                        : <IconButton
                            size="large"   
                            color="primary"
                            onClick={() => props.onChangeModalOpen(true)}
                        >
                            <AccountCircleIcon sx= {{fontSize:"2.5rem"}}/>
                        </IconButton>
                    }
                    </Toolbar>
            </Box>
            <Box sx={{mb:10, mt:3, border: "solid 0.1rem", borderColor:"primary.main"}}/>
        </div>
    );
}
