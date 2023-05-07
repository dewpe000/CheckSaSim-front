import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography, Button } from '@mui/material';
import { SurveyMetaDataType } from '../Interfaces';

interface MainPageProps {
    recentSurvey: SurveyMetaDataType[],
}
export function MainPage(props: MainPageProps) {
    const [recentInfo, setRecentInfo] = useState<SurveyMetaDataType[]>([])
    const navigate = useNavigate();
    
    useEffect(() => { // 4보다 작을 경우 추가
        let addedInfo = [...props.recentSurvey]
        const recentLen = addedInfo.length;
        if (recentLen < 4) {
            for (let i=0; i < 4 - recentLen; i++) {
                addedInfo.push({
                    surveyTitle: "",
                    week: 0,
                    surveyId: i,
                })
            }
        }
        setRecentInfo(addedInfo);
    }, [props.recentSurvey])

    const paperClickHandler = (id: number) => {
        navigate(`/survey/${id}`)
    }

    const drawBoxes = (info: SurveyMetaDataType[]) => (
        <Box sx={boxStyle}>
            {info.map(i => 
                <Button 
                    sx={paperStyle} 
                    key={i.surveyId}
                    variant='outlined'
                    disabled={!i.surveyTitle}
                    onClick={() => paperClickHandler(i.surveyId)}
                >   
                    <Stack>
                        <Typography>{i.surveyTitle ? `${i.week}주차` : ""}</Typography>
                        <Typography>{i.surveyTitle}</Typography>
                    </Stack>
                </Button>
            )}
        </Box>
    )

    return (   
        <Stack spacing={2}>
            {drawBoxes(recentInfo.slice(0, 2))}
            {drawBoxes(recentInfo.slice(2, 4))}
        </Stack>
    );
}
const boxStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
}
const paperStyle = {
    textAlign: 'center',
    margin: '2rem',
    width : '25%',
    height : '15rem'
}
