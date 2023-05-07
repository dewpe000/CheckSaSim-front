import { Container, Stack, Select, SelectChangeEvent, MenuItem, 
    InputLabel, TextField, Checkbox, Box, Button, Zoom} from '@mui/material';
import { useState, ChangeEvent } from 'react';
import { useNavigate } from "react-router"
import { NewSurveyDataType, SurveyPostReqType } from '../../UserPage/Interfaces';

interface AddSurveyProps {
    getDataAfterAdd: () => Promise<void>,
}
export function AddSurvey(props: AddSurveyProps) {
    const navigate = useNavigate();
    const [weekNum, setWeekNum] = useState<number>(0);
    const [numOfAnswer, setNumOfAnswer] = useState<number>(0);
    const [numOfQuest, setNumOfQuest] = useState<number>(0);
    const [isSubmitBtnClicked, setIsSubmitBtnClicked] = useState<boolean>(false);
    const [outputData, setOutputData] = useState<NewSurveyDataType>({
        surveyTitle : '',
        answerList : [],
        questList : [],
        isReverseList: [] 
    })

    const stackItemSize = 60;


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
                            error={isSubmitBtnClicked && !outputData.answerList[i - 1]}
                            onChange={(e) => changeAnswerContent(e, i-1)}/>
                    </Stack>
                </Zoom>             
            )
        }
        return answerList;
    }

    const getQuestList  = (num : number) => {
        let questList = [];
        for(let i = 1; i <= num; i++) {
            questList.push(          
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
                                error={isSubmitBtnClicked && !outputData.questList[i - 1]}
                                onChange={(e) => changeQuestContent(e, i - 1)} />
                    </Stack>
                </Zoom>
            )
        }
        return questList;
    }

    const changeWeekNum = (event: SelectChangeEvent) => {
        setWeekNum(Number(event.target.value));
    };

    const changeSurveyTitle = (event: ChangeEvent<HTMLInputElement>) => {
        let temp : NewSurveyDataType = {...outputData};
        temp.surveyTitle = event.target.value;
        setOutputData(temp);
    }

    const changeAnswerContent = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx : number) => {
        let temp : NewSurveyDataType = {...outputData};
        temp.answerList[idx] = event.target.value;
        setOutputData(temp);
    }

    const changeQuestContent = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx : number) => {
        let temp : NewSurveyDataType = {...outputData};
        temp.questList[idx] = event.target.value;
        setOutputData(temp);
    }

    const changeIsReverse = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx : number) => {
        let temp : NewSurveyDataType = {...outputData};
        temp.isReverseList[idx] = event.target.value;
        setOutputData(temp);
    }


    const changeNumOfAnswer = (event : SelectChangeEvent) => {
        let temp : NewSurveyDataType = {...outputData};
        temp.answerList.length = Number(event.target.value);
        setOutputData(temp); 
        setNumOfAnswer(Number(event.target.value));
    };

    const changeNumOfQuest = (event : SelectChangeEvent) => {
        let temp : NewSurveyDataType = {...outputData};
        temp.questList.length = Number(event.target.value);
        temp.isReverseList.length = Number(event.target.value);
        setOutputData(temp); 
        setNumOfQuest(Number(event.target.value));
    };

    const submitBtnClickHandler  = async () => {
        let surveyPostData : SurveyPostReqType = {
            title : "",
            week_num : "",
            type : "",
            answers : [],
            questions : []
        };

        setIsSubmitBtnClicked(true)

        if(outputData.surveyTitle === '' && weekNum === 0) {
            console.log("fail : add survey")
            return;
        }

        surveyPostData.title = outputData.surveyTitle;
        surveyPostData.week_num = String(weekNum);
        surveyPostData.type = "NONE";
        
        for(let i = 0; i < numOfAnswer; i++) {
            if(!outputData.answerList[i]) {
                console.log("fail : add survey")
                return;
            }
            surveyPostData.answers.push(outputData.answerList[i]);
        }
        for(let i = 0; i < numOfQuest; i++) {
            if(!outputData.questList[i]) {
                console.log("fail : add survey")
                return;
            }

            if(outputData.isReverseList[i] === "on") {
                outputData.isReverseList[i] = true;
            } 
            else {
                outputData.isReverseList[i] = false;
            }
            surveyPostData.questions.push({ 
                body : outputData.questList[i],
                is_reverse : outputData.isReverseList[i] as boolean,
                type : "NONE"
            });
        }

        await fetch("http://13.209.90.70:80/survey", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(surveyPostData),
        });
        
        props.getDataAfterAdd();
        navigate('/');
    }


    return (         
        <Container maxWidth="lg" sx={{mt: 3, mb: 3}}>
            <Stack spacing={3} alignItems="center">
                <Stack sx={{width:stackItemSize + "%"}}>
                    <InputLabel shrink sx={{fontSize:"25px"}}>
                        주차
                    </InputLabel>
                    <Select onChange={changeWeekNum}
                        value={weekNum >= 2 ? String(weekNum) : ''}
                        error={isSubmitBtnClicked && weekNum === 0}
                        >

                        {candidateWeekNum.map(num => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                        ))}
                    </Select>
                </Stack>
                <Stack sx={{width:stackItemSize + "%"}}>
                    <InputLabel shrink sx={{fontSize:"25px"}}>
                        검사 제목
                    </InputLabel>
                    <TextField placeholder='검사 제목을 입력해주세요' 
                        onChange={changeSurveyTitle}
                        error={isSubmitBtnClicked && outputData.surveyTitle === ''}
                    >  
                    </TextField>
                </Stack>
                <Box sx={{border:"solid 0.1px #ced4da", width:"70%"}}/>
                <Stack sx={{width:stackItemSize + "%"}}>
                    <InputLabel shrink sx={{fontSize:"25px"}}>
                        답변 수
                    </InputLabel>
                    <Select onChange={changeNumOfAnswer}
                        value={numOfAnswer >= 2 ? String(numOfAnswer) : ''}
                        error={isSubmitBtnClicked && numOfAnswer < 2}
                    >
                        {candidateNumAns.map(num => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                        ))}
                    </Select>
                </Stack>
                {numOfAnswer !== 0 && getAnswerList(numOfAnswer)}
                <Box sx={{border:"solid 0.1px #ced4da", width:"70%"}}/>
                <Stack sx={{width:stackItemSize + "%"}}>
                    <InputLabel shrink sx={{fontSize:"25px"}}>
                        질문 수
                    </InputLabel>
                    <Select onChange={changeNumOfQuest}
                        value={numOfQuest >= 2 ? String(numOfQuest) : ''}
                        error={isSubmitBtnClicked && numOfQuest < 2}
                        >
                        {candidateNumQuest.map(num => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                        ))}
                    </Select>
                </Stack>
                {numOfQuest !== 0 && getQuestList(numOfQuest)}
                <Box sx={{border:"solid 0.1px #ced4da", width:"70%"}}/>
                <Button
                    variant="outlined"
                    sx={{ width: "50%", height: "4rem" }}
                    onClick={submitBtnClickHandler}>
                    제출하기
                </Button>
        </Stack>

        </Container>
    );
}