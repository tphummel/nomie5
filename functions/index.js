async function transformMimeType(request) {
  const { pathname } = new URL(request.url)
  let resp = await fetch(request.url, request)

  let newResp = new Response(resp.body, {
    headers: resp.headers,
    status: resp.status,
  })

  if (pathname.endsWith(".css")) {
    newResp.headers.set("Content-Type", "text/css")
  }
  if (pathname.endsWith(".js")) {
    newResp.headers.set("Content-Type", "application/javascript")
  }

  return newResp
}

addEventListener("fetch", event => event.respondWith(transformMimeType(event.request)))