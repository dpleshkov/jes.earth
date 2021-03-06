let fallbackCopyTextToClipboard = function(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        let successful = document.execCommand('copy');
        let msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

let copyTextToClipboard = function(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

document.getElementById("javaIPButton").addEventListener("click", () => {
    copyTextToClipboard(TOP.javaButton.ip);
    let oldText = document.getElementById("javaIPButton").innerText;
    document.getElementById("javaIPButton").innerText = TOP.javaButton.clickedText;
    setTimeout(() => {
        document.getElementById("javaIPButton").innerText = oldText;
    }, 500);
});

document.getElementById("bedrockIPButton").addEventListener("click", () => {
    copyTextToClipboard(TOP.bedrockButton.ip);
    let oldText = document.getElementById("bedrockIPButton").innerText;
    document.getElementById("bedrockIPButton").innerText = TOP.bedrockButton.clickedText;
    setTimeout(() => {
        document.getElementById("bedrockIPButton").innerText = oldText;
    }, 500);
});

let angle = 0;

let moveBackground = function() {
    let dx = Math.cos(angle);
    let dy = Math.sin(angle);
    document.querySelector(".server-background").style.backgroundPosition = `${50 + 2*dx}% ${50 + 2*dy}%`;
    angle += 0.002;
    requestAnimationFrame(moveBackground);
}

requestAnimationFrame(moveBackground);