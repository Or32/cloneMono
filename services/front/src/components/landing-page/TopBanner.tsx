import * as React from 'react';
import {ArrowRight} from "lucide-react";

export const TopBanner = () => {
    return (
        <div className="flex justify-center items-center py-3 bg-primary text-white text-sm gap-3">
            <p className="text-white/80 hidden md:block">
                MCP Servers. Ready in Seconds.
            </p>
            <div className="inline-flex gap-1 items-center">
                <p>
                    Join the Waitlist — Be the First to Know
                </p>
                <ArrowRight className="h-4 w-4 inline-flex justify-center items-center"/>
            </div>
        </div>
    );
};