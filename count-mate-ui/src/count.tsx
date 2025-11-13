// import './count.css'
// import { useState } from 'react'
// import { message, Input, } from "antd";

// const Count = () => {

//     //screens
//     const [landingPage, setLandingPage] = useState<boolean>(true)
//     const [targetScreen, setTargetScreen] = useState<boolean>(false)
//     const [countScreen, setCountScreen] = useState<boolean>(false)

//     const [target, setTarget] = useState<any>(0);
//     const [count, setCount] = useState<number>(0);

//     const [messageApi, contextHolder] = message.useMessage();

//     const defaultTargets = [10, 25, 50]

//     return (
//         <div className='count-main-card'>

//             {landingPage && (
//                 <div>
//                     <h2 className='count-title' > Count Mate </h2>
//                     <p className='count-subtitle' > A simple counting app to keep track of your counts. </p>

//                     <button onClick={() => [setTargetScreen(true), setLandingPage(false)]} >
//                         Let's Go..!
//                     </button>
//                 </div>
//             )}

//             {targetScreen && (
//                 <div className='target-selection-div' >
//                     <p className='target-text' > What is the target count ?</p>
//                     <div className='target-btn-input-div' >
//                         <div className='target-buttons-div' >
//                             {defaultTargets.map((t) => (
//                                 <button key={t} className='target-buttons' onClick={() => setTarget(t)} onTouchStart={() => setTarget(t)} > {t} </button>
//                             ))}
//                         </div>
//                         <Input type='number' className='target-input' value={target} onChange={(e) => setTarget(e.target.value === '' ? '' : Number(e.target.value))} placeholder='Custom' />
//                     </div>
//                     {contextHolder}
//                     <button className='target-screen-start-button'
//                         onClick={() => {
//                             if (target >= 1) setCountScreen(true), setTargetScreen(false);
//                             else messageApi.open({
//                                 type: "error",
//                                 content: 'Please enter a target count greater than 0',
//                                 style: { marginTop: "2vh" },
//                                 duration: 1.5
//                             });
//                         }}>
//                         START
//                     </button>

//                 </div>
//             )}

//             {countScreen && (
//                 <div className='countScreen-div'>
//                     <div> Target: {target} </div>
//                     <div className='count-add-minus-div' >
//                         <button className='count-add-minus-buttons' onClick={() => setCount((count) => count - 1)}  > - </button>
//                         <div > {count <= 0 ? 0 : count} </div>
//                         <button className='count-add-minus-buttons' onClick={() => setCount((count) => count + 1)}  > + </button>
//                     </div>
//                     <button onClick={() => [setCount(0), setTarget(0), setCountScreen(false), setTargetScreen(false), setLandingPage(true)]} > Reset </button>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Count




import './count.css';
import { useEffect, useState } from 'react';
import { message, Modal, Popover } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
// import { ConfettiSideCannons } from './confetti-side-cannons';

const Count = () => {

    const [landingPage, setLandingPage] = useState(true);
    const [targetScreen, setTargetScreen] = useState(false);
    const [countScreen, setCountScreen] = useState(false);

    const [count, setCount] = useState(0);
    const [target, setTarget] = useState<any>(0);
    const [startTime, setStartTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);

    const [showModal, setShowModal] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const defaultTargets = [10, 25, 50];

    useEffect(() => {
        if (count === target && target > 0) {
            setEndTime(Date.now());
            // ConfettiSideCannons()
        }
    }, [count, target]);

    useEffect(() => {
        if (count >= target && target > 0) {
            const timer = setTimeout(() => {
                setShowModal(true);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            setShowModal(false);
        }
    }, [count, target]);

    const calculateDuration = () => {
        if (!startTime || !endTime) return "";
        const seconds = Math.floor((endTime - startTime) / 1000);
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    const handleInitiateMission = () => {
        if (target && target >= 1) {
            setStartTime(Date.now());
            setCountScreen(true);
            setTargetScreen(false);
        } else {
            messageApi.open({
                type: "error",
                content: "Enter a target greater than 0",
                style: { marginTop: "2vh" },
                duration: 1.5,
            });
        }
    };

    const handleResetMission = () => {
        setCount(0);
        setTarget("");
        setLandingPage(true);
        setCountScreen(false);
        setTargetScreen(false);
    };

    const handlestartNewMission = () => {
        setCount(0);
        setTarget(0);
        setLandingPage(true);
        setCountScreen(false);
        setTargetScreen(false);
    }

    const content = (
        <>
            <p style={{ color: "white" }} > Start Time : <b>{new Date(startTime).toLocaleString()}</b> </p>
            <p style={{ color: "white" }} > End Time : <b>{new Date(endTime).toLocaleString()}</b> </p>
        </>
    );


    return (
        <div className="project-main-div-container">
            {contextHolder}

            {landingPage && (
                <div className="landing-screen fade-in">
                    <div>
                        <h1 className="count-mate-title">Count Mate</h1>
                    </div>
                    <div>
                        <button className="lets-go-btn"
                            onClick={() => [setTargetScreen(true), setLandingPage(false)]}>
                            Let's Go
                        </button>
                    </div>
                </div>
            )}

            {targetScreen && (
                <div className="target-screen fade-in">
                    <div>
                        <p className="target-text">Set your mission target</p>
                    </div>
                    <div className="target-container">
                        <div className="target-buttons">
                            {defaultTargets.map((t) => (
                                <button key={t} onClick={() => setTarget(t)} className={`target-btn ${target === t ? 'active' : ''}`}> {t} </button>
                            ))}
                        </div>
                        <input className="input" type="number" value={target} placeholder="Custom Target"
                            onChange={(e) => setTarget(e.target.value === '' ? '' : Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <button className="initiate-mission-btn" onClick={handleInitiateMission}>
                            Initiate Mission
                        </button>
                    </div>
                </div>
            )}

            {countScreen && (
                <div className="count-screen fade-in">

                    <button className="Btn" onClick={() => [setCountScreen(false), setTargetScreen(true), setTarget(0), setCount(0)]} >
                        <div className="sign">
                            <svg viewBox="0 0 512 512"> <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path> </svg>
                        </div>
                        <div className="text">Back</div>
                    </button>

                    <h2 className="mission-target-label">
                        Mission Target: <span>{target}</span>
                    </h2>

                    <div className="count-controls">
                        <button className="circle-btn" onClick={() => setCount((c) => Math.max(0, c - 1))}> − </button>
                        <div className="count-display">{count}</div>
                        <button className="circle-btn" onClick={() => setCount((c) => c + 1)} > +</button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "end" }}  >
                        <button className="reset-btn" onClick={handleResetMission}>
                            Reset Mission
                        </button>
                    </div>

                    <Modal
                        className='congrats-modal'
                        centered width={450}
                        footer={null} closable={false}
                        open={showModal}
                    >
                        <div className="congrats-modal-content" >
                            <div style={{ display: "flex", justifyContent: "space-between" }} >
                                <h2>Congratulations!</h2>
                                <Popover content={content} trigger={["hover", "click"]} >
                                    <InfoCircleOutlined />
                                </Popover>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", margin: "15px 0px" }} >
                                <p>You have reached your target of {target} counts!</p>
                                <p> You've spent {calculateDuration()} </p>
                            </div>

                            <div style={{ display: "flex", justifyContent: "center", margin: "15px" }} >
                                <button onClick={handlestartNewMission} className='start-new-mission-btn' >
                                    Start New Mission
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            )
            }
        </div >
    );
};

export default Count;
