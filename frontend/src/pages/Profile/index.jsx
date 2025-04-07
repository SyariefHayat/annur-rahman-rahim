import React from 'react';
import { useAtom } from 'jotai';

import Navbar from '../Landing/Navbar';
import { userAtomStorage } from '@/jotai/atoms';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Modules/Landing/Footer';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]

const Profile = () => {
    const [user] = useAtom(userAtomStorage);

    return (
        <DefaultLayout>
            <Navbar position="relative" />
            <main className="mx-auto max-w-7xl h-full px-6 lg:px-8">
                {/* Cover */}
                <header className="w-full h-64 bg-gray-300 rounded-md" />

                {/* User Info */}
                <section className="w-full flex gap-5 my-5" aria-label="User Profile">
                <aside className="flex justify-center items-start">
                    <figure>
                    <div className="w-40 h-40 bg-gray-300 rounded-full" />
                    </figure>
                </aside>

                <article className="w-full flex flex-col justify-center gap-2">
                    <h1 className="text-4xl font-semibold">{user.name}</h1>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">
                    Member sejak Januari 2024.
                    </p>
                </article>
                </section>

                {/* Tabs */}
                <Tabs defaultValue="history-donation" className="w-full mt-10">
                    <TabsList>
                        <TabsTrigger value="history-donation">Riwayat Donasi</TabsTrigger>
                        <TabsTrigger value="edit-profile">Edit Profil</TabsTrigger>
                        <TabsTrigger value="edit-password">Ubah Password</TabsTrigger>
                        <TabsTrigger value="notification">Pemberitahuan</TabsTrigger>
                    </TabsList>

                    <Separator className="my-4" />

                    <TabsContent value="history-donation">
                        <Table>
                            <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[100px]">Invoice</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((invoice) => (
                                <TableRow key={invoice.invoice}>
                                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                    <TableCell>{invoice.paymentStatus}</TableCell>
                                    <TableCell>{invoice.paymentMethod}</TableCell>
                                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">$2,500.00</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TabsContent>

                    <TabsContent value="edit-profile">
                        <div className="w-full h-52 bg-gray-300 rounded-md"></div>
                    </TabsContent>

                    <TabsContent value="edit-password">
                        <div className="w-full h-52 bg-gray-300 rounded-md"></div>
                    </TabsContent>

                    <TabsContent value="notification">
                        <div className="w-full h-52 bg-gray-300 rounded-md"></div>
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </DefaultLayout>
    );
};

export default Profile;
