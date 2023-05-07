import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from "react-router"
import { Box, Paper, Stack, RadioGroup, Radio, 
    Button, Container, Typography } from '@mui/material';
import { SurveyInfoType, AnswerInfoType, QuestionInfoType } from '../Interfaces'

interface SurveyProps {
    isAdmin: boolean,
    getDataAfterDel: () => Promise<void>,
};
export function Survey(props : SurveyProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const getSurvey = async () => {
        const res = await fetch(`http://13.209.90.70:80/survey/${id}`, {
            method: "GET",
        })
        const data = await res.json();
        const initialSurveyData = {
            surveyId: data.results.id,
            surveyTitle: data.results.title,
            questionData: data.results.questions.map((ques: any, idx: number) => (
                {
                    content: ques.body,
                    questId: ques.id,
                    score: 0,
                    isReverse: ques.is_reverse,
                }
            )),
            answerData: data.results.answers.map((ans: any, idx: number) => (
                {
                    content: ans,
                    answerId: idx+1,
                }
            ))
        }
        setSurveyData(initialSurveyData)
    }

    useEffect(() => {
        getSurvey();
    }, [id])

    let [isBtnActive, setIsBtnActive] = useState(false);
    let [totalScore, setTotalScore] = useState(-1);
    let [surveyData, setSurveyData] = useState({} as SurveyInfoType);


    // 체크 박스 변경시 이벤트
    const changeScore = (event: ChangeEvent<HTMLInputElement>) => {

        let hasZero : boolean = false;
        surveyData.questionData.forEach(function (quest: QuestionInfoType) {
            if (quest.questId === Number(event.target.name)) {
                quest.score = Number(event.target.value);
            }
            if (quest.score === 0) {
                hasZero = true;
            }
        })
        
        setIsBtnActive(!hasZero);
    };

    //최종 점수 계산
    const calcTotalScore = () => {
        let sum = 0;
        console.log(surveyData.questionData)

        surveyData.questionData.forEach((quest : QuestionInfoType) => {
            if(quest.isReverse) {
                sum += (surveyData.answerData.length) - quest.score + 1;
            }
            else {
                sum += quest.score;
            }
        })

        setTotalScore(sum);
    };

    const deleteButtonClickHandler = async () => {
        await fetch(`http://13.209.90.70:80/survey/${id}`, {
            method: 'DELETE',
        })
        props.getDataAfterDel();
        navigate('/');
    }


    return (
        <Container maxWidth="lg" sx={{mt: 3, mb: 3}}>
            <Stack spacing={2}>
                {/* 설문조사 헤더 */}
                <Box sx={{display:"flex"}}>
                    <Paper sx={{...centerStyle, width:"60%"}}>
                        <Typography sx={{color: "primary.main"}}>
                            {surveyData.surveyTitle}
                        </Typography>
                    </Paper>
                    <Paper sx={{...centerStyle, width:"40%"}}>
                            {surveyData.answerData?.map(ans => (
                                <Box 
                                    sx={{ 
                                        textAlign:"center", 
                                        width: 100/(surveyData.answerData.length) + "%", 
                                        fontSize: "0.9rem",
                                        color: "primary.main",
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
                                onChange={changeScore}>
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
                    >
                        총점 : {totalScore}
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
        </Container>
    );
}
const centerStyle = {
    display: "flex",
    justifyContent:'center', 
    alignItems:"center",
    height: "3rem",
}
