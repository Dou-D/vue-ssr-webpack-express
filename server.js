const express = require('express')
const path = require('path')
const { renderToString } = require('vue/server-renderer')

const clientManifest = require('./dist/manifest-client.json')
const serverManifest = require("./dist/manifest-server.json");
const serverBundle = path.join(__dirname, './dist', serverManifest["server.js"])

const createApp = require(serverBundle).default

const server = express()

server.get('/', async (req, res) => {
    const app = createApp()

    const html = await renderToString(app)
    const clientBundle = clientManifest["client.js"]
    res.send(
`<!DOCTYPE html>
<html>
    <head>
      <title>Vue SSR Example</title>
    </head>
    <body>
      <!-- 注入组件运行结果 -->
      <div id="app">${html}</div>
      <!-- 注入客户端代码产物路径 -->
      <!-- 实现 Hydrate 效果 -->
      <script src="${clientBundle}"></script>
    </body>
</html>`
    )
})

server.use(express.static('./dist'))

server.listen(3000, () => {
    console.log("ready");
})