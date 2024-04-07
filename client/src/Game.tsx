import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { useEffect, useState, useRef } from "react";
import "./App.css";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "./dojo/useDojo";
import { Modal, Option } from "./Modal";
import blobertsImage from './img/architecture/bloberts.jpg';
import lootImage from './img/architecture/loot.jpg';
import realmsImage from './img/architecture/realms.jpg';
import c_a_cImage from './img/architecture/c&c.png';

function App() {
    const {
        setup: {
            systemCalls: { spawn, click, upgrade_base, buy_architecture, upgrade_architecture, auto },
            clientComponents: { Architecture, People, BaseClick },
        },
        account,
    } = useDojo();

    // entity id we are syncing
    const entityId = getEntityIdFromKeys([
        BigInt(account?.account.address),
    ]) as Entity;

    // get current component values
    const architecture = useComponentValue(Architecture, entityId);
    const people = useComponentValue(People, entityId);
    const baseClick = useComponentValue(BaseClick, entityId);
    console.log("baseClick" + baseClick?.add_people + baseClick?.lv)
    console.log("architecture" + architecture?.lv)
    console.log("people" + people?.people_count)

    const [isSwapButtonVisible, setIsSwapButtonVisible] = useState(true);
    const [isClickButtonVisible, setIsClickButtonVisible] = useState(false);

    const handleSwapButtonClick = () => {
        if (baseClick == undefined) {
            spawn(account.account)
            console.log("spawn")
        }
        setIsSwapButtonVisible(false); // Hide the Swap button
        setIsClickButtonVisible(true); // Show Click button
    };

    const handleButtonClick = () => {
        click(account.account)
        setAnimate(true);
    };

    const [progressWidth, setProgressWidth] = useState(0);

    const [total, setTotal] = useState(10000);

    useEffect(() => {
        const interval = setInterval(() => {
            if (people?.people_count) {
                const newWidth = (Number(people.people_count) / total) * 100; // Adjust the calculation as needed
                if (newWidth >= 100) {
                    setTotal(total * 5)
                }
                setProgressWidth(newWidth);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [people?.people_count]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTotal(total => total);
            if (architecture != undefined && Number(architecture?.lv) !== 0 ) {
                auto(account.account);
            }
        }, 1000)

        return () => clearInterval(interval);
    }, [people?.people_count]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const options: Option[] = [
        { label: 'Purchase consumes 10000 offspring, increasing by 500 offspring per second.', value: 1, image: c_a_cImage },
        { label: 'Purchase consumes 1000000 offspring, increasing by 50000 offspring per second.', value: 2, image: lootImage },
        { label: 'Purchase consumes 100000000 offspring, increasing by 5000000 offspring per second.', value: 3, image: realmsImage },
        { label: 'Purchase consumes 10000000000 offspring, increasing by 500000000 offspring per second.', value: 4, image: blobertsImage },
    ];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (selectedOption: number) => {
        buy_architecture(account.account, selectedOption)
    };

    const mold = architecture?.mold || 0;

    let imageSrc;
    switch (mold) {
        case 1:
            imageSrc = c_a_cImage;
            break;
        case 2:
            imageSrc = lootImage;
            break;
        case 3:
            imageSrc = realmsImage;
            break;
        case 4:
            imageSrc = blobertsImage;
            break;
    }

    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (animate) {
            timer = setTimeout(() => {
                setAnimate(false); // 两秒后停止动画
            }, 2000);
        }
        return () => clearTimeout(timer); // 在组件卸载时清除定时器
    }, [animate]);


    const ahandleButtonClick = () => {
        setAnimate(true); // 点击按钮开始动画
    };





    return (
        <>
            <div className="background-image">
                <div className="text-target">The next target population number: {total}</div>
                <div className="progress-bar" style={{ height: "30px" }}>
                    <div className="progress" style={{ width: "100%", backgroundColor: "lightgray", height: "30px", borderRadius: "10px" }}>
                        <div className="progress" style={{ width: `${progressWidth}%`, backgroundColor: "pink", height: "100%", borderRadius: "10px" }}>
                            {progressWidth}%
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        {isSwapButtonVisible && (
                            <button className="button-with-spawn" onClick={handleSwapButtonClick}></button>
                        )}
                        {isClickButtonVisible && (
                            <button className="button-with-click" onClick={handleButtonClick}>
                            </button>

                        )}
                    </div>
                    <div className="text-current-people">
                        Currently there are <span style={{ color: "red" }}> {Number(people?.people_count || 0)}</span> descendants in total
                    </div>
                    <div className="base">
                        The base click increases the number of offspring: <span style={{ color: "red" }}>{String(baseClick?.add_people || 0)}</span>
                    </div>
                    <div className="base">
                        The base level:<span style={{ color: "red" }}>{String(baseClick?.lv || 0)}</span>
                    </div>

                    <div id="animationContainer">
                        {animate && <div className="runningAnimation"></div>} { }
                    </div>

                    <div>
                        <button className="button-with-architecture"
                        >
                            <span style={{ color: "red", fontSize: "20px" }}>The current totem</span>

                            <img className="rotating-image" src={imageSrc} style={{ width: '100px', height: '100px' }} />
                        </button>
                    </div>
                    <div className="architecture-lv">
                        The totem level: <span style={{ color: "red" }}> {String(architecture?.lv || 0)}</span>
                    </div>
                    <div className="architecture-add-people">
                        The totem increases the number of offspring per second:  <span style={{ color: "red" }}>{String(architecture?.add_people || 0)} </span>
                    </div>
                </div>

                <div>
                    <div className="card">
                        <button className="button"
                            onClick={() => upgrade_base(account.account)}
                        >
                            Upgrade basic click
                        </button>
                    </div>
                    <div className="card">
                        <button className="button"
                            onClick={() => upgrade_architecture(account.account)}
                        >
                            Upgrade the totem
                        </button>
                    </div>
                    <div className="card">
                        <button className="button" onClick={openModal}>Purchase a totem</button>
                        <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} options={options} />
                    </div>

                </div>
            </div>
        </>
    );
}

export default App;
