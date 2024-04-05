import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { useEffect, useState } from "react";
import "./App.css";
import { Direction } from "./utils";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "./dojo/useDojo";

function App() {
    const {
        setup: {
            systemCalls: { spawn, click },
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

    console.log("a: " + architecture?.add_people +"  " +  architecture?.lv + "  " + architecture?.mold)
    console.log("b: " + base?.add_people + "  " + base?.lv)
    console.log("p: " + people)
    console.log("p.count: " + people?.people_count)

    const handleRestoreBurners = async () => {
        try {
            await account?.applyFromClipboard();
            setClipboardStatus({
                message: "Burners restored successfully!",
                isError: false,
            });
        } catch (error) {
            setClipboardStatus({
                message: `Failed to restore burners from clipboard`,
                isError: true,
            });
        }
    };

    useEffect(() => {
        if (clipboardStatus.message) {
            const timer = setTimeout(() => {
                setClipboardStatus({ message: "", isError: false });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [clipboardStatus.message]);

    return (
        <>
            <button onClick={account?.create}>
                {account?.isDeploying ? "deploying burner" : "create burner"}
            </button>
            {account && account?.list().length > 0 && (
                <button onClick={async () => await account?.copyToClipboard()}>
                    Save Burners to Clipboard
                </button>
            )}
            <button onClick={handleRestoreBurners}>
                Restore Burners from Clipboard
            </button>
            {clipboardStatus.message && (
                <div className={clipboardStatus.isError ? "error" : "success"}>
                    {clipboardStatus.message}
                </div>
            )}

            <div className="card">
                <div>{`burners deployed: ${account.count}`}</div>
                <div>
                    select signer:{" "}
                    <select
                        value={account ? account.account.address : ""}
                        onChange={(e) => account.select(e.target.value)}
                    >
                        {account?.list().map((account, index) => {
                            return (
                                <option value={account.address} key={index}>
                                    {account.address}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <button onClick={() => account.clear()}>
                        Clear burners
                    </button>
                    <p>
                        You will need to Authorise the contracts before you can
                        use a burner. See readme.
                    </p>
                </div>
            </div>
            
            <div className="card">
                <button onClick={() => spawn(account.account)}>Spawn</button>
                <div>
                    人数:{String(people?.people_count)}
                </div>
            </div>

            <div className="card">
                <div>
                    <button
                        onClick={() => click(account.account)
                        }
                    >
                        Move Up
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => click(account.account)}
                    >
                        Move Left
                    </button>
                    <button
                        onClick={() => click(account.account)}
                    >
                        Move Right
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => click(account.account)}
                    >
                        Move Down
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;
