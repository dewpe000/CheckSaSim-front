interface QuestionInfoType {
    content : string;
    questId : number;
    isReverse : boolean;
    score : number;
};

interface AnswerInfoType {
    content : string;
    answerId : number;
};

interface SurveyInfoType {
    surveyId : number;
    surveyTitle : string;
    questionData : QuestionInfoType[];
    answerData : AnswerInfoType[];
};

interface SurveyMetaDataType {
    surveyTitle: string,
    week: number,
    surveyId: number,
}

export type {
    SurveyInfoType,
    AnswerInfoType,
    QuestionInfoType,
    SurveyMetaDataType
}
