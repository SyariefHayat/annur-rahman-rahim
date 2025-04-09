import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { userAtomStorage } from '@/jotai/atoms'
import { apiInstanceExpress } from '@/services/express/apiInstance'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { BellIcon } from 'lucide-react'
import { getRelativeTime } from '@/utils/formatDate'
import EachUtils from '@/utils/EachUtils'

const Notification = () => {
    const [user] = useAtom(userAtomStorage)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                if (!user?.id) return

                const response = await apiInstanceExpress.get(`notification/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        }
                    }
                )
                setNotifications(response.data.data || []) // asumsi struktur responsnya: { data: [...], message: "..." }
            } catch (error) {
                console.error("Gagal mengambil notifikasi:", error)
            }
        }

        fetchNotifications()
    }, [user])

    return (
        <div className="space-y-4">
            {notifications.length === 0 ? (
                <Alert>
                    <BellIcon className="h-4 w-4" />
                    <AlertTitle>Tidak ada notifikasi</AlertTitle>
                    <AlertDescription>
                        Kamu belum memiliki notifikasi baru.
                    </AlertDescription>
                </Alert>
            ) : (
                <EachUtils
                    of={notifications}
                    render={(item, index) => (
                        <Alert key={index} className="flex justify-between items-start gap-4 relative">
                            <div className="flex items-start gap-3">
                                <BellIcon className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                <AlertTitle className="flex items-center justify-between">
                                    {item.title}
                                </AlertTitle>
                                <AlertDescription className="text-sm">{item.description}</AlertDescription>
                                <span className="text-xs text-muted-foreground mt-1 block">
                                    {getRelativeTime(item.createdAt)}
                                </span>
                                </div>
                            </div>

                            <button
                                // onClick={() => handleDelete(item._id)} // ganti sesuai ID notifikasi kamu
                                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive text-sm"
                            >
                                ✕
                            </button>
                        </Alert>
                    )}
                />
                
            )}
        </div>
    )
}

export default Notification
