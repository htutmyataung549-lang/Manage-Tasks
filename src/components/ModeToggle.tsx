import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export default function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <Button  size="icon" disabled className="opacity-0" />
    }

    return (
        <Button className="transition-all duration-300" variant="outline" size="icon" onClick={() => setTheme(theme == "dark"? "light" : "dark")}>
            {theme === "dark" ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-700" />}
            <span className="sr-only">Toggle theme</span>
        </Button>  
    )
}