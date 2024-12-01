"use client"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

interface PageErrorProps {
    message: string
}
const PageError = ({
    message = "Something went wrong..."
}: PageErrorProps) => {
    return (
        <div className='h-screen flex flex-col gap-y-4 items-center justify-center'>
            <AlertTriangle className='size-6 text-muted-foreground' />
            <p className='text-sm text-muted-foreground'>{message}</p>
            <Button asChild size="sm" variant="secondary">
                <Link href="/">
                    Back to Home
                </Link>
            </Button>
        </div>
    )
}

export default PageError