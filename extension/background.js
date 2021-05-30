chrome.webRequest.onBeforeSendHeaders.addListener(
  (data) => {
    const authHeader = data.requestHeaders.find(
      (header) => header.name === "Authorization"
    );

    if (authHeader) {
      [, token] = authHeader.value.split(" ");
      chrome.storage.local.set({ token });
    }
  },
  {
    urls: ["<all_urls>"],
  },
  ["requestHeaders"]
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "request-token") {
    chrome.storage.local.get(["token"], ({ token }) => {
      chrome.runtime.sendMessage({ type: "provide-token", token }, () => {});
    });
  }

  sendResponse(null);
});
