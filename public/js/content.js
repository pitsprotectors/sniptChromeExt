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

console.log("is this file running?");
// chrome.storage.sync.set({ snippetsArray: [] });

const getSelectedText = () => {
  var content = "";
  if (
    window
      .getSelection()
      .toString()
      .trim().length
  ) {
    console.log("mouseup working?");
    content = window.getSelection().toString();
    const request = {
      message: "SEND_SNIPPET",
      content
    };

    console.log("how many times are you running?");
    chrome.runtime.sendMessage(request, function(response) {
      console.log("message sent from content script!");
    });

    // console.log(document);
    // console.log(window);
    // console.log(content);
    // const newSnippetsArray = [];
    // chrome.storage.sync.get("snippetsArray", ({ snippetsArray }) => {
    //   console.log(
    //     "snippetsArray before setting to newSnippets: ",
    //     snippetsArray
    //   );
    //   newSnippetsArray.push(snippetsArray.slice());
    // });
    // newSnippetsArray.push(content);
    // chrome.storage.sync.set({ snippetsArray: newSnippetsArray });
    // chrome.storage.sync.get("snippetsArray", ({ snippetsArray }) => {
    //   console.log(
    //     "snippetsArray after setting to newSnippets: ",
    //     snippetsArray
    //   );
    // });
    // container.textContent = content;
  }
};

document.onmouseup = getSelectedText;
