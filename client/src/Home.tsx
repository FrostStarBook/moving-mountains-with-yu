import React, { useState, useEffect } from "react";
import { useDojo } from "./dojo/useDojo";
import { useNavigate } from "react-router-dom";
import homeImage from "./img/home.png";

function Home() {
    const { account } = useDojo();
    const [clipboardStatus, setClipboardStatus] = useState({
        message: "",
        isError: false,
    });
    const navigate = useNavigate();

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

    const handleNavigateToGame = () => {
        if (account && account.list().length > 0) {
            navigate("/game");
        } else {
            alert("Please create burners before going to the game.");
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
            <div style={{ backgroundImage: `url(${homeImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
                <button id="home" onClick={account?.create}>
                    {account?.isDeploying ? "deploying burner" : "create burner"}
                </button>
                {account && account?.list().length > 0 && (
                    <button id="home" onClick={async () => await account?.copyToClipboard()}>
                        Save Burners to Clipboard
                    </button>
                )}
                <button id="home" onClick={handleRestoreBurners}>
                    Restore Burners from Clipboard
                </button>
                <div className="card">
                    <div>{`burners deployed: ${account.account.address}`}</div>
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
                        <button id="home" onClick={() => account.clear()}>
                            Clear burners
                        </button>
                        <p>
                            Please create burners before going to the game.
                        </p>
                    </div>
                </div>

                <div>
                    <button id="home" onClick={handleNavigateToGame} style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        Start
                    </button>
                </div>




                {clipboardStatus.message && (
                    <div className={clipboardStatus.isError ? "error" : "success"}>
                        {clipboardStatus.message}
                    </div>
                )}

            </div>


        </>
    );
}

export default Home;