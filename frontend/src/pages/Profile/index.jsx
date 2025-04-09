import React from 'react';
import { useAtom } from 'jotai';
import { Toaster } from 'sonner';
import { BellIcon, EllipsisVertical, MessageCircle, Share2, ThumbsUp } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import Navbar from '../Landing/Navbar';
import { userAtomStorage } from '@/jotai/atoms';
import { getInitial } from '@/utils/getInitial';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Modules/Landing/Footer';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditProfileForm from '@/components/Modules/Landing/ZodForm/EditProfileForm';
import NewPasswordForm from '@/components/Modules/Landing/ZodForm/NewPasswordForm';
import HistoryDonationTable from '@/components/Modules/Landing/Table/HistoryDonationTable';
import Notification from '@/components/Modules/Landing/Notification';
import EachUtils from '@/utils/EachUtils';
import { LIST_ARTICLE } from '@/constants/listArticle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getRelativeTime } from '@/utils/formatDate';




const Profile = () => {
    const [user] = useAtom(userAtomStorage);

    return (
        <DefaultLayout>
            <Navbar position="relative" />
            <Toaster />
            <main className="mx-auto max-w-7xl h-full px-6 lg:px-8">
                {/* Cover */}
                <header className="relative w-full h-64 bg-gray-300 rounded-md bg-[url(https://github.com/shadcn.png)] bg-cover bg-center" />

                {/* User Info */}
                <section className="w-full flex gap-5 my-5" aria-label="User Profile">
                    <aside className="flex justify-center items-start">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Avatar className="w-40 h-40 cursor-pointer border-2 border-gray-200 hover:opacity-90 transition">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback className="text-5xl bg-gray-200 flex items-center justify-center">
                                        {getInitial(user?.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </DialogTrigger>

                            <DialogContent className="max-w-sm">
                                <DialogHeader>
                                    <DialogTitle>Kelola Foto</DialogTitle>
                                    <DialogDescription>Pilih tindakan untuk mengelola foto profil Anda.</DialogDescription>
                                </DialogHeader>

                                <div className="space-y-2 mt-4">
                                    <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                        Ubah Foto Album
                                    </button>
                                    <DropdownMenuSeparator />
                                    <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                        Ubah Foto Profil
                                    </button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </aside>

                    <article className="w-full flex flex-col justify-center gap-2">
                        <h1 className="text-4xl font-semibold">{user?.name}</h1>
                        <p className="text-gray-600">{user?.email}</p>
                        <p className="text-sm text-gray-500">{user?.bio}</p>
                    </article>
                </section>

                {/* Tabs */}
                <Tabs defaultValue="history-donation" className="w-full mt-10">
                    <TabsList>
                        <TabsTrigger value="history-donation">Riwayat Donasi</TabsTrigger>
                        {user.role === "author" && (
                            <TabsTrigger value="postingan">Postingan</TabsTrigger>
                        )}
                        <TabsTrigger value="edit-profile">Edit Profil</TabsTrigger>
                        <TabsTrigger value="edit-password">Ubah Password</TabsTrigger>
                        <TabsTrigger value="notification">Pemberitahuan</TabsTrigger>
                    </TabsList>

                    <Separator className="my-4" />

                    {user.role === "author" && (
                        <TabsContent value="postingan">
                            <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                <EachUtils
                                of={LIST_ARTICLE}
                                render={(item, index) => (
                                        <article key={index} className="flex max-w-xl h-[300px] flex-col items-start justify-between overflow-hidden">
                                            <figure className="w-full h-[70%] rounded-xl overflow-hidden">
                                                <img 
                                                    src={`/slide-${index + 1}.png`} 
                                                    alt={item.title} 
                                                    className="w-full h-full object-cover object-center"
                                                />
                                            </figure>

                                            <div className="w-full h-[30%] flex pt-4">
                                                <a href={item.href}>
                                                    <h3 className="text-lg/6 font-semibold">{item.title}</h3>
                                                </a>

                                                <Button variant="ghost" size="icon" className="size-6 rounded-sm cursor-pointer">
                                                    <EllipsisVertical />
                                                </Button>
                                            </div>

                                            <footer className="w-full flex items-center justify-between text-sm/6 text-gray-600">
                                                <div className="flex gap-3">
                                                    <Button variant="ghost">
                                                        <ThumbsUp/>
                                                        20
                                                    </Button>
                                                    <Button variant="ghost">
                                                        <MessageCircle/>
                                                        30
                                                    </Button>
                                                    <Button variant="ghost">
                                                        <Share2/>
                                                        10
                                                    </Button>
                                                </div>
                                                <p>{getRelativeTime(item.createdAt)}</p>
                                            </footer>
                                        </article>
                                    )}
                                />
                            </div>
                        </TabsContent>
                    )}

                    <TabsContent value="history-donation">
                        <HistoryDonationTable />
                    </TabsContent>

                    <TabsContent value="edit-profile">
                        <EditProfileForm />
                    </TabsContent>


                    <TabsContent value="edit-password">
                        <NewPasswordForm />
                    </TabsContent>

                    <TabsContent value="notification">
                        <Notification/>
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </DefaultLayout>
    );
};

export default Profile;
