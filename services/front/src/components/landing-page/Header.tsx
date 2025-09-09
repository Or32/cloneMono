import * as React from 'react';
import Navbar from "@/components/landing-page/Navbar";
import {TopBanner} from "@/components/landing-page/TopBanner";

type Props = {
    scrollToCtaSection: () => void;
}

export const Header = ({scrollToCtaSection}: Props) => {
    return (
        <header className="sticky top-0 backdrop-blur-md z-10">
            <TopBanner/>
            <div className="py-5">
                <Navbar scrollToCta={scrollToCtaSection}/>
            </div>
        </header>
    );
};