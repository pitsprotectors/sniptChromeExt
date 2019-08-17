console.log("background running");

let contextMenuItem = {
  id: "addSnipt",
  title: "Add Snippet to Dashboard",
  contexts: ["selection"]
};
chrome.contextMenus.create(contextMenuItem);
window.snippetsArray = [];

chrome.contextMenus.onClicked.addListener(function(clickData) {
  if (clickData.menuItemId === "addSnipt" && clickData.selectionText) {
    window.snippetsArray.push(clickData.selectionText);
  }
});

// chrome.runtime.onMessage.addListener(receiver);

// function receiver(request, sender, sendResponse) {
// if ((request.text = "getSnippets")) {
//   sendResponse({ snippetsArray: window.snippetsArray });
// }
// if (request.text === "clear") {
//   window.snippetsArray = [];
// }
// if (request.text === "footer") {
//   chrome.tabs.executeScript({ file: "js/content.js" });
// }
// }
