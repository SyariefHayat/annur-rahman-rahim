import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FaqSection = () => {
    return (
        <section className="relative py-14 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-4xl font-semibold tracking-tight text-pretty text-center text-gray-900 sm:text-5xl mb-14">Tanya Jawab Umum</h2>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Bagaimana cara berdonasi?</AccordionTrigger>
                        <AccordionContent>
                        Anda dapat berdonasi melalui halaman "Donasi" di website kami. Pilih jumlah donasi yang diinginkan dan metode pembayaran yang tersedia.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Apa saja metode pembayaran yang tersedia untuk donasi?</AccordionTrigger>
                        <AccordionContent>
                        Kami menerima donasi melalui transfer bank, kartu kredit/debit, dan dompet digital.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Apakah saya bisa mendapatkan bukti donasi?</AccordionTrigger>
                        <AccordionContent>
                        Ya, setelah donasi berhasil, Anda akan menerima email konfirmasi dan bukti donasi yang dapat diunduh.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger>Apakah donasi saya bisa dikembalikan?</AccordionTrigger>
                        <AccordionContent>
                        Mohon maaf, donasi yang telah diberikan tidak dapat dikembalikan. Namun, jika terjadi kesalahan transaksi, silakan hubungi kami segera.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                        <AccordionTrigger>Bagaimana cara berkontribusi dengan menulis artikel di blog?</AccordionTrigger>
                        <AccordionContent>
                        Jika Anda ingin berbagi kisah inspiratif atau informasi yang relevan dengan kegiatan sosial, silakan hubungi tim kami melalui email atau formulir kontak di website.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                        <AccordionTrigger>Bagaimana cara menghubungi yayasan?</AccordionTrigger>
                        <AccordionContent>
                        Anda bisa menghubungi kami melalui email, nomor telepon, atau mengisi formulir kontak yang tersedia di halaman "Kontak" di website.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                {/* <p>Jika Anda memiliki pertanyaan lain, jangan ragu untuk menghubungi kami. Terima kasih atas dukungan Anda!</p> */}
            </div>
        </section>
    )
}

export default FaqSection