function getSelectedText() {
  var content = "";
  if (
    window
      .getSelection()
      .toString()
      .trim().length
  ) {
    content = window.getSelection().toString();
    console.log(content);
    chrome.storage.sync.set({ content });
  }
}

console.log("is this file running?");

document.onmouseup = getSelectedText;
