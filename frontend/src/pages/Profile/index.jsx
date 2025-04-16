import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Toaster } from 'sonner';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import Navbar from '../Landing/Navbar';
import { userAtomStorage } from '@/jotai/atoms';
import { getInitial } from '@/utils/getInitial';
import Post from '@/components/Modules/Profile/Post';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Modules/Landing/Footer';
import History from '@/components/Modules/Profile/History';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import EditProfile from '@/components/Modules/Profile/EditProfile';
import NewPassword from '@/components/Modules/Profile/NewPassword';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Notification from '@/components/Modules/Profile/Notification';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import AddArticleBtn from '@/components/Modules/Profile/AddArticleBtn';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
    const [user] = useAtom(userAtomStorage);

    return (
        <DefaultLayout>
            <Navbar position="relative" />
            <Toaster />
            <main className="mx-auto max-w-7xl h-full px-6 lg:px-8">
                {/* Cover */}
                <header className="relative w-full h-40 md:h-64 bg-gray-300 rounded-md bg-[url(https://github.com/shadcn.png)] bg-cover bg-center" />

                {/* User Info */}
                <section className="w-full flex gap-5 my-5" aria-label="User Profile">
                    <aside className="flex justify-center items-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Avatar className="w-20 h-20 md:w-40 md:h-40 cursor-pointer hover:opacity-90 transition">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback className="text-3xl md:text-5xl bg-gray-200 flex items-center justify-center">
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
                        <h1 className="text-xl md:text-4xl font-semibold">{user?.name}</h1>
                        <p className="text-sm md:text-base text-gray-600">{user?.email}</p>
                        <p className="text-xs md:text-sm text-gray-500">{user?.bio}</p>
                    </article>
                </section>

                {/* Tabs */}
                <Tabs defaultValue="history-donation" className="w-full mt-10">
                    <div className="flex justify-between items-start gap-4 flex-col-reverse sm:flex-row">
                        <ScrollArea className="w-full sm:w-auto">
                            <TabsList className="flex w-max">
                                <TabsTrigger value="history-donation">Riwayat Donasi</TabsTrigger>
                                {user.role === "author" && (
                                <TabsTrigger value="postingan">Postingan</TabsTrigger>
                                )}
                                <TabsTrigger value="edit-profile">Edit Profil</TabsTrigger>
                                <TabsTrigger value="edit-password">Ubah Password</TabsTrigger>
                                <TabsTrigger value="notification">Pemberitahuan</TabsTrigger>
                            </TabsList>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>

                        <AddArticleBtn />
                    </div>

                    <Separator className="my-4" />

                    {user.role === "author" && (
                        <TabsContent value="postingan">
                            <Post />
                        </TabsContent>
                    )}

                    <TabsContent value="history-donation">
                        <History />
                    </TabsContent>

                    <TabsContent value="edit-profile">
                        <EditProfile />
                    </TabsContent>

                    <TabsContent value="edit-password">
                        <NewPassword />
                    </TabsContent>

                    <TabsContent value="notification">
                        <Notification />
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </DefaultLayout>
    );
};

export default Profile;
