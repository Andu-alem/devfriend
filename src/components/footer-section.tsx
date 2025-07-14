import Link from "next/link";
import { AppLogo } from "./app-logo";

export function FooterSection() {
    return (
        <footer className="border-t py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <AppLogo />
                            <span className="text-xl font-bold">DevFriend</span>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            The ultimate platform for developers to track job applications and manage personal projects.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link href="#features" className="hover:text-foreground transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-muted-foreground">
                        <li>
                            <Link href="#" className="hover:text-foreground transition-colors">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-foreground transition-colors">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-foreground transition-colors">
                                Privacy
                            </Link>
                        </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
                    <p>&copy; { (new Date()).getFullYear() } DevFriend. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}