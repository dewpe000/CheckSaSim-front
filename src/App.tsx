import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { LoginModal } from './Login/LoginModal';
import { Header } from './Header/Header';
import { MainPage } from './UserPage/components/MainPage';
import { SideBar, surveyInfoType } from './UserPage/components/SideBar';
import { globalTheme } from './theme';
import { Survey } from './UserPage/components/Survey';
import { AddSurvey } from './AdminPage/components/AddSurvey';

function App() {
  const surveyData: surveyInfoType[] = [
    {
      title: "MBTI 검사1",
      week: 1,
      id: 1,
    },
    {
      title: "MBTI 검사2",
      week: 2,
      id: 2,
    },
    {
      title: "MBTI 검사2",
      week: 2,
      id: 2,
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
      <AddSurvey></AddSurvey>
      {/* {modalOpen &&
        <LoginModal 
          modalOpen={modalOpen} 
          onChangeIsAdmin={changeIsAdmin} 
          onChangeModalOpen={changeModalOpen}
        />
      }
      <Header 
        onChangeBarOpen={changeBarOpen} 
        onChangeModalOpen={changeModalOpen} 
      />
      <SideBar 
        isAdmin={isAdmin} 
        surveyInfo={surveyData} 
        onChangeBarOpen={changeBarOpen} 
        barOpen={barOpen} 
      />
      <MainPage recentSurvey={surveyData}/> */}
    </ThemeProvider>
  );
}

export default App;
