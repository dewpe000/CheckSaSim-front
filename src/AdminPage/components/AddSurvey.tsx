import { Container, Select, SelectChangeEvent, MenuItem, TextField, Stack, Checkbox, Divider, InputLabel, Box, Button} from '@mui/material';
import { useState, useRef, ChangeEvent } from 'react';
import { newSurveyDataType } from '../../UserPage/Interfaces';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export function AddSurvey() {
    const [weekNum, setWeekNum] = useState<number>(0);
    const [numOfAnswer, setNumOfAnswer] = useState<number>(0);
    const [numOfQuest, setNumOfQuest] = useState<number>(0);


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
            <Stack key={i}>
                <InputLabel shrink sx={{ fontSize: "25px"}}>
                    답변 {i}
                </InputLabel>
                <TextField placeholder='검사 제목을 입력해주세요' 
                    onChange={(e) => changeAnswerContent(e, i-1)}/>
            </Stack>)
        }
        return answerList;
    }

    const getQuestList  = (num : number) => {
        let answerList = [];
        for(let i = 1; i <= num; i++) {
            answerList.push(                        
            <Stack key={i}>
                <InputLabel shrink sx={{ fontSize: "25px" }}>
                    답변 {i}
                </InputLabel>
                <Box sx={{display:"flex"}}>
                    <TextField sx={{flexGrow:'9.9', size:'medium'}} 
                        placeholder='검사 제목을 입력해주세요'
                        onChange={(e) => changeQuestContent(e, i-1)}/>
                    <Checkbox sx={{flexGrow:'0.1'}}
                        onChange={(e) => changeIsReverse(e, i-1)}/>
                </Box>
            </Stack>)
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
        console.log(outputData.current.answerList);

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
        <Container maxWidth="md">
            <Stack spacing={3}>
                <Stack>
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
                <Stack>
                    <InputLabel shrink sx={{fontSize:"25px"}}>
                        검사 제목
                    </InputLabel>
                    <TextField placeholder='검사 제목을 입력해주세요' onChange={changeSurveyTitle}></TextField>
                </Stack>
                <Divider/>
                <Stack>
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
                <Divider/>
                <Stack>
                    <InputLabel shrink sx={{fontSize:"25px"}}>
                        질문수 수
                    </InputLabel>
                    <Select onChange={changeNumOfQuest}
                        value={numOfQuest >= 2 ? String(numOfQuest) : ''}>
                        {candidateNumQuest.map(num => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                        ))}
                    </Select>
                </Stack>
                {numOfQuest != 0 && getQuestList(numOfQuest)}
                <Divider/>
                <Button
                    variant="outlined"
                    sx={{ height: "4rem" }}
                    onClick={sumbitBtnClickHandler}>
                    제출하기
                </Button>
        </Stack>

        </Container>
    );
}