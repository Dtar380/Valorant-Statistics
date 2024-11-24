function load_JSON_(url) {
    const request = new XMLHttpRequest();
    request.open('GET', url, false); // false makes it synchronous
    request.send(null);

    if (request.status === 200) {
        return JSON.parse(request.responseText);
    } else {
        throw new Error(`Failed to load JSON: ${request.status}`);
    }
}

window.load_JSON = load_JSON_;
