"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Code-split heavy WebGL cursor and disable SSR
const DynamicSplashCursor = dynamic(() => import("@/components/SplashCursor"), {
    ssr: false,
});

export default function ClientSplashCursor() {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const prefersReducedMotion =
            window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

        const isCoarsePointer =
            window.matchMedia?.("(pointer: coarse)")?.matches ?? false; // likely mobile/touch

        // Respect user/system settings and avoid enabling on touch devices to save resources
        if (prefersReducedMotion || isCoarsePointer) return;

        // Prefetch the chunk during idle time without mounting
        const prefetch = () => {
            try {
                import("@/components/SplashCursor");
            } catch { }
        };
        const requestIdle = (cb: IdleRequestCallback): number => {
            if (typeof window.requestIdleCallback === "function") {
                return window.requestIdleCallback(cb);
            }
            return window.setTimeout(
                () => cb({ didTimeout: false, timeRemaining: () => 0 } as IdleDeadline),
                1200
            );
        };
        requestIdle(() => prefetch());

        let activated = false;
        const activate = () => {
            if (activated) return;
            activated = true;
            setEnabled(true);
            cleanup();
        };

        const onPointerMove = () => activate();

        const cleanup = () => {
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("mousedown", activate);
            window.removeEventListener("touchstart", activate);
        };

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("mousedown", activate, { passive: true });
        window.addEventListener("touchstart", activate, { passive: true });

        return () => cleanup();
    }, []);

    if (!enabled) return null;

    return (
        <DynamicSplashCursor
            SIM_RESOLUTION={64}
            DYE_RESOLUTION={1024}
            CAPTURE_RESOLUTION={256}
            DENSITY_DISSIPATION={3.0}
            VELOCITY_DISSIPATION={1.8}
            PRESSURE={0.1}
            PRESSURE_ITERATIONS={15}
            CURL={3}
            SPLAT_RADIUS={0.18}
            SPLAT_FORCE={6000}
            SHADING={true}
            COLOR_UPDATE_SPEED={10}
            BACK_COLOR={{ r: 0, g: 0, b: 0 }}
            TRANSPARENT={true}
        />
    );
}
