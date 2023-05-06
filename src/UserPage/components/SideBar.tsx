import { List, ListItemText, ListItemButton, 
    ListItem, SwipeableDrawer, Box } from '@mui/material';
import { SurveyMetaDataType } from '../Interfaces';

interface SideBarProps {
    isAdmin : boolean,
    barOpen: boolean,
    surveyInfo: SurveyMetaDataType[],
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
    const listItemClickHandler = (id: number) => {
        console.log(id)
        // survey 이동
    }
    const list = () => (
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{padding : '1rem'}}
        >
          <List>
            {surveyInfo.map((info) => (
              <ListItem key={info.surveyId} disablePadding onClick={() => listItemClickHandler(info.surveyId)}>
                <ListItemButton>
                  <ListItemText primary={`${info.week}주차 - ${info.surveyTitle}`}/>
                </ListItemButton>
              </ListItem>
            ))}
            {isAdmin && 
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="설문 추가하기" sx={{textAlign: "center"}}/>
                    </ListItemButton>
                </ListItem>
            }
          </List>
        </Box>
    );

    return (
        <SwipeableDrawer
            anchor="left"
            open={props.barOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            {list()}
        </SwipeableDrawer>
    );
}
