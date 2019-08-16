console.log('background running');


let contextMenuItem ={
  "id": "add snipt",
  "title": "Add this snipt",
  "contexts":["selection"]
}
chrome.contextMenus.create(contextMenuItem)
window.snipts=[]

chrome.contextMenus.onClicked.addListener(function(clickData){
  if (clickData.menuItemId==="add snipt" && clickData.selectionText){
    window.snipts.push(clickData.selectionText)
  }
})

chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
  if (request.text==="clear"){
    window.snipts=[]
  }
}