import React from 'react'

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

const donations = [
    {
        id: "DN001",
        status: "Berhasil",
        nominal: "Rp250.000",
        metode: "Kartu Kredit",
    },
    {
        id: "DN002",
        status: "Menunggu",
        nominal: "Rp150.000",
        metode: "PayPal",
    },
    {
        id: "DN003",
        status: "Gagal",
        nominal: "Rp350.000",
        metode: "Transfer Bank",
    },
    {
        id: "DN004",
        status: "Berhasil",
        nominal: "Rp450.000",
        metode: "Kartu Kredit",
    },
    {
        id: "DN005",
        status: "Berhasil",
        nominal: "Rp550.000",
        metode: "PayPal",
    },
    {
        id: "DN006",
        status: "Menunggu",
        nominal: "Rp200.000",
        metode: "Transfer Bank",
    },
    {
        id: "DN007",
        status: "Gagal",
        nominal: "Rp300.000",
        metode: "Kartu Kredit",
    },
]

const HistoryDonationTable = () => {
    return (
        <Table>
            <TableCaption>Riwayat donasi kamu selama ini.</TableCaption>

            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID Donasi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Metode Pembayaran</TableHead>
                    <TableHead className="text-right">Nominal</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {donations.map((donasi) => (
                    <TableRow key={donasi.id}>
                        <TableCell className="font-medium">{donasi.id}</TableCell>
                        <TableCell>{donasi.status}</TableCell>
                        <TableCell>{donasi.metode}</TableCell>
                        <TableCell className="text-right">{donasi.nominal}</TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">Rp2.250.000</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default HistoryDonationTable
