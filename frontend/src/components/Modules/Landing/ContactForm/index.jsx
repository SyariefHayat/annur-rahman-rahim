import React from 'react'
import { Label } from '@/components/ui/label'

const ContactForm = () => {
    return (
        <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Kontak Kami</h2>
                <p className="mt-2 text-lg/8 text-gray-600">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p>
            </div>
            <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">Nama Depan</Label>
                        <div className="mt-2.5">
                            <input
                                id="first-name"
                                name="first-name"
                                type="text"
                                placeholder="John"
                                autoComplete="given-name"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">Nama Belakang</Label>
                        <div className="mt-2.5">
                            <input
                                id="last-name"
                                name="last-name"
                                type="text"
                                placeholder="Doe"
                                autoComplete="family-name"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">Email</Label>
                        <div className="mt-2.5">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="example@gmail.com"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor="subject" className="block text-sm/6 font-semibold text-gray-900">Subjek</Label>
                        <div className="mt-2.5">
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                autoComplete="organization"
                                placeholder="Masalah"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">No Hp</Label>
                        <div className="mt-2.5">
                            <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-blue-600">
                                <input
                                id="phone-number"
                                name="phone-number"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="081456456789"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, "");
                                }}
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">Pesan</Label>
                        <div className="mt-2.5">
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                                defaultValue={''}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Kirim Pesan
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ContactForm