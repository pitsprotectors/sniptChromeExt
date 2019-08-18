const iframe = document.createElement("iframe");
iframe.classList.add("snippet-iframe-container");
iframe.src = chrome.runtime.getURL("/app.html");

const html = document.getElementsByTagName("html")[0];

// selected the body tag and APPEND my container to the body
const body = document.getElementsByTagName("body")[0];
console.log(body);
body.appendChild(iframe);

chrome.runtime.onMessage.addListener(receiver);

// receiving message from CE upon popup
function receiver(request, sender, sendResponse) {
  if (request.text === "footer") {
    console.log("message received");
    const iframeDocument = document.getElementsByClassName(
      "snippet-iframe-container"
    )[0];
    html.classList.add("snippet-html");
    iframeDocument.classList.add("active");
  }
}
