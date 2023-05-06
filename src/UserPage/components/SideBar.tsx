import { useState } from 'react';
import { IconButton, List, ListItemText, ListItemButton, 
    ListItem, SwipeableDrawer, Box } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

interface SideBarProps {
    isAdmin : boolean,
    surveyInfo: surveyInfoType[],
}
export function SideBar(props : SideBarProps) {
    const isAdmin = props.isAdmin;
    const surveyInfo = props.surveyInfo;

    const [barOpen, setBarOpen] = useState(true);

    const toggleDrawer =
        (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
            ) 
            {
                return;
            }
            setBarOpen(open);
    };

    const list = () => (
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List sx={{padding : '1rem'}}>
            {surveyInfo.map((info, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemText primary={`${info.week}주차 - ${info.title}`}/>
                </ListItemButton>
              </ListItem>
            ))}
            {isAdmin && 
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="설문 추가하기" />
                    </ListItemButton>
                </ListItem>
            }
          </List>
        </Box>
    );

    return (
        <div>
            {!barOpen &&
                <IconButton onClick={toggleDrawer(true)}>
                    <MenuOpenIcon/>
                </IconButton>
            }
            <SwipeableDrawer
                anchor="left"
                open={barOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
}

export interface surveyInfoType {
    title: string,
    week: number,
}
