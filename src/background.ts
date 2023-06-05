function polling() {
    console.log("polling...");
    console.log("will do it again in 30...");
    setTimeout(polling, 1000 * 3);
}

polling();
