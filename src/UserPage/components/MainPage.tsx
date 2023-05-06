import { useEffect, useState } from 'react';
import { Box, Paper, Stack } from '@mui/material';

interface MainPageProps {
    recentSurvey: surveyInfoType[],
}
export function MainPage(props: MainPageProps) {
    const [recentInfo, setRecentInfo] = useState<surveyInfoType[]>([])
    
    useEffect(() => { // 4보다 작을 경우 추가
        let addedInfo = [...props.recentSurvey]
        const recentLen = addedInfo.length;
        if (recentLen < 4) {
            for (let i=0; i < 4 - recentLen; i++) {
                addedInfo.push({
                    title: "",
                    week: 0,
                    id: 0,
                })
            }
        }
        setRecentInfo(addedInfo);
    }, [props.recentSurvey])

    const paperClickHandler = (id: number) => {
        console.log(id)
        // id 받아서 해당 설문 페이지로 이동
    }

    const drawBoxes = (info: surveyInfoType[]) => (
        <Box sx={boxStyle}>
            {info.map(i => 
                <Paper 
                    sx={paperStyle} 
                    key={i.id}
                >
                    <Box onClick={() => paperClickHandler(i.id)}>{i.title ? `${i.week}주차` : ''}</Box>
                    <Box>{i.title}</Box>
                </Paper>
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
    justifyContent: 'space-between',
}
const paperStyle = {
    textAlign: 'center',
    padding: '2rem',
    margin: '2rem',
    width : '50%',
}
export interface surveyInfoType {
    title: string,
    week: number,
    id: number,
}
