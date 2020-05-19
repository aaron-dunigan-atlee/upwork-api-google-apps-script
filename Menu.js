/**
 * https://developers.google.com/apps-script/guides/dialogs
 */

function onOpen(e) {
  var ui = SpreadsheetApp.getUi()
  ui.createMenu('Upwork')
    .addItem('Show user info', 'showUserInfo') 
    // add your specific tasks here
  .addSeparator()
  .addSubmenu(ui.createMenu('Authorize')
  .addItem('Step 1', 'authorizeUserStep1') 
  .addItem('Step 2', 'authorizeUserStep2') )
  .addToUi();
}

function showUserInfo() {
  SpreadsheetApp.getUi().alert(JSON.stringify(upworkGetUserInfo(), null, 2))
}