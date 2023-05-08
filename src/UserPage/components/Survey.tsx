import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from "react-router"
import { Box, Paper, Stack, RadioGroup, Radio, 
    Button, Container, Typography, CircularProgress } from '@mui/material';
import { SurveyInfoType, AnswerInfoType, QuestionInfoType } from '../Interfaces'

interface SurveyProps {
    isAdmin: boolean,
    getDataAfterDel: () => Promise<void>,
};
export function Survey(props : SurveyProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const getSurvey = async () => {
        const res = await fetch(`https://sasim.heegh.store/survey/${id}`, {
            method: "GET",
        })
        const data = await res.json();

        console.log(data)
        const initialSurveyData = {
            surveyId: data.results.id,
            surveyTitle: data.results.title,
            surveyType : data.results.type,
            questionData: data.results.questions.map((ques: any, idx: number) => (
                {
                    content: ques.body,
                    questId: ques.id,
                    ansIdx: -1,
                    isReverse: ques.is_reverse,
                }
            )),
            answerData: data.results.answers.map((ans: any, idx: number) => (
                {
                    content: ans,
                    score : Number(data.results.scores[idx]),
                    answerId: idx,
                }
            ))
        }
        initialSurveyData.questionData.sort((q1 : QuestionInfoType, q2 : QuestionInfoType) => {
            if(q1.questId > q2.questId) {
                return 1;
            }
            if(q1.questId === q2.questId) {
                return 0;
            }
            if(q1.questId < q2.questId) {
                return -1;
            }
        })

        setSurveyData(initialSurveyData)
        setIsBtnActive(false)
        setTotalScore(-1);
    }

    useEffect(() => {
        getSurvey();
    }, [id])

    let [isBtnActive, setIsBtnActive] = useState(false);
    let [totalScore, setTotalScore] = useState(-1);
    let [surveyData, setSurveyData] = useState({} as SurveyInfoType);


    // 체크 박스 변경시 이벤트
    const changeAnsIdx = (event: ChangeEvent<HTMLInputElement>) => {

        let hasNoCheck : boolean = false;
        surveyData.questionData.forEach(function (quest: QuestionInfoType) {
            if (quest.questId === Number(event.target.name)) {
                quest.ansIdx = Number(event.target.value);
            }
            if (quest.ansIdx === -1) {
                hasNoCheck = true;
            }
        })
        
        setIsBtnActive(!hasNoCheck);
    };

    //최종 점수 계산
    const calcTotalScore = () => {

        if(surveyData.surveyType == 'SCORE') {
            let sum = 0;
    
            surveyData.questionData.forEach((quest : QuestionInfoType) => {
                if(quest.isReverse) {
                    sum += surveyData.answerData[(surveyData.answerData.length) - quest.ansIdx - 1].score;
                }
                else {
                    sum += surveyData.answerData[quest.ansIdx].score;
                }
            })
    
            setTotalScore(sum);
        }
        else {
            let numOfYes = 0;
            surveyData.questionData.forEach((quest : QuestionInfoType) => {
                if(surveyData.answerData[quest.ansIdx].score == 1) {
                    numOfYes += 1;
                }
            })
            setTotalScore(numOfYes);
        }

    };

    const deleteButtonClickHandler = async () => {
        await fetch(`https://sasim.heegh.store/survey/${id}`, {
            method: 'DELETE',
        })
        props.getDataAfterDel();
        navigate('/');
    }


    return (
        <Container maxWidth="xl" sx={{mt: 3, mb: 3}}>
            {!surveyData.surveyTitle ? 
                <CircularProgress color="success" sx={{alignSelf: 'center'}}/> :
                <Stack spacing={2}>
                    <Typography variant="h4" color="primary.main" sx={{textAlign: "center"}}>
                        {`< ${surveyData.surveyTitle} >`}
                    </Typography>
                    <Box sx={{display:"flex"}}>
                        <Paper sx={{...centerStyle, width:"60%", backgroundColor: "primary.main"}}>
                            <Typography sx={{color: "white"}}>
                                질문
                            </Typography>
                        </Paper>
                        <Paper sx={{...centerStyle, width:"40%", backgroundColor: "primary.main"}}>
                                {surveyData.answerData?.map(ans => (
                                    <Box 
                                        sx={{ 
                                            textAlign:"center", 
                                            width: 100/(surveyData.answerData.length) + "%", 
                                            fontSize: "0.9rem",
                                            color: "white",
                                        }} 
                                        key={ans.answerId}
                                    >
                                        {ans.content}
                                    </Box>
                                ))}
                        </Paper>
                    </Box>
                    
                    {surveyData.questionData?.map((quest: QuestionInfoType) => (
                        <Box sx={{ display:"flex" }} key={quest.questId}>
                            <Paper sx={{...centerStyle, width:"60%"}}>
                                    {quest.content}
                            </Paper>
                            <Paper sx={{ width:"40%", height:"3rem"}}>
                                <RadioGroup row
                                    onChange={changeAnsIdx}>
                                    {surveyData.answerData?.map((ans : AnswerInfoType) => (
                                        <Box sx={{textAlign:"center", width:100/(surveyData.answerData.length) + "%"}}
                                            key={quest.questId* 1000 + ans.answerId}>
                                            <Radio
                                                value={ans.answerId}
                                                name={quest.questId + ""}
                                            />
                                        </Box>
                                    ))}
                                </RadioGroup>
                            </Paper>
                        </Box>
                    ))}
                    <Button 
                        variant="outlined"
                        sx={{width: "70%", alignSelf: "center"}}
                        disabled = {!isBtnActive}
                        onClick={calcTotalScore}>
                        결과 확인
                    </Button>
                    {totalScore !== -1 &&
                        <Typography 
                            sx={{textAlign: "center"}} 
                            color="primary.main"
                        >   { surveyData.surveyType === 'SCORE' ?
                                <>총점 : {totalScore}</> : 
                                <>예 : {totalScore}   아니요 : {surveyData.questionData.length - totalScore}</>
                            }
                        </Typography>
                    }
                    {props.isAdmin &&
                        <Button 
                            variant="outlined"
                            sx={{width: "70%", alignSelf: "center", color: "gray"}}
                            onClick={deleteButtonClickHandler}>
                            설문지 삭제하기
                        </Button>
                    }
                </Stack>   
            }
        </Container>
    );
}
const centerStyle = {
    display: "flex",
    justifyContent:'center', 
    alignItems:"center",
    height: "3rem",
}
