import { Container, Stack, Select, SelectChangeEvent, MenuItem, 
    InputLabel, TextField, Checkbox, Box, Button, Zoom} from '@mui/material';
import { useState, useRef, ChangeEvent } from 'react';
import { newSurveyDataType } from '../../UserPage/Interfaces';

export function AddSurvey() {
    const [weekNum, setWeekNum] = useState<number>(0);
    const [numOfAnswer, setNumOfAnswer] = useState<number>(0);
    const [numOfQuest, setNumOfQuest] = useState<number>(0);

    const stackItemSize = 60;

    const outputData = useRef<newSurveyDataType>({
        weekNum : -1,
        surveyTitle : '',
        answerList : [],
        questList : [],
        isReverseList: [] 
    } )

    const candidateWeekNum : number[] = Array.from({length:15}, (v,i)=>i+2); 
    const candidateNumAns : number[] = Array.from({length:9}, (v,i)=>i+2); 
    const candidateNumQuest : number[] = Array.from({length:49}, (v,i)=>i+2); 

    const getAnswerList  = (num : number) => {
        let answerList = [];
        for(let i = 1; i <= num; i++) {
            answerList.push(           
                <Zoom in={true} key={i}>
                    <Stack sx={{width:stackItemSize + "%"}}>
                        <InputLabel shrink sx={{ fontSize: "25px"}}>
                            답변 {i}
                        </InputLabel>
                        <TextField placeholder='검사 제목을 입력해주세요' 
                            onChange={(e) => changeAnswerContent(e, i-1)}/>
                    </Stack>
                </Zoom>             
            )
        }
        return answerList;
    }

    const getQuestList  = (num : number) => {
        let answerList = [];
        for(let i = 1; i <= num; i++) {
            answerList.push(          
                <Zoom in={true} key={i}>  
                    <Stack sx={{width:stackItemSize + "%"}} key={i}>
                        <Box sx={{display:"flex", alignItems:"end"}}>
                            <InputLabel shrink sx={{ fontSize: "25px"}}>
                                질문 {i}
                            </InputLabel>
                            <Checkbox onChange={(e) => changeIsReverse(e, i - 1)}/>
                        </Box>
                            <TextField sx={{ size: 'medium' }}
                                placeholder='검사 제목을 입력해주세요'
                                onChange={(e) => changeQuestContent(e, i - 1)} />
                    </Stack>
                </Zoom>
            )
        }
        return answerList;
    }

    const changeWeekNum = (event: SelectChangeEvent) => {
        outputData.current.weekNum = Number(event.target.value);
        setWeekNum(Number(event.target.value));
    };

    const changeSurveyTitle = (event: ChangeEvent<HTMLInputElement>) => {
        outputData.current.surveyTitle = event.target.value;
    }

    const changeAnswerContent = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx : number) => {
        outputData.current.answerList[idx] = event.target.value;
    }

    const changeQuestContent = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx : number) => {
        outputData.current.questList[idx] = event.target.value;
    }

    const changeIsReverse = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx : number) => {
        outputData.current.isReverseList[idx] = event.target.value;
    }


    const changeNumOfAnswer = (event : SelectChangeEvent) => {
        outputData.current.answerList.length = Number(event.target.value); 
        setNumOfAnswer(Number(event.target.value));
    };

    const changeNumOfQuest = (event : SelectChangeEvent) => {
        outputData.current.questList.length = Number(event.target.value); 
        outputData.current.isReverseList.length = Number(event.target.value); 
        setNumOfQuest(Number(event.target.value));
    };

    const sumbitBtnClickHandler  = async () => {
        console.log(outputData)
    }


    return (         
        <Container maxWidth="lg">
            <Stack spacing={3} alignItems="center">
                <Stack sx={{width:stackItemSize + "%"}}>
                    <InputLabel shrink sx={{fontSize:"25px"}}>
                        주차
                    </InputLabel>
                    <Select onChange={changeWeekNum}
                        value={weekNum >= 2 ? String(weekNum) : ''}>
                        {candidateWeekNum.map(num => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                        ))}
                    </Select>
                </Stack>
                <Stack sx={{width:stackItemSize + "%"}}>
                    <InputLabel shrink sx={{fontSize:"25px"}}>
                        검사 제목
                    </InputLabel>
                    <TextField placeholder='검사 제목을 입력해주세요' onChange={changeSurveyTitle}></TextField>
                </Stack>
                <Box sx={{border:"solid 0.1px #ced4da", width:"70%"}}/>
                <Stack sx={{width:stackItemSize + "%"}}>
                    <InputLabel shrink sx={{fontSize:"25px"}}>
                        답변 수
                    </InputLabel>
                    <Select onChange={changeNumOfAnswer}
                        value={numOfAnswer >= 2 ? String(numOfAnswer) : ''}>
                        {candidateNumAns.map(num => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                        ))}
                    </Select>
                </Stack>
                {numOfAnswer != 0 && getAnswerList(numOfAnswer)}
                <Box sx={{border:"solid 0.1px #ced4da", width:"70%"}}/>
                <Stack sx={{width:stackItemSize + "%"}}>
                    <InputLabel shrink sx={{fontSize:"25px"}}>
                        질문 수
                    </InputLabel>
                    <Select onChange={changeNumOfQuest}
                        value={numOfQuest >= 2 ? String(numOfQuest) : ''}>
                        {candidateNumQuest.map(num => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                        ))}
                    </Select>
                </Stack>
                {numOfQuest != 0 && getQuestList(numOfQuest)}
                <Box sx={{border:"solid 0.1px #ced4da", width:"70%"}}/>
                <Button
                    variant="outlined"
                    sx={{ width: "50%", height: "4rem" }}
                    onClick={sumbitBtnClickHandler}>
                    제출하기
                </Button>
        </Stack>

        </Container>
    );
}