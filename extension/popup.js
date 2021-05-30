"use strict";

window.browser = window.browser || window.chrome;

chrome.runtime.sendMessage({ type: "request-token" }, () => {});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "provide-token") {
    const tokenInput = document.getElementById("token-input");
    tokenInput.value = message.token;
    tokenInput.select();

    const copyButton = document.getElementById("copy-to-clipboard");
    copyButton.onclick = () => {
      document.execCommand("copy");
      tokenInput.select();
    };
  }

  sendResponse(null);
});
