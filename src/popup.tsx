// @ts-nocheck

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { Dialog, DialogBody, DialogFooter } from "@blueprintjs/core";
import { Button, Card } from "@blueprintjs/core";

const Popup = () => {
    const [count, setCount] = useState(0);
    const [currentURL, setCurrentURL] = useState<string>();

    useEffect(() => {
        chrome.action.setBadgeText({ text: count.toString() });
    }, [count]);

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            setCurrentURL(tabs[0].url);
        });
    }, []);

    const changeBackground = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const tab = tabs[0];
            if (tab.id) {
                chrome.storage.sync.get(
                    {
                        favoriteColor: "green",
                    },
                    (items) => {
                        chrome.tabs.sendMessage(
                            tab.id,
                            {
                                color: items.favoriteColor,
                            },
                            (msg) => {
                                console.log("result message:", msg);
                            }
                        );
                    }
                );
            }
        });
    };

    return (
        <Dialog
            style={{ minWidth: "700px" }}
            title="Informational dialog"
            icon="info-sign"
            isOpen={true}
        >
            <DialogBody>
                <Card>
                    <ul>
                        <li>Current URL: {currentURL}</li>
                        <li>Current Time: {new Date().toLocaleTimeString()}</li>
                    </ul>
                </Card>
            </DialogBody>
            <DialogFooter
                actions={
                    ((
                        <Button
                            intent="primary"
                            text="Change Background"
                            onClick={changeBackground}
                        />
                    ),
                        (
                            <Button
                                intent="secondary"
                                text="Count Up"
                                onClick={() => setCount(count + 1)}
                            />
                        ))
                }
            />
        </Dialog>
    );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
