import { List, ListItemText, ListItemButton, 
    ListItem, SwipeableDrawer, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate()

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
        navigate(`/survey/${id}`)
    }
    const moveToAddSurvey = () => {
        navigate(`/add`)
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
                <ListItem disablePadding onClick={moveToAddSurvey}>
                    <ListItemButton>
                        <ListItemText primary="설문 추가하기" sx={{textAlign: "center", color:"primary.main"}}/>
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
