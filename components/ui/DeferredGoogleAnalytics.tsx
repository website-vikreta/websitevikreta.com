"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

/** Mounts GA only once the page is idle (post-load), so its scripts don't
 *  compete with the initial render/hydration for main-thread time. */
export function DeferredGoogleAnalytics({ gaId }: { gaId: string }) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const load = () => {
			if ("requestIdleCallback" in window) {
				requestIdleCallback(() => setReady(true));
			} else {
				setTimeout(() => setReady(true), 1);
			}
		};

		if (document.readyState === "complete") {
			load();
			return;
		}
		window.addEventListener("load", load);
		return () => window.removeEventListener("load", load);
	}, []);

	if (!ready) return null;
	return <GoogleAnalytics gaId={gaId} />;
}
