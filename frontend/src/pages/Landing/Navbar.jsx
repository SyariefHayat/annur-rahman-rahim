import React from 'react';
import { Menu } from 'lucide-react';

import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import EachUtils from '@/utils/EachUtils';
import { Button } from '@/components/ui/button';
import { LIST_NAVBAR } from '@/constants/listNavbar';

const Navbar = () => {
    return (
        <header className="absolute w-full">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Yayasan Yatallatop</span>
                        <img
                            alt=""
                            src="logo2.png"
                            className="h-14 w-auto"
                        />
                    </a>
                </div>

                <div className="flex lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>
                                    <a href="#" className="-m-1.5 p-1.5">
                                        <span className="sr-only">Yatallatop</span>
                                        <img
                                        alt=""
                                        src="logo2.png"
                                        className="h-8 w-auto"
                                        />
                                    </a>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="space-y-2 px-5">
                                <EachUtils
                                    of={LIST_NAVBAR}
                                    render={(item, index) => (
                                        <a
                                            key={index}
                                            href={item.url}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.title}
                                        </a>
                                    )}
                                />
                            </div>
                            <SheetFooter>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="hidden lg:flex lg:gap-x-12">
                    <EachUtils
                        of={LIST_NAVBAR}
                        render={(item, index) => (
                            <a key={index} href={item.url} className="text-sm/6 font-semibold text-gray-900">
                                {item.title}
                            </a>
                        )}
                    />
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm/6 font-semibold text-gray-900">
                    Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
