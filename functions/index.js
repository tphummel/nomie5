async function handleRequest(request) {
  let resp = await fetch(request.url, request);

  let newResp = new Response(resp.body, {
    headers: resp.headers,
    status: resp.status
  })

  if (request.url.endsWith(".css")) {
    newResp.headers.set("Content-Type", "text/css");
  }
  if (request.url.endsWith(".js")) {
    newResp.headers.set("Content-Type", "application/javascript");
  }

  return newResp;
}

addEventListener("fetch", event => event.respondWith(handleRequest(event.request)))