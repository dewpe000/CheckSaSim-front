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

interface NewSurveyDataType {
    surveyTitle : string;
    answerList : any;
    questList : any;
    isReverseList : (boolean | string)[];
}

interface SurveyPostReqType {
    title : string;
    week_num : string;
    type : string;
    answers : string[];
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
    NewSurveyDataType,
    SurveyPostReqType,
    SurveyMetaDataType
}
