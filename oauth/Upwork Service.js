/**
 * 
 */

var UPWORK_BASE_URL = 'https://www.upwork.com'
var PROPERTY_STORE = PropertiesService.getUserProperties()

function getUpworkService() {
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
  return OAuth1.createService('upwork')
      // Set the endpoint URLs.
      .setAccessTokenUrl(UPWORK_BASE_URL + '/api/auth/v1/oauth/token/access')
      .setRequestTokenUrl(UPWORK_BASE_URL + '/api/auth/v1/oauth/token/request')
      .setAuthorizationUrl(UPWORK_BASE_URL + '/services/api/auth')
      // Set the consumer key and secret.
      .setConsumerKey(PROPERTY_STORE.getProperty('consumer_key'))
      .setConsumerSecret(PROPERTY_STORE.getProperty('consumer_secret'))
      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('authCallback')
      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PROPERTY_STORE)
      // For upwork, we have to use the post method instead of default get
      .setMethod('post')
}

/**
 * Authorize user in a sidebar.
 * @param {Service} service 
 */
function authorizeUserStep1() {
  var ui = SpreadsheetApp.getUi()
  var upworkService = getUpworkService();
  if (!upworkService.hasAccess()) {
    var authorizationUrl = upworkService.authorize();
    var template = HtmlService.createTemplateFromFile('oauth/auth-sidebar-1');
    template.authorizationUrl = authorizationUrl;
    var page = template.evaluate().setTitle('Authorization Needed').setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    ui.showSidebar(page);
  } else {
    ui.alert('You\'re already authorized!')
  }
}

/**
 * Authorize user in a sidebar.
 * @param {Service} service 
 */
function authorizeUserStep2() {
  var ui = SpreadsheetApp.getUi()
  var upworkService = getUpworkService();
  if (!upworkService.hasAccess()) {
    var verifier = ui.prompt('Enter the oauth_verifier from Step 1:').getResponseText()
    if (!verifier) return;
    var authorizationUrl = upworkService.getCallbackUrl() + '&oauth_verifier=' + verifier;
    var template = HtmlService.createTemplateFromFile('oauth/auth-sidebar-2');
    template.authorizationUrl = authorizationUrl;
    var page = template.evaluate().setTitle('Authorization Needed').setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    ui.showSidebar(page);
  } else {
    ui.alert('You\'re already authorized!')
  }
}

function authCallback(request) {
  var upworkService = getUpworkService();
  var isAuthorized = upworkService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}

/**
 * Logs the callback URL to register.
 * Visit this url to complete the authorization process, but you need to add the parameter &oauth_verifier=
 */
function logCallbackUrl() {
  var service = getUpworkService();
  var callbackUrl = service.getCallbackUrl()
  Logger.log(callbackUrl);

}

/**
 * Reset the authorization state, so that it can be re-tested.
 */
function resetOauthService() {
  getService().reset();
}

/**
 * Run once then remove your key/secret.
 */
function setKeyAndSecret() {
  PROPERTY_STORE.setProperties({
    'consumer_key': 'PUT YOUR KEY HERE',
    'consumer_secret': 'PUT YOUR SECRET HERE'
  })
}