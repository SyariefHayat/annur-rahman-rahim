import React from 'react';
import { useAtom } from 'jotai';
import { Toaster } from 'sonner';

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

import Post from '@/components/Modules/Landing/Post';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddArticleBtn from '@/components/Modules/Landing/Button/AddArticleBtn';

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
                    <div className="flex justify-between">
                        <TabsList>
                            <TabsTrigger value="history-donation">Riwayat Donasi</TabsTrigger>
                            {user.role === "author" && (
                                <TabsTrigger value="postingan">Postingan</TabsTrigger>
                            )}
                            <TabsTrigger value="edit-profile">Edit Profil</TabsTrigger>
                            <TabsTrigger value="edit-password">Ubah Password</TabsTrigger>
                            <TabsTrigger value="notification">Pemberitahuan</TabsTrigger>
                        </TabsList>

                        <AddArticleBtn />
                    </div>

                    <Separator className="my-4" />

                    {user.role === "author" && (
                        <TabsContent value="postingan">
                            <Post/>
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
