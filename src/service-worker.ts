import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';

console.log('service-worker!');
registerRoute(
    /\.js$/,
    new NetworkFirst()
);

registerRoute(
    /\.css$/,
    // Use cache but update in the background.
    new StaleWhileRevalidate({
        cacheName: 'css-cache',
    })
);
registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    // Use the cache if it's available.
    new CacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 20,
                // Cache for a maximum of a week.
                maxAgeSeconds: 7 * 24 * 60 * 60,
            })
        ],
    })
);

precacheAndRoute(self.__WB_MANIFEST);
