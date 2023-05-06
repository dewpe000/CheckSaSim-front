import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { LoginModal } from './Login/LoginModal';
import { Header } from './Header/Header';
import { MainPage } from './UserPage/components/MainPage';
import { SideBar } from './UserPage/components/SideBar';
import { SurveyMetaDataType } from './UserPage/Interfaces';
import { globalTheme } from './theme';
import { Survey } from './UserPage/components/Survey';

function App() {
  const surveyData: SurveyMetaDataType[] = [
    {
      surveyTitle: "MBTI 검사1",
      week: 1,
      surveyId: 1,
    },
    {
      surveyTitle: "MBTI 검사2",
      week: 2,
      surveyId: 2,
    },
    {
      surveyTitle: "MBTI 검사3",
      week: 3,
      surveyId: 3,
    },
  ]
  const [barOpen, setBarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const changeBarOpen = (open: boolean) => {
    setBarOpen(open);
  }
  const changeIsAdmin = (isAdmin: boolean) => {
    setIsAdmin(isAdmin);
  }
  const changeModalOpen = (open: boolean) => {
    setModalOpen(open);
  }

  return (
    <ThemeProvider theme={globalTheme}>
      {modalOpen &&
        <LoginModal 
          modalOpen={modalOpen} 
          onChangeIsAdmin={changeIsAdmin} 
          onChangeModalOpen={changeModalOpen}
        />
      }
      <Header 
        isAdmin={isAdmin}
        onChangeBarOpen={changeBarOpen} 
        onChangeModalOpen={changeModalOpen} 
      />
      <SideBar 
        isAdmin={isAdmin} 
        surveyInfo={surveyData} 
        onChangeBarOpen={changeBarOpen} 
        barOpen={barOpen} 
      />
      <MainPage recentSurvey={surveyData}/>
    </ThemeProvider>
  );
}

export default App;
