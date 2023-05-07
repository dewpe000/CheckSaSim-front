import { useState, useEffect, useRef } from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { LoginModal } from './Login/LoginModal';
import { Header } from './Header/Header';
import { SurveyMetaDataType } from './UserPage/Interfaces';
import { MainPage, SideBar, Survey } from './UserPage';
import { globalTheme } from './theme';
import { AddSurvey } from './AdminPage/components/AddSurvey';
import './App.css';

function App() {
  const [surveyData, setSurveyData]  = useState<SurveyMetaDataType[]>([])
  const getRecentData = async () => {
    const res = await fetch('http://13.209.90.70:80/survey', {
      method: "GET"
    })
    const data = await res.json()
    const recentData: SurveyMetaDataType[] = data.results.map((res: any) => (
      {
        surveyTitle: res.title,
        week: res.week_num,
        surveyId: res.id,
      }
    ))
    setSurveyData(recentData)
  }
  
  useEffect(() => {
    getRecentData();
  }, [])

  const [barOpen, setBarOpen] = useState(false);
  const isAdmin = useRef<boolean>(false)
  const [modalOpen, setModalOpen] = useState(false);

  const changeBarOpen = (open: boolean) => {
    setBarOpen(open);
  }
  const changeIsAdmin = (admin: boolean) => {
    isAdmin.current = admin;
  }
  const changeModalOpen = (open: boolean) => {
    setModalOpen(open);
  }

  return (
    <ThemeProvider theme={globalTheme}>
      <Router>
        {modalOpen &&
          <LoginModal 
            modalOpen={modalOpen} 
            onChangeIsAdmin={changeIsAdmin} 
            onChangeModalOpen={changeModalOpen}
          />
        }
        <Header 
          isAdmin={isAdmin.current}
          onChangeBarOpen={changeBarOpen} 
          onChangeModalOpen={changeModalOpen} 
        />
        <SideBar 
          isAdmin={isAdmin.current} 
          surveyInfo={surveyData} 
          onChangeBarOpen={changeBarOpen} 
          barOpen={barOpen} 
        />
        <Routes>
          <Route path="/survey/:id" element={<Survey isAdmin={isAdmin.current} getDataAfterDel={getRecentData}/>}></Route>
          <Route path="/" element={<MainPage recentSurvey={surveyData}/>}></Route>
          <Route path="/add" element={<AddSurvey getDataAfterAdd={getRecentData} />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
