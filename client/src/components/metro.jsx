import { useEffect, useState } from 'react';
import map from './images/metro-map.jpg';

function Metro() {

    const lineOne = [
        "El Monib", "Sakiat Mekky", "Omm El-Masryeen", "Giza",
        "Faisal", "Cairo University", "El Bohoth", "Dokki",
        "Opera", "Sadat", "Mohamed Naguib", "Attaba",
        "Al-Shohadaa", "Masarra", "Rod El-Farag", "St. Teresa",
        "Khalafawy", "Mezallat", "Koliet El-Zraa", "Shubra Al Khaimah",
    ];

    const lineTwo = [
        "Helwan", "Ain Helwan", "Helwan University", "Wadi Hof",
        "Hedayek Helwan", "Elmasraa", "Tura El_Esmant", "Kozzika",
        "Tora El-Balad", "Saknat El-Maadi", "Maadi", "Hadayek El-Maadi",
        "Dar El-Salam", "Elzahraa", "Mar Girgis", "El-Malek El-Saleh",
        "Al-Sayeda Zeinab", "Saad Zghloul", "Sadat", "Nasser",
        "Orabi", "Al-Shohadaa", "Ghamra", "El-Dmerdash",
        "Manshiet El-sadr", "Kobri El-Qobba", "Hammamat El-Qobba", "Saray El-Qobba",
        "Hadyek El-Zaitoun", "Helmeyet El-Zaitoun", "El-Matareyya", "Ain Shams",
        "Ezbet El-Nakhl", "El-Marg", "New Marg",
    ]

    const lineThree = [
        "Adly Mansour", "Heykestep", "Omar Ibn El Khattab", "Qubba",
        "El Shams Club", "Hesham Barakat", "El Nozha", "Alf Maskan",
        "Helioplis", "Haroun", "Al-Ahram", "Koleyet El-Banat",
        "Stadium", "Fair Zone", "Abbassiya", "Abdou Pasha",
        "Bab El Shaariya", "Attaba", "Nasser", "Maspero",
        "Saffa Hijazy", "Kit-Kat",
    ];


    const len1 = lineOne.length;
    const len2 = lineTwo.length;
    const len3 = lineThree.length;

    const sharedStationsOneAndTwo = ["Sadat", "Al-Shohadaa"]
    const sharedStationsOneAndThree = "Attaba";
    const sharedStationsTwoAndThree = "Nasser";

    const stations = [...lineOne, ...lineTwo, ...lineThree];

    const stationsToPass = []; 
    let switchStation = ''; 

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    let indexS = stations.findIndex((e) => e.toUpperCase() === start.toUpperCase());
    let indexE = stations.findIndex((e) => e.toUpperCase() === end.toUpperCase());

    let lineOfStart = [];
    let lineOfEnd = [];

    if (indexS < len1 && indexS >= 0) {
        lineOfStart = lineOne;
    } else if (indexS < len1 + len2 && indexS >= len1) {
        lineOfStart = lineTwo;
        indexS -= len1
    } else if (indexS < len1 + len2 + len3 && indexS >= len2) {
        lineOfStart = lineThree;
        indexS -= len1 + len2
    }


    if (indexE < len1 && indexE >= 0) {
        lineOfEnd = lineOne;
    } else if (indexE < len1 + len2 && indexE >= len1) {
        lineOfEnd = lineTwo;
        indexE -= len1
    } else if (indexE < len1 + len2 + len3 && indexE >= len2) {
        lineOfEnd = lineThree;
        indexE -= len1 + len2
    }

    if (lineOfStart === lineOfEnd && lineOfStart != []) {
        if (indexS < indexE) {
            for (let a = indexS; a <= indexE; a++) {
                stationsToPass.push(stations[a])
            }
        } else {
            for (let a = indexS; a >= indexE; a--) {
                stationsToPass.push(stations[a])
            }
        }
    } else if (lineOfStart !== lineOfEnd && lineOfStart != [] && lineOfEnd != []) {
        let indexSwitchOne = 0;
        let indexSwitchTwo = 0;

        if ((lineOfStart === lineOne && lineOfEnd === lineTwo) || (lineOfStart === lineTwo && lineOfEnd === lineOne)) {
            indexSwitchOne = lineOne.findIndex(e => e === sharedStationsOneAndTwo[0]);

            let option = lineOne.findIndex(e => e === sharedStationsOneAndTwo[1]);
            if (Math.abs(indexSwitchOne - indexS) < Math.abs(option - indexS)) {
                indexSwitchTwo = lineTwo.findIndex(e => e === sharedStationsOneAndTwo[0]);
                switchStation = sharedStationsOneAndTwo[0];
            } else {
                indexSwitchOne = lineOne.findIndex(e => e === sharedStationsOneAndTwo[1]);
                indexSwitchTwo = lineTwo.findIndex(e => e === sharedStationsOneAndTwo[1]);
                switchStation = sharedStationsOneAndTwo[1];
            }
            if (lineOfStart === lineTwo) {
                let temp = indexSwitchOne;
                indexSwitchOne = indexSwitchTwo;
                indexSwitchTwo = temp;
            }


            if (indexS <= indexSwitchOne) {
                for (let s = indexS; s < indexSwitchOne; s++) {
                    stationsToPass.push(lineOfStart[s]);
                }
            } else {
                for (let s = indexS; s > indexSwitchOne; s--) {
                    stationsToPass.push(lineOfStart[s]);
                }
            }

            if (indexSwitchTwo <= indexE) {
                for (let s = indexSwitchTwo; s <= indexE; s++) {
                    stationsToPass.push(lineOfEnd[s]);
                }
            } else {
                for (let s = indexSwitchTwo; s >= indexE; s--) {
                    stationsToPass.push(lineOfEnd[s]);
                }
            }
        } else if ((lineOfStart === lineOne && lineOfEnd === lineThree) || (lineOfStart === lineThree && lineOfEnd === lineOne)) {
            indexSwitchOne = lineOne.findIndex(e => e === sharedStationsOneAndThree);
            indexSwitchTwo = lineThree.findIndex(e => e === sharedStationsOneAndThree);
            if (lineOfStart === lineThree) {
                indexSwitchTwo = lineOne.findIndex(e => e === sharedStationsOneAndThree);
                indexSwitchOne = lineThree.findIndex(e => e === sharedStationsOneAndThree);
            }

            if (indexS <= indexSwitchOne) {
                for (let s = indexS; s < indexSwitchOne; s++) {
                    stationsToPass.push(lineOfStart[s]);
                }
            } else {
                for (let s = indexS; s > indexSwitchOne; s--) {
                    stationsToPass.push(lineOfStart[s]);
                }
            }

            if (indexSwitchTwo <= indexE) {
                for (let s = indexSwitchTwo; s <= indexE; s++) {
                    stationsToPass.push(lineOfEnd[s]);
                }
            } else {
                for (let s = indexSwitchTwo; s >= indexE; s--) {
                    stationsToPass.push(lineOfEnd[s]);
                }
            }
            switchStation = sharedStationsOneAndThree;
        } else {
            indexSwitchOne = lineTwo.findIndex(e => e === sharedStationsTwoAndThree);
            indexSwitchTwo = lineThree.findIndex(e => e === sharedStationsTwoAndThree);
            if (lineOfStart === lineThree) {
                indexSwitchTwo = lineTwo.findIndex(e => e === sharedStationsTwoAndThree);
                indexSwitchOne = lineThree.findIndex(e => e === sharedStationsTwoAndThree);
            }

            if (indexS <= indexSwitchOne) {
                for (let s = indexS; s < indexSwitchOne; s++) {
                    stationsToPass.push(lineOfStart[s]);
                }
            } else {
                for (let s = indexS; s > indexSwitchOne; s--) {
                    stationsToPass.push(lineOfStart[s]);
                }
            }

            if (indexSwitchTwo <= indexE) {
                for (let s = indexSwitchTwo; s <= indexE; s++) {
                    stationsToPass.push(lineOfEnd[s]);
                }
            } else {
                for (let s = indexSwitchTwo; s >= indexE; s--) {
                    stationsToPass.push(lineOfEnd[s]);
                }
            }
            switchStation = sharedStationsTwoAndThree;

        }

    }
    const [show, setShow] = useState(false);
    const [showMore, setShowMore] = useState(false);

    function handleShow() {
        if (stationsToPass.length !== 0) {
            setShow(true);
            setShowMore(false);
        }
    }

    function hanleShowMore() {
        if (stationsToPass.length !== 0) {
            setShowMore(true);
            setShow(false);
        }
    }

    useEffect(() => {
        if (!stationsToPass || indexE < 0 || indexS < 0) {
            setShow(false);
            setShowMore(false);
        }
    }, [start, end, stationsToPass]);

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 form">
                    <div className='inp'>
                        <label>Start Point</label>
                        <input
                            type="text"
                            required
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                        />

                        <label>End Point</label>
                        <input
                            type="text"
                            required
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                        />
                    </div>
                    
                    {!show && !showMore&& <button onClick={handleShow}>Calc</button>}

                    {show &&
                        <div className="result">
                            <p>- Start from <span>{start}</span></p>
                            {switchStation && <p>- switch on <span>{switchStation}</span></p>}
                            <p>- End in <span>{end}</span></p>
                            <button onClick={hanleShowMore}>More Details</button>
                        </div>
                    }

                    {showMore &&
                    <div>
                        <p>Stations to pass through</p>
                        <p>{stationsToPass.join(` - `)}</p>
                        <button onClick={handleShow}>Back</button>
                    </div>
                    }

                </div>

                <div className="col-md-6">
                    <h2><b>MAP</b></h2>
                    <img src={map} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Metro;