import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { useEffect, useState } from "react";
import "./App.css";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "./dojo/useDojo";
import { Mold } from "./utils";
import { Modal, Option } from "./Modal";
import briqImage from './img/architecture/briq.jpg';
import lootImage from './img/architecture/loot.jpg';
import realmsImage from './img/architecture/realms.jpg';
import c_a_cImage from './img/architecture/c&c.png';

function App() {
    const {
        setup: {
            systemCalls: { spawn, click, upgrade_base, buy_architecture, upgrade_architecture, auto },
            clientComponents: { Architecture, People, Base },
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
    const base = useComponentValue(Base, entityId);

    const [isSwapButtonVisible, setIsSwapButtonVisible] = useState(true);
    const [isClickButtonVisible, setIsClickButtonVisible] = useState(false);

    const handleSwapButtonClick = () => {
        if(Number(base?.lv) < 1){
            spawn(account.account)
        }
        setIsSwapButtonVisible(false); // Hide the Swap button
        setIsClickButtonVisible(true); // Show Click button
    };

    const handleButtonClick = () => {
        click(account.account)
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
        }, 1000)

        return () => clearInterval(interval);
    }, [people?.people_count]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const options: Option[] = [
        { label: 'Purchase consumes 10000 offspring, increasing by 500 offspring per second.', value: 1, image: briqImage },
        { label: 'Purchase consumes 1000000 offspring, increasing by 50000 offspring per second.', value: 2, image: lootImage },
        { label: 'Purchase consumes 100000000 offspring, increasing by 5000000 offspring per second.', value: 3, image: realmsImage },
        { label: 'Purchase consumes 10000000000 offspring, increasing by 500000000 offspring per second.', value: 4, image: c_a_cImage },
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
            imageSrc = briqImage;
            break;
        case 2:
            imageSrc = lootImage;
            break;
        case 3:
            imageSrc = realmsImage;
            break;
        case 4:
            imageSrc = c_a_cImage;
            break;
    }




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
                <div className="card">
                    <div>
                        {isSwapButtonVisible && (
                            <button onClick={handleSwapButtonClick}>Swap</button>
                        )}
                        {isClickButtonVisible && (
                            <button className="button-with-click" onClick={handleButtonClick}></button>
                        )}
                    </div>
                    <div className="text-current-people">
                        Currently there are <span style={{ color: "red" }}> {Number(people?.people_count || 0)}</span> descendants in total
                    </div>
                    <div>
                        The base click increases the number of offspring:{String(base?.add_people || 0)}
                    </div>
                    <div>
                        The base level:{String(base?.lv || 0)}
                    </div>

                    <div>
                        The current totem<img src={imageSrc} style={{ width: '100px', height: '100px' }} />
                    </div>
                    <div>
                        The totem level:{String(architecture?.lv || 0)}
                    </div>
                    <div>
                        The totem increases the number of offspring per second:{String(architecture?.add_people || 0)}
                    </div>
                    <div>
                        <button onClick={openModal}>Purchase a totem</button>
                        <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} options={options} />
                    </div>
                </div>

                <div className="card">
                    <div>
                        <button
                            onClick={() => upgrade_base(account.account)}
                        >
                            Upgrade basic click
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => upgrade_architecture(account.account)}
                        >
                            Upgrade the totem
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                if (Number(architecture?.lv) !== 0) {
                                    auto(account.account);
                                    setInterval(() => {
                                        auto(account.account);
                                    }, 1000);
                                }
                            }}
                        >
                            Activating the totem increases offspring
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
