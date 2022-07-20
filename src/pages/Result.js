import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Difficulties from '../data/Difficulties';
import Modes from '../data/Modes'

const Result = ({name, score, finished, mode, difficulty}) => {
    const navigate = useNavigate();

    const resultStrings = [
        { minScore: 50, text: 'Beeindruckend! Das war eine Glanzleistung. Schaffst du das perfekte Spiel?'},
        { minScore: 20, text: 'Super! Du kennst dich mit Autos aus. Schaffst du das nochmal oder war es nur Glück?'},
        { minScore: 10, text: 'Du hast deine Serienleistung auf jeden Fall erreicht. Schaffst du noch mehr?'},
        { minScore: 5, text: 'Für den Anfang nicht schlecht. Aber da geht noch mehr!'},
        { minScore: 0, text: 'Das war Pech! Versuch es am besten direkt nochmal!'}
    ]

    return (
        <div className='content'>
            <div className='questions'>
                <div className='resultContainer'>
                    <div class='heading'>{ finished ? 'Glückwunsch!' : 'Game Over'}</div>
                    <div id='resultScore'>Du hast im Modus {Modes.find((item) => item.value === mode).text} auf Schwierigkeit {Difficulties.find((item)=> item.value === difficulty).text} {score} Punkte erreicht, {name || 'Anonymous'}.</div>
                    {!finished && <div id='resultText'>{resultStrings.find((item) => item.minScore <= score).text}</div>}
                    {finished && <div id='resultFinished'>Du hast diesen Modus durchgespielt. Bald werden mehr Autos hinzugefügt. Bis dahin versuche doch mal einen anderen Modus.</div>}
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={()=>navigate('/quiz')}
                    >
                        Nochmal Spielen
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={()=>navigate('/')}
                    >
                        Einstellungen Ändern
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Result