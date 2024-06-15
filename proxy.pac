function FindProxyForURL(url, host) {
  // List of domains to bypass proxy
  var direct = ["localhost", "127.0.0.1"];

  // Bypass proxy for local addresses
  for (var i = 0; i < direct.length; i++) {
    if (shExpMatch(host, direct[i])) {
      return "DIRECT";
    }
  }

  // All other requests go through Cloudflare proxy
  // Replace 'proxy.example.com' and '8080' with your Cloudflare proxy address and port
  return "PROXY proxy.example.com:8080; DIRECT";
}
