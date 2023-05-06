import { List, ListItemText, ListItemButton, 
    ListItem, SwipeableDrawer, Box } from '@mui/material';

interface SideBarProps {
    isAdmin : boolean,
    barOpen: boolean,
    surveyInfo: surveyInfoType[],
    onChangeBarOpen: (isAdmin: boolean) => void,
}
export function SideBar(props: SideBarProps) {
    const isAdmin = props.isAdmin;
    const surveyInfo = props.surveyInfo;

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
            props.onChangeBarOpen(open);
    };

    const list = () => (
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{padding : '1rem'}}
        >
          <List>
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
            <SwipeableDrawer
                anchor="left"
                open={props.barOpen}
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
    id: number,
}
