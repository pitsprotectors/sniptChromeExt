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
