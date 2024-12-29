export async function GET(ctx, next) {
    const res = await next();

    // Content Security Policy (CSP)
    res.headers.set(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; object-src 'none'; img-src 'self' https://*.githubusercontent.com/;"
    );


    // HTTP Strict Transport Security (HSTS)
    res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");

    // X-Content-Type-Options
    res.headers.set("X-Content-Type-Options", "nosniff");

    // X-Frame-Options
    res.headers.set("X-Frame-Options", "DENY");

    // X-XSS-Protection
    res.headers.set("X-XSS-Protection", "1; mode=block");

    // Referrer-Policy
    res.headers.set("Referrer-Policy", "no-referrer");

    // Permissions-Policy (formerly Feature-Policy)
    res.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");

    // Cross-Origin-Embedder-Policy (COEP)
    res.headers.set("Cross-Origin-Embedder-Policy", "require-corp");

    // Cross-Origin-Opener-Policy (COOP)
    res.headers.set("Cross-Origin-Opener-Policy", "same-origin");

    // Cross-Origin-Resource-Policy (CORP)
    res.headers.set("Cross-Origin-Resource-Policy", "same-origin");

    // Cache-Control (for better caching security)
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

    // Pragma (legacy cache control)
    res.headers.set("Pragma", "no-cache");

    // Expires (legacy cache control)
    res.headers.set("Expires", "0");

    return res;
}
