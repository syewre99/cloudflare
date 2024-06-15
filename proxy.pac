function FindProxyForURL(url, host) {
    // List of Google DNS servers
    var googleDnsServers = ["8.8.8.8", "8.8.4.4"];

    // Function to check if the host resolves to a Google DNS server
    function isGoogleDns(host) {
        var resolvedIp = dnsResolve(host);
        return googleDnsServers.indexOf(resolvedIp) !== -1;
    }

    // Direct access for local network addresses
    if (isPlainHostName(host) || 
        shExpMatch(host, "*.local") || 
        isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") || 
        isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") || 
        isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0")) {
        return "DIRECT";
    }

    // Use Google DNS for all other requests
    if (isGoogleDns(host)) {
        return "DIRECT";
    }

    // Default proxy settings
    return "PROXY yourproxyserver:8080; DIRECT";
}
