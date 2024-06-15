function FindProxyForURL(url, host) {
    // List of Cloudflare DNS servers
    var cloudflareDnsServers = ["1.1.1.1", "1.0.0.1"];

    // Function to check if the host resolves to a Cloudflare DNS server
    function isCloudflareDns(host) {
        var resolvedIp = dnsResolve(host);
        return cloudflareDnsServers.indexOf(resolvedIp) !== -1;
    }

    // Direct access for local network addresses
    if (isPlainHostName(host) || 
        shExpMatch(host, "*.local") || 
        isInNet(dnsResolve(host), "10.128.1.0", "255.255.255.0") || 
        isInNet(dnsResolve(host), "192.168.0.0", "255.255.255.0") || 
        isInNet(dnsResolve(host), "192.168.68.0", "255.255.255.0")) {
        return "DIRECT";
    }

    // Use Cloudflare DNS for all other requests
    if (isCloudflareDns(host)) {
        return "DIRECT";
    }

    // Default proxy settings
    return "PROXY yourproxyserver:8080; DIRECT";
}
