// TEST HAS EVERYTHING I NEED IN TERMS OF ACCESS
chrome.storage.sync.get("key", function(res) {
  console.log(res);
});

let backgroundPage = chrome.extension.getBackgroundPage();
console.log(backgroundPage);
