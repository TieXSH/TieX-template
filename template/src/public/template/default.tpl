<!DOCTYPE html>
<html>
<head>
    <%= require('html-loader!./layout/meta.tpl') %>
    <title><%= htmlWebpackPlugin.options.title %></title>
    <%= htmlWebpackPlugin.tags.headTags %>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css">
</head>

<body>
    <div id="app" style="height: 100%"></div>
    <!--vue-ssr-outlet-->
    <script>
        window.onload = function (){
        }
    </script>
</body>
</html>
