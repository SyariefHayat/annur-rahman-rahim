import React from 'react';
import { useAtom } from 'jotai';

import EachUtils from '@/utils/EachUtils';
import { userAtomStorage } from '@/jotai/atoms';
import { LIST_NAVBAR } from '@/constants/listNavbar';
import AccountMobile from '@/components/Modules/Landing/Account/AccountMobile';
import AccountDesktop from '@/components/Modules/Landing/Account/AccountDesktop';

const Navbar = ({ position }) => {
    const [user] = useAtom(userAtomStorage);

    return (
        <header className={`w-full ${position ? `${position}` : "absolute z-10"}`}>
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
                            <a key={index} href={item.url} className="text-sm/6 font-semibold text-gray-900 cursor-pointer">
                                {item.title}
                            </a>
                        )}
                    />
                </div>

                <AccountDesktop user={user} />
            </nav>
        </header>
    );
};

export default Navbar;
