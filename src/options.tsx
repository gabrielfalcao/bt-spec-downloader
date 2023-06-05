import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { Dialog, DialogBody, DialogFooter } from "@blueprintjs/core";
import { Button, Card } from "@blueprintjs/core";

const Options = () => {
    const [color, setColor] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [like, setLike] = useState<boolean>(false);

    useEffect(() => {
        // Restores select box and checkbox state using the preferences
        // stored in chrome.storage.
        chrome.storage.sync.get(
            {
                favoriteColor: "green",
                likesColor: true,
            },
            (items) => {
                setColor(items.favoriteColor);
                setLike(items.likesColor);
            }
        );
    }, []);

    const saveOptions = () => {
        // Saves options to chrome.storage.sync.
        chrome.storage.sync.set(
            {
                favoriteColor: color,
                likesColor: like,
            },
            () => {
                // Update status to let user know options were saved.
                setStatus("Options saved.");
                const id = setTimeout(() => {
                    setStatus("");
                }, 1000);
                return () => clearTimeout(id);
            }
        );
    };

    return (
        <Card>
            <div>
                Favorite color:{" "}
                <select
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                >
                    <option value="green">red</option>
                    <option value="green">green</option>
                    <option value="blue">blue</option>
                    <option value="yellow">yellow</option>
                </select>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={like}
                        onChange={(event) => setLike(event.target.checked)}
                    />
                    I like colors.
                </label>
            </div>
            <div>{status}</div>
            <button onClick={saveOptions}>Save</button>
        </Card>
    );
};

ReactDOM.render(<Options />, document.getElementById("root"));
