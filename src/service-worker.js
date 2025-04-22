/* eslint-disable no-resctricted-globals */
import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { PrecacheRoute, createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);
const fileExtensionRegexp= new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
    ({request,url})=>{
        // if this isn't a navigation, skip
        if(request.mode!="navigate"){
            return false;
        }// if this is a URL that starts with /_ (underscore), skip it
        if(url.pathname.startsWith("/_")){
            return false;
        }// if this looks like a resource, because it constain // a file extension, skip it
        if(url.pathname.match(fileExtensionRegexp)){
            return false;
        }//retirn true to signal that we want to use the handler
        return true;
    },
    createHandlerBoundToURL(process.env.PUBLIC_URL+"/index.html")
);
registerRoute(
    // Add in any other file extensions or routing criteria as needed.
    ({ url }) =>
      url.origin === self.location.origin && url.pathname.endsWith(".png"), // Customize this strategy as needed, e.g., by changing to CacheFirst.
    new StaleWhileRevalidate({
      cacheName: "images",
      plugins: [
        // Ensure that once this runtime cache reaches a maximum size the
        // least-recently used images are removed.
        new ExpirationPlugin({ maxEntries: 50 }),
      ],
    })
  );
  self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
    }
  });