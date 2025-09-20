### REST from JavaScript

You can invoke the Books API using REST from JavaScript (also called JSON-P), using the callback query parameter and a callback function. This allows you to write rich applications that display Books data without writing any server side code.

> **Note:** You can call authenticated methods by passing an OAuth 2.0 token using the `access_token` parameter. To obtain an OAuth 2.0 token for use with JavaScript, follow the instructions described in [OAuth 2.0 for client-side web applications](https://developers.google.com/identity/protocols/oauth2/javascript-client-side). In the "API Access" tab of the APIs Console, be sure set up a Client ID for web applications, and to use those OAuth 2.0 credentials when getting your token.

The following example uses this approach to display search results for "harry potter":

```html
<html>
  <head>
    <title>Books API Example</title>
  </head>
  <body>
    <div id="content"></div>
    <script>
      function handleResponse(response) {
      for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i];
        // in production code, item.text should have the HTML entities escaped.
        document.getElementById("content").innerHTML += "<br>" + item.volumeInfo.title;
      }
    }
    </script>
    <script src="https://www.googleapis.com/books/v1/volumes?q=harry+potter&callback=handleResponse"></script>
  </body>
</html>
```
