chrome.runtime.onInstalled.addListener(function() {
  chrome.commands.onCommand.addListener(function(command) {
    console.log("Command:", command);
  });
});
