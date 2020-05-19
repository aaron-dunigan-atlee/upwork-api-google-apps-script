## Upwork API in Google Apps Script

Use this script to authorize and access the Upwork API.

You'll need an API key from Upwork.

**Notes:**

Upwork API uses the 'post' method for authorization, rather than the default 'get', so I've added `.setMethod('post')` to the standard OAuth1 `getService()`.

The first authorization step generates an `auth_verifier` value which is displayed on screen but is not passed to the callback URL, so you'll have to copy it and add it manually.  i.e., Append `&auth_verifier=xxxxxxxxxxx` to the callback URL to complete the authorization process. 