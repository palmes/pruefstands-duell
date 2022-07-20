import React, { /*useEffect,*/ useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepOrange, indigo } from '@mui/material/colors';

const App = () => {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [mode, setMode] = useState("ps");
  const [difficulty, setDifficulty] = useState(1);

  const theme = createTheme({
    palette: {
      primary: indigo,
      secondary: deepOrange,
    },
    typography: {
      fontFamily: 'Barlow Semi Condensed',
    }
  })

  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundImage: "url(./pruefstand-blau.jpg)" }}>
        <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' exact element={<Home name={name} setName={setName} difficulty={difficulty} setDifficulty={setDifficulty} mode={mode} setMode={setMode}/>} />
          <Route path='/quiz' exact element={<Quiz score={score} setScore={setScore} setFinished={setFinished} mode={mode} difficulty={difficulty}/>} />
          <Route path='/result' exact element={<Result score={score} name={name} finished={finished} mode={mode} difficulty={difficulty}/>} />
        </Routes>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App
