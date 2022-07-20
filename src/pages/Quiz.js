import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import data from '../data/halle77.json'
import { useNavigate } from 'react-router-dom';


const Quiz = ({score, setScore, setFinished, mode, difficulty}) => {
    const [prevQuestion, setPrevQuestion] = useState({})
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [questions, setQuestions] = useState([])
    const [showAnswer, setShowAnswer] = useState(false)
    const [showCorrect, setShowCorrect] = useState(false)
    const [showIncorrect, setShowIncorrect] = useState(false)
    const [slide, setSlide] = useState(false)

    const navigate = useNavigate();

    const nextQuestion = () => {
        let questionsLocal = questions;
        let currIndex = questionsLocal.findIndex((quest) => quest.id === currentQuestion.id);
        questionsLocal[currIndex].used = true;
        let availableQuestions = [];
        if (difficulty === 2) {
            availableQuestions = questionsLocal.filter((quest) => (quest.used === false) && (quest.value > currentQuestion.value * 0.8) && (quest.value < currentQuestion.value * 1.2));
            console.log(availableQuestions.length)
        }
        if (difficulty === 0) {
            availableQuestions = questionsLocal.filter((quest) => (quest.used === false) && ((quest.value < currentQuestion.value * 0.8) || (quest.value > currentQuestion.value * 1.2)));
            console.log(availableQuestions.length)

        }
        if (availableQuestions.length === 0) {
            availableQuestions = questionsLocal.filter((quest) => quest.used === false);
            console.log(availableQuestions.length)

        }
        setQuestions(questionsLocal);
        setPrevQuestion(currentQuestion);
        availableQuestions.length>0 ? setCurrentQuestion(availableQuestions[Math.floor(Math.random()*availableQuestions.length)]) : setCurrentQuestion({});
    }

    const handleHigher = () => {
        if(currentQuestion.value >= prevQuestion.value) {
            setShowCorrect(true);
            setShowAnswer(true);
            setTimeout(() => {setShowAnswer(false)},2000);
            setTimeout(() => {setShowCorrect(false)},1000);
            setTimeout(() => {correctAnswer()},2000);
            setTimeout(() => {setSlide(true)},1000);
            setTimeout(() => {setSlide(false)},2000);
        } else {
            setShowIncorrect(true);
            setShowAnswer(true);
            setTimeout(() => {setShowAnswer(false)},2000);
            setTimeout(() => {setShowIncorrect(false)},1000);
            setTimeout(() => {wrongAnswer()},2000);
        }
    }

    const handleLower = () => {
        if(currentQuestion.value <= prevQuestion.value) {
            setShowCorrect(true);
            setShowAnswer(true);
            setTimeout(() => {setShowAnswer(false)},2000);
            setTimeout(() => {setShowCorrect(false)},1000);
            setTimeout(() => {correctAnswer()},2000);
            setTimeout(() => {setSlide(true)},1000);
            setTimeout(() => {setSlide(false)},2000);
        } else {
            setShowIncorrect(true);
            setShowAnswer(true);
            setTimeout(() => {setShowAnswer(false)},2000);
            setTimeout(() => {setShowIncorrect(false)},1000);
            setTimeout(() => {wrongAnswer()},2000);
        }
    }

    const correctAnswer = () => {
        let finished = (score + 2 === questions.length);
        setScore(score+1);
        if (finished) {
            setFinished(true);
            navigate('/result');
        } else {
            nextQuestion();
        }
    }

    const wrongAnswer = () => {
        navigate('/result');
    }

    useEffect(() => {
        const psToQuestion = (car) => {
            let question = {};
            question.id = car.id;
            question.name = car.model;
            question.description = car.description;
            if (mode === "nm") {
                question.value = car.nm;
            } else {
                question.value = car.ps;
            }
            question.img = car.img;
            question.used = false;
            question.ccm = car.ccm;
            question.cyl = car.cyl;
            question.valves = car.valves;
            return question;
          }

        let questionsLocal = data.map(psToQuestion);
        let prevQuestionLocal = questionsLocal[Math.floor(Math.random()*questionsLocal.length)];
        let currIndex = questionsLocal.findIndex((quest) => quest.id === prevQuestionLocal.id);
        questionsLocal[currIndex].used = true;
        let availableQuestions = [];
        if (difficulty === 2) {
            availableQuestions = questionsLocal.filter((quest) => (quest.used === false) && (quest.value > prevQuestionLocal.value * 0.8) && (quest.value < prevQuestionLocal.value * 1.2));
        }
        if (difficulty === 0) {
            availableQuestions = questionsLocal.filter((quest) => (quest.used === false) && ((quest.value < prevQuestionLocal.value * 0.8) || (quest.value > prevQuestionLocal.value * 1.2)));
        }
        if (availableQuestions.length === 0) {
            availableQuestions = questionsLocal.filter((quest) => quest.used === false);
        }
        let currQuestionLocal = availableQuestions[Math.floor(Math.random()*availableQuestions.length)];
        currIndex = questionsLocal.findIndex((quest) => quest.id === currQuestionLocal.id);
        questionsLocal[currIndex].used = true;
        setPrevQuestion(prevQuestionLocal);
        setCurrentQuestion(currQuestionLocal);
        setQuestions(questionsLocal);
        setFinished(false);
        setScore(0);
    },[setFinished, setScore, mode, difficulty]);

    return (
        <div className='content'>
            <div className='score'>{score} Punkte</div>
            <div className={`score correct ${!showCorrect && 'transparent'}`}>Richtig</div>
            <div className={`score incorrect ${!showIncorrect && 'transparent'}`}>Falsch</div>
            <div className={`questions ${slide && 'slide'}`}>
                <div className='prevQuestion'>
                    <div className='card'>
                        <div className='firstline'>
                            <div className='cardnumber'>{prevQuestion.id}</div>
                            <div className='cardtitle'>
                                <div className='cardname'>{prevQuestion.name}</div>
                                { prevQuestion.description && <div className='cardsubtitle'>{prevQuestion.description}</div>}
                            </div>
                        </div>
                        <div className='questionImage'><img src={prevQuestion.img} alt={prevQuestion.name}/></div>
                        <div className='cardline'>
                            <div className='lineleft'>
                                Hubraum
                            </div>
                            <div className='lineright'>
                                {prevQuestion.ccm} ccm
                            </div>
                        </div>
                        <div className='cardline'>
                            <div className='lineleft'>
                                Zylinder
                            </div>
                            <div className='lineright'>
                                {prevQuestion.cyl}
                            </div>
                        </div>
                        <div className='cardline'>
                            <div className='lineleft'>
                                Ventile
                            </div>
                            <div className='lineright'>
                                {prevQuestion.valves}
                            </div>
                        </div>
                        <div className='questionline'>
                            <div className='lineleft'>{ mode === "nm" ? 'Drehmoment' : 'Leistung'}</div>
                            <div className='lineright'>{prevQuestion.value} {mode === "nm" ? 'Nm' : 'PS' }</div>
                        </div>
                    </div>
                </div>
                <div className='currQuestion'>
                    <div className='card'>
                        <div className='firstline'>
                            <div className='cardnumber'>{currentQuestion.id}</div>
                            <div className='cardtitle'>
                                <div className='cardname'>{currentQuestion.name}</div>
                                {currentQuestion.description && <div className='cardsubtitle'>{currentQuestion.description}</div>}
                            </div>
                        </div>
                        <div className='questionImage'><img src={currentQuestion.img} alt={currentQuestion.name}/></div>
                        <div className='cardline'>
                            <div className='lineleft'>
                                Hubraum
                            </div>
                            <div className='lineright'>
                                {currentQuestion.ccm} ccm
                            </div>
                        </div>
                        <div className='cardline'>
                            <div className='lineleft'>
                                Zylinder
                            </div>
                            <div className='lineright'>
                                {currentQuestion.cyl}
                            </div>
                        </div>
                        <div className='cardline'>
                            <div className='lineleft'>
                                Ventile
                            </div>
                            <div className='lineright'>
                                {currentQuestion.valves}
                            </div>
                        </div>
                        <div className={`buttoncontainer ${showAnswer && 'hidden'}`}>
                            <ButtonGroup disableElevation orientation='vertical' fullWidth>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    size='medium'
                                    onClick={handleHigher}
                                >
                                    Mehr { mode === "nm" ? 'Drehmoment' : 'Leistung'}
                                </Button>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    size='medium'
                                    onClick={handleLower}
                                >
                                    Weniger { mode === "nm" ? 'Drehmoment' : 'Leistung'}
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div className={`questionline ${!showAnswer && 'hidden'}`}>
                            <div className='lineleft'>{ mode === "nm" ? 'Drehmoment' : 'Leistung'}</div>
                            <div className='lineright'>{currentQuestion.value} {mode === "nm" ? 'Nm' : 'PS' }</div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Quiz