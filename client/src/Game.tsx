import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { useEffect, useState } from "react";
import "./App.css";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "./dojo/useDojo";
import { Mold } from "./utils";

function App() {
    const {
        setup: {
            systemCalls: { spawn, click, upgrade_base, buy_architecture, upgrade_architecture, auto },
            clientComponents: { Architecture, People, Base },
        },
        account,
    } = useDojo();

    const [clipboardStatus, setClipboardStatus] = useState({
        message: "",
        isError: false,
    });

    // entity id we are syncing
    const entityId = getEntityIdFromKeys([
        BigInt(account?.account.address),
    ]) as Entity;

    // get current component values
    const architecture = useComponentValue(Architecture, entityId);
    const people = useComponentValue(People, entityId);
    const base = useComponentValue(Base, entityId);

    useEffect(() => {
        if (clipboardStatus.message) {
            const timer = setTimeout(() => {
                setClipboardStatus({ message: "", isError: false });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [clipboardStatus.message]);

    const [progressWidth, setProgressWidth] = useState(0);

    const [total, setTotal] = useState(10000);

    useEffect(() => {
        const interval = setInterval(() => {
            if (people?.people_count) {
                const newWidth = (Number(people.people_count) / total) * 100; // Adjust the calculation as needed
                if (newWidth >= 100) {
                    console.log("setTotal")
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




    return (
        <>
            <div style={{ textAlign: "center" }}>下一目标人口： {total}</div>
            <div className="progress-bar" style={{ height: "30px" }}>
                <div className="progress" style={{ width: "100%", backgroundColor: "lightgray", height: "30px", borderRadius: "10px" }}>
                    <div className="progress" style={{ width: `${progressWidth}%`, backgroundColor: "pink", height: "100%", borderRadius: "10px" }}>
                        {progressWidth}%
                    </div>
                </div>
                <div style={{ textAlign: "right" }}>人口：{total}</div>
            </div>
            <div className="card">
                <button onClick={() => spawn(account.account)}>Spawn</button>
                <div>
                    人数:{String(people?.people_count || 0)}
                </div>
                <div>
                    base 点击增加人口数:{String(base?.add_people || 0)}
                </div>
                <div>
                    base 等级:{String(base?.lv || 0)}
                </div>
                <div>
                    建筑物每秒增加人口数:{String(architecture?.add_people || 0)}
                </div>
                <div>
                    建筑物 等级:{String(architecture?.lv || 0)}
                </div>
                <div>
                    建筑物 购买类型:{String(architecture?.mold || 0)}
                </div>
            </div>

            <div className="card">
                <div>
                    <button
                        onClick={() => click(account.account)
                        }
                    >
                        点击加人口
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => upgrade_base(account.account)}
                    >
                        升级 base
                    </button>
                    <button
                        onClick={() => buy_architecture(account.account, Mold.Briq)}
                    >
                        购买建筑
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => upgrade_architecture(account.account)}
                    >
                        升级建筑
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
                        建筑加人口
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;
