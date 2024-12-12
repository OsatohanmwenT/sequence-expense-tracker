import { CheckCircle, AlertCircle, Info } from 'lucide-react'
import {toast} from "@/hooks/use-toast";

type ToastType = "success" | "error" | "info"

interface ToastOptions {
    title: string
    description?: string
    type?: ToastType
}

const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
}

export function showToast({ title, description, type = "info" }: ToastOptions) {
    const Icon = icons[type]

    toast({
        title: (
            <div className="flex items-center gap-2">
                <Icon className={`h-5 w-5 ${type === 'success' ? 'text-light-green' : type === 'error' ? 'text-red-500' : 'text-blue-500'}`} />
                {title}
            </div>
        ),
        description,
    })
}

