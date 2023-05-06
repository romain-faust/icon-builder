import { Application } from 'https://deno.land/x/oak@v12.4.0/mod.ts'

const app = new Application()

app.use(async (context) => {
    context.response.headers.set('Access-Control-Allow-Origin', '*')
    context.response.status = 200

    if (context.request.method === 'GET') {
        const iconId = context.request.url.pathname
        const response = await fetch(
            `https://twemoji.maxcdn.com/v/latest/svg/${iconId}.svg`,
            { method: 'GET' },
        )
        if (response.status === 200) {
            const icon = await response.text()
            context.response.headers.set('Content-Type', 'image/svg+xml')
            context.response.body = icon
        } else {
            context.response.status = 404
        }
    }
})

app.addEventListener('listen', ({ port }) => {
    console.log(`Server started at localhost:${port}`)
})

app.listen({ port: 8000 })
