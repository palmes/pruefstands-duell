import React from 'react';
import { Button, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Difficulties from '../data/Difficulties';
import Modes from '../data/Modes'

const Home = ({ name, setName, difficulty, setDifficulty, mode, setMode }) => {

    const navigate = useNavigate();

    const handleSubmit = ()=>{
        navigate('/quiz');
    }


    return (
        <div className='content'>
            <div className='questions'>
                <div className='resultContainer'>
                    <div className='heading'>Prüfstands-Duell</div>
                    <div className='subheading'>Das inoffizielle Höher/Niedriger-Spiel zur Halle 77</div>
                    <div className='infotext'>Herzlich Willkommen beim Prüfstands-Duell.</div>
                    <div className='infotext'>Kannst du erraten, welches der gezeigten Autos auf dem Prüfstand der Halle 77 besser abgeschnitten hat?</div>
                    <div className='settings'>
                        <TextField 
                            label="Name" 
                            variant='outlined'
                            color='primary'
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className='settings'>
                        <TextField
                            select 
                            label="Modus" 
                            variant='outlined'
                            color='primary'
                            value={mode}
                            onChange={(e) => setMode(e.target.value)} 
                        >
                            {Modes.map((item) => (
                                <MenuItem key={item.text} value={item.value}>
                                    {item.text}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className='settings'>
                        <TextField
                            select 
                            label="Schwierigkeit" 
                            variant='outlined'
                            color='primary'
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)} 
                        >
                            {Difficulties.map((item) => (
                                <MenuItem key={item.text} value={item.value}>
                                    {item.text}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className='infotext'>
                        Bei "normal" ist die Reihenfolge der Autos komplett zufällig.<br />
                        Bei "einfach" werden meist Fahrzeuge ausgewählt, die weiter auseinander liegen.<br />
                        Bei "schwer" liegen die Fahrzeuge meist näher beeinander.
                    </div>
                    <div className='settings'>
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            onClick={handleSubmit}
                        >
                            Let's Go!
                        </Button>
                    </div>
                    <div className='infotext'>
                        Ein Spiel von JohnnyToaster.<br />
                        Quelle der Bilder und Leistungsdaten: 5ZYL_Marco auf Youtube.<br />
                        Ergänzende Fahrzeugdaten von Wikipedia und ADAC.<br />
                        Alle Angaben ohne Gewähr.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
