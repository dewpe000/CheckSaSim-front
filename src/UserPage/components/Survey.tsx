import { useState } from 'react';
import { Box, Paper, Stack, RadioGroup, Radio, 
    Button, Container, Typography } from '@mui/material';
import { SurveyInfoType, AnswerInfoType, QuestionInfoType } from '../Interfaces'

interface SurveyProps {
    surveyId : number;
};

export function Survey(props : SurveyProps) {

    let [surveyId, setSurveyId] = useState(props.surveyId);
    let [isBtnActive, setIsBtnActive] = useState(false);
    let [totalScore, setTotalScore] = useState(-1);
    let [surveyData, setSurveyData] = useState({
        surveyId : 1,
        surveyTitle : "2주차 ~~~~검사하기",
        questionData : [ 
            { content: "AAAAAAAAAAAAAAAA", questId : 1, score : 0, isReverse : false},
            { content: "VVVVVVVVVVVVVVVV", questId : 2, score : 0, isReverse : false},
            { content: "CCCCCCCCCCCCCCCCCCCCCC", questId : 3, score : 0, isReverse : false},
            { content: "DDDDDDDDDDDDD", questId : 4, score : 0, isReverse : false},
        ],
        answerData : [
            { content: "매우 아니다", answerId : 1 },
            { content: "아니다", answerId : 2 },
            { content: "보통이다", answerId : 3 },
            { content: "그렇다", answerId : 4 },
            { content: "매우 그렇다", answerId : 5 }
        ]
    });

    let numAnswer : number = surveyData.answerData.length;

    // 체크 박스 변경시 이벤트
    const changeScore = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                sum += numAnswer - quest.score + 1;
            }
            else {
                sum += quest.score;
            }
        })

        setTotalScore(sum);
    };

    return (
        <Container maxWidth="lg" sx={{mt: 3}}>
            <Stack spacing={2}>
                {/* 설문조사 헤더 */}
                <Box sx={{display:"flex"}}>
                    <Paper sx={{...centerStyle, width:"60%"}}>
                        <Typography sx={{color: "primary.main"}}>
                            {surveyData.surveyTitle}
                        </Typography>
                    </Paper>
                    <Paper sx={{...centerStyle, width:"40%"}}>
                            {surveyData.answerData.map(ans => (
                                <Box 
                                    sx={{ 
                                        textAlign:"center", 
                                        width: 100/numAnswer + "%", 
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
                
                {surveyData.questionData.map(quest => (
                    <Box sx={{ display:"flex" }} key={quest.questId}>
                        <Paper sx={{...centerStyle, width:"60%"}}>
                                {quest.content}
                        </Paper>
                        <Paper sx={{ width:"40%", height:"3rem"}}>
                            <RadioGroup row
                                onChange={changeScore}>
                                {surveyData.answerData.map(ans => (
                                    <Box sx={{textAlign:"center", width:100/numAnswer + "%"}}
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
