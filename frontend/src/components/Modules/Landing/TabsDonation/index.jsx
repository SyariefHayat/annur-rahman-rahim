import { Heart } from 'lucide-react'
import React, { useState } from 'react'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"

import EachUtils from '@/utils/EachUtils'
import { Toggle } from "@/components/ui/toggle"
import { LIST_PRAY } from "@/constants/listPray"
import { Separator } from "@/components/ui/separator"
import { LIST_DONATUR } from "@/constants/listDonatur"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TabsDonation = () => {
    const [prayers, setPrayers] = useState([10, 17, 4]);
    const [isPrays, setIsPrays] = useState([false, false, false]);

    const handleTogglePray = (index) => {
        setPrayers((prev) => {
            const updated = [...prev];
            updated[index] = isPrays[index] ? updated[index] - 1 : updated[index] + 1;
            return updated;
        });

        setIsPrays((prev) => {
            const updated = [...prev];
            updated[index] = !prev[index];
            return updated;
        })
    }

    return (
        <Tabs defaultValue="campaign-story" className="w-full mt-0 sm:mt-14">
            <TabsList className="gap-4 w-full sm:w-fit">
                <TabsTrigger value="campaign-story">Cerita</TabsTrigger>
                <TabsTrigger value="campaign-donation">Donasi <span className="text-blue-500">1000</span></TabsTrigger>
                <TabsTrigger value="campaign-pray">Doa Orang Baik</TabsTrigger>
            </TabsList>
            
            <TabsContent value="campaign-story" className="mt-4">
                <Card>
                    <CardContent>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Cerita Penggalangan Dana</h2>
                        <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed itaque et nam est qui explicabo adipisci tempora nulla ullam a iste pariatur laboriosam, esse quidem. Facere, quia eligendi? Dolores, voluptatum! Incidunt eveniet consequuntur sint itaque vel necessitatibus officia doloremque aliquam maxime in tempora optio similique fugit odit reprehenderit esse quae quo quas iste praesentium qui, pariatur ut totam? Minima, beatae. Dolorem labore fugiat minus sint, quidem minima beatae voluptas, hic cum, neque officia corrupti. Dolores maxime corrupti, tenetur quas reiciendis rerum expedita! Ut unde amet molestias deserunt? Natus laboriosam a dicta alias quasi assumenda at et molestias possimus, ipsum explicabo?</p>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="campaign-donation" className="mt-4">
                <ScrollArea className={`${LIST_DONATUR.length > 8 ? "h-[420px]" : "h-auto"} w-full pr-2`}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <EachUtils
                            of={LIST_DONATUR}
                            render={(item, index) => (
                                <Card key={index}>
                                    <CardContent className="flex items-center gap-x-4">
                                        <Avatar className="w-14 h-14">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>

                                        <div className="text-sm/6">
                                            <p className="font-semibold text-gray-900">
                                                {item.name}
                                            </p>
                                            <p className="text-gray-600">
                                                Berdonasi sebesar <span className="font-semibold text-gray-900">{item.amount}</span>
                                            </p>
                                            <p className="text-xs/6 text-gray-600">{item.time}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        />
                    </div>
                </ScrollArea>
            </TabsContent>

            <TabsContent value="campaign-pray" className="mt-4">
                <ScrollArea className={`${LIST_PRAY.length > 5 ? "h-[600px] sm:h-[540px]" : "h-auto"} w-full pr-2`}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <EachUtils
                            of={LIST_PRAY}
                            render={(item, index) => (
                                <Card key={index} className="gap-2 pb-0">
                                    <CardHeader>
                                        <div className="flex items-center gap-x-4">
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>

                                            <div className="text-sm/6">
                                                <p className="font-semibold text-gray-900">
                                                    {item.name}
                                                </p>
                                                <p className="text-gray-600">{item.time}</p>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="flex flex-col">
                                            <p className="text-gray-600">{item.pray}</p>
                                            <p className=" text-sm/6 mt-5 text-gray-600"><span className="text-gray-900 font-semibold">{prayers[index]} Orang</span> mengaminkan doa ini</p>
                                        </div>
                                    </CardContent>

                                    <Separator className="mt-2"/>

                                    <CardFooter className="mb-3 mt-1">
                                        <Toggle aria-label="Pray" pressed={isPrays[index]} onPressedChange={() => handleTogglePray(index)} className="mx-auto cursor-pointer">
                                            <Heart className={`${isPrays[index] ? "text-red-400" : ""}`}/> Amin
                                        </Toggle>
                                    </CardFooter>
                                </Card>
                            )}
                        />
                    </div>
                </ScrollArea>
            </TabsContent>
        </Tabs>
    )
}

export default TabsDonation