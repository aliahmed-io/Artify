import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const NotFound = () => {
    return (
        <div className="flex-center h-screen w-full flex-col bg-white text-dark-700 gap-6">
            <div className="relative flex-center">
                <h1 className="text-[140px] md:text-[200px] font-extrabold text-transparent bg-clip-text bg-crimson-gradient opacity-5 select-none absolute">
                    404
                </h1>
                <h2 className="text-3xl md:text-5xl font-bold relative z-10 text-dark-600">Page Not Found</h2>
            </div>

            <p className="text-gray-500 text-center max-w-md px-6 leading-relaxed font-medium mt-4">
                The canvas you are looking for seems to be missing or has been moved to another gallery.
            </p>

            <Button asChild className="submit-button mt-4 !w-fit">
                <Link href="/">
                    Go Back Home
                </Link>
            </Button>
        </div>
    );
};

export default NotFound;
