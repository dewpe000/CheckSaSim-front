import { Container, Stack, Select, SelectChangeEvent, MenuItem, 
    InputLabel, TextField, Checkbox, Box, Button, Zoom, Typography, FormControlLabel} from '@mui/material';
import { useState, ChangeEvent } from 'react';
import { useNavigate } from "react-router"
import { SurveyPostReqType } from '../../UserPage/Interfaces';

interface AddSurveyProps {
    getDataAfterAdd: () => Promise<void>,
}
export function AddSurvey(props: AddSurveyProps) {
    const navigate = useNavigate();

    //설문 조사 결과를 저장하는 state
    const [weekNum, setWeekNum] = useState<number>(0);
    const [surveyTitle, setSurveyTitle] = useState<string>("");
    const [surveyType, setSurveyType] = useState<string>("SCORE");
    const [answerList, setAnswerList] = useState<string[]>([]);
    const [answerScoreList, setAnswerScoreList] = useState<string[]>([]);
    const [questList, setQuestList] = useState<string[]>([]);
    const [isReverseList, setIsReverseList] = useState<(string|boolean)[]>([]);
    const [isSubmitBtnClicked, setIsSubmitBtnClicked] = useState<boolean>(false);

    const changeWeekNum = (event: SelectChangeEvent) => {
        setWeekNum(Number(event.target.value));
    };

    const changeSurveyTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setSurveyTitle(event.target.value);
    }

    const changeSurveyType = (event : SelectChangeEvent) => {
        setSurveyType(event.target.value);
    }

    const changeNumOfAnswer = (event : SelectChangeEvent) => {
        let temp : string[] = [...answerList];
        temp.length = Number(event.target.value);
        setAnswerList(temp); 
    };

    const changeNumOfQuest = (event : SelectChangeEvent) => {
        let temp : string[] = [...answerList];
        temp.length = Number(event.target.value);
        setQuestList(temp); 
    };

    const changeAnswerContent = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx : number) => {
        let temp : string[] = [...answerList];
        temp[idx] = event.target.value;
        setAnswerList(temp);
    }
    const changeAnswerScore = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx : number) => {
        let temp : string[] = [...answerScoreList];
        temp[idx] = event.target.value;
        setAnswerScoreList(temp);
    }
    const changeQuestContent = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx : number) => {
        let temp : string[] = [...questList];
        temp[idx] = event.target.value;
        setQuestList(temp);
    }

    const changeIsReverse = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx : number) => {
        let temp : (string|boolean)[] = [...isReverseList];
        temp[idx] = event.target.value;
        setIsReverseList(temp);
    }

    const stackItemSize = 60;

    // Select(주차, 답변수, 질문수) 하드코딩
    const candidateWeekNum : number[] = Array.from({length:16}, (v,i)=>i+1); 
    const candidateNumAns : number[] = Array.from({length:9}, (v,i)=>i+2); 
    const candidateNumQuest : number[] = Array.from({length:49}, (v,i)=>i+2); 

    // 답변 리스트 만들기
    const renderAnswerList  = (num : number) => {
        let answerList = [];
        for(let i = 1; i <= num; i++) {
            answerList.push(           
                <Zoom in={true} key={i}>
                    <Stack sx={{width:stackItemSize + "%"}}>
                        {renderInputLabel(`답변 ${i}`)}
                        <Box sx={{display: "flex"}}>
                        <TextField placeholder='답변을 입력해주세요' 
                            error={isSubmitBtnClicked && !answerList[i - 1]}
                            onChange={(e) => changeAnswerContent(e, i-1)}
                            sx={{width : '85%'}}/>
                        <TextField placeholder='점수' 
                            error={isSubmitBtnClicked && !answerScoreList[i - 1]}
                            onChange={(e) => changeAnswerScore(e, i-1)}
                            inputProps={{type:'number'}}
                            sx={{width : '15%'}}/>
                        </Box>

                    </Stack>
                </Zoom>             
            )
        }
        return answerList;
    }

    // 질문 리스트 만들기
    const renderQuestList  = (num : number) => {
        let questList = [];
        for(let i = 1; i <= num; i++) {
            questList.push(          
                <Zoom in={true} key={i}>  
                    <Stack sx={{width:stackItemSize + "%"}} key={i}>
                        <Box sx={{display:"flex"}}>
                            {renderInputLabel(`질문 ${i}`)}
                            <Checkbox onChange={(e) => changeIsReverse(e, i - 1)}/>
                        </Box>
                            <TextField sx={{ size: 'medium' }}
                                placeholder='질문을 입력해주세요'
                                error={isSubmitBtnClicked && !questList[i - 1]}
                                onChange={(e) => changeQuestContent(e, i - 1)} />
                    </Stack>
                </Zoom>
            )
        }
        return questList;
    }

    const renderDivider = () => (
        <Box sx={{border:"solid 0.1rem", width:"60%", color: "primary.main"}}/>
    )

    const renderInputLabel = (label: string) => (
        <Typography sx={{ margin: "revert", fontSize: '1rem'}}>
            {label}
        </Typography>
    )

    const submitBtnClickHandler  = async () => {
        let surveyPostData : SurveyPostReqType = {
            title : "",
            week_num : "",
            type : "",
            answers : [],
            scores : [],
            questions : []
        };

        setIsSubmitBtnClicked(true)

        if(surveyTitle === '' || weekNum === 0 || (surveyType === 'SCORE' && answerList.length === 0) || questList.length == 0) {
            console.log("fail : add survey")
            return;
        }

        surveyPostData.title = surveyTitle;
        surveyPostData.week_num = String(weekNum);
        surveyPostData.type = surveyType;

        for(let i = 0; i < questList.length; i++) {
            if(!questList[i]) {
                console.log("fail : add survey")
                return;
            }

            if(isReverseList[i] === "on") {
                isReverseList[i] = true;
            } 
            else {
                isReverseList[i] = false;
            }
            surveyPostData.questions.push({ 
                body : questList[i],
                is_reverse : isReverseList[i] as boolean,
                type : surveyType
            });
        }

        if(surveyType === "SCORE") {
            for(let i = 0; i < answerList.length; i++) {
                if(!answerList[i] || !answerScoreList[i]) {
                    console.log("fail : add survey")
                    return;
                }
                surveyPostData.answers.push(answerList[i]);
                surveyPostData.scores.push(answerScoreList[i]);
            }
        }
        else {
            surveyPostData.answers = ["예", "아니오"];
            surveyPostData.scores = ['1', '0'];
        }


        await fetch("https://sasim.heegh.store/survey", {
            method: "POST",
            credentials: "include",
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
                    {renderInputLabel("주차")}
                    <Select onChange={changeWeekNum}
                        value={weekNum >= 1 ? String(weekNum) : ''}
                        error={isSubmitBtnClicked && weekNum === 0}
                        >
                        {candidateWeekNum.map(num => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                        ))}
                    </Select>
                </Stack>
                <Stack sx={{width:stackItemSize + "%"}}>
                    {renderInputLabel("자기평가 제목")}
                    <TextField placeholder='자기평가 제목을 입력해주세요' 
                        onChange={changeSurveyTitle}
                        error={isSubmitBtnClicked && surveyTitle === ''}
                    >  
                    </TextField>
                </Stack>
                <Stack sx={{width:stackItemSize + "%"}}>
                    {renderInputLabel("채점 종류")}
                        <Select onChange={changeSurveyType}
                            defaultValue='SCORE'
                            >
                            <MenuItem value='SCORE'>점수</MenuItem>
                            <MenuItem value='YN'>예 아니오</MenuItem>
                        </Select>

                </Stack>
                {surveyType === 'SCORE' &&
                <>
                {renderDivider()}
                <Stack sx={{width:stackItemSize + "%"}}>
                    {renderInputLabel("답변 수")}
                    <Select onChange={changeNumOfAnswer}
                        value={answerList.length >= 2 ? String(answerList.length) : ''}
                        error={isSubmitBtnClicked && answerList.length < 2}>
                        {candidateNumAns.map(num => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                        ))}
                    </Select>
                </Stack>
                {answerList.length !== 0 && renderAnswerList(answerList.length)}
                </>
                }
                {renderDivider()}
                <Stack sx={{width:stackItemSize + "%"}}>
                    {renderInputLabel("질문 수")}
                    <Select onChange={changeNumOfQuest}
                        value={questList.length >= 2 ? String(questList.length) : ''}
                        error={isSubmitBtnClicked && questList.length < 2}
                        >
                        {candidateNumQuest.map(num => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                        ))}
                    </Select>
                </Stack>
                {questList.length !== 0 && renderQuestList(questList.length)}
               {renderDivider()}
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