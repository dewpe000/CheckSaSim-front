interface QuestionInfoType {
    content : string;
    questId : number;
    isReverse : boolean;
    ansIdx : number;
};

interface AnswerInfoType {
    content : string;
    score : number;
    answerId : number;
};

interface SurveyInfoType {
    surveyId : number;
    surveyTitle : string;
    surveyType : string;
    questionData : QuestionInfoType[];
    answerData : AnswerInfoType[];
};


interface SurveyPostReqType {
    title : string;
    week_num : string;
    type : string;
    answers : string[];
    scores : string[];
    questions : {
        body : string;
        is_reverse : boolean;
        type : string;
    }[];
}

interface SurveyMetaDataType {
    surveyTitle: string,
    week: number,
    surveyId: number,
}

export type {
    SurveyInfoType,
    AnswerInfoType,
    QuestionInfoType,
    SurveyPostReqType,
    SurveyMetaDataType
}
