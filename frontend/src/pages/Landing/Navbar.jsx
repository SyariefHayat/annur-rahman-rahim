import React from 'react';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';

import EachUtils from '@/utils/EachUtils';
import { userAtomStorage } from '@/jotai/atoms';
import { Toaster } from '@/components/ui/sonner';
import { LIST_NAVBAR } from '@/constants/listNavbar';
import AccountMobile from '@/components/Modules/Landing/AccountMobile';
import AccountDesktop from '@/components/Modules/Landing/AccountDesktop';

const Navbar = ({ position }) => {
    const [user] = useAtom(userAtomStorage);

    return (
        <header className={`w-full ${position ? `${position}` : "absolute z-10"}`}>
            <Toaster />
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Yayasan Annur Rahman Rahim</span>
                        <img
                            alt="logo yayasan annur rahman rahim"
                            src="/logo.png"
                            className="h-10 w-auto"
                        />
                    </a>
                </div>

                <AccountMobile user={user} />

                <div className="hidden lg:flex lg:gap-x-12">
                    <EachUtils
                        of={LIST_NAVBAR}
                        render={(item, index) => (
                            <Link key={index} to={item.url} className="text-sm/6 font-semibold text-gray-900 cursor-pointer">
                                {item.title}
                            </Link>
                        )}
                    />
                </div>

                <AccountDesktop user={user} />
            </nav>
        </header>
    );
};

export default Navbar;
