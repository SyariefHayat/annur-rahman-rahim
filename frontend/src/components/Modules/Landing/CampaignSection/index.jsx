import React from 'react'

import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card'

import EachUtils from '@/utils/EachUtils'
import { Badge } from '@/components/ui/badge'
import { LIST_CAMPAIGN } from '@/constants/listCampaign'

const CampaignSection = () => {
    return (
        <section className="relative py-14 sm:py-24">
            <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Campaign Kami</h2>
                    <p className="mt-2 text-lg/8 text-gray-600">Bantu mereka yang membutuhkan dengan berkontribusi dalam berbagai kampanye donasi yang tersedia.</p>
                </div>

                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-300 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <EachUtils
                        of={LIST_CAMPAIGN}
                        render={(item, index) => (
                            <Card 
                                key={index} 
                                style={{ backgroundImage: `url(${item.backgroundImage})` }} 
                                className="group flex max-w-xl h-[450px] flex-col items-start justify-between rounded-xl ring-1 shadow-xl ring-gray-400/10 bg-cover bg-center relative overflow-hidden"
                            >
                                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent cursor-pointer"></div>
                                <CardHeader>
                                    <CardTitle>
                                        <Badge className="relative rounded-full bg-[#f3f3f3] px-3 py-1 text-xs font-medium text-gray-800 shadow-md transition-colors duration-200 group-hover:bg-gray-300">
                                            {item.category.title}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent></CardContent>
                                <CardFooter className="relative flex flex-col">
                                    <div className="w-full flex items-center gap-x-4">
                                        <time dateTime={item.datetime} className="text-sm text-gray-200">
                                            {item.date}
                                        </time>
                                    </div>

                                    <div>
                                        <h3 className="mt-3 text-lg/6 font-semibold text-white transition-colors duration-200 group-hover:text-gray-200">
                                            <a href={item.href}>
                                            <span className="absolute inset-0" />
                                            {item.title}
                                            </a>
                                        </h3>
                                        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-200"> 
                                            {item.description}
                                        </p>
                                    </div>
                                </CardFooter>
                            </Card>
                        )}
                    />
                </div>
            </div>

            <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                />
            </div>
        </section>
    )
}

export default CampaignSection