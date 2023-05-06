import { SideBar } from "./SideBar";
import { surveyInfoType } from "./SideBar";

export function Survey() {
    const surveyData: surveyInfoType[] = [
        {
          title : "MBTI 검사",
          week : 1
        },
        {
          title : "MBTI 검사",
          week : 2
        },
        {
          title : "MBTI 검사",
          week : 3
        },
      ]
    return (
        <div className="App">
            <SideBar isAdmin={true} surveyInfo={surveyData}/>
        </div>
    );
}