import './docs.css'

import { source } from '@/docs/docs/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <DocsLayout themeSwitch={{enabled: false}} tree={source.pageTree} nav={{
            title: (
                <>
                    <svg
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Logo"
                    >
                        <circle cx={12} cy={12} r={12} fill="currentColor" />
                    </svg>
                    Rename
                </>
            ),
        }}>
            {children}
        </DocsLayout>
    );
}