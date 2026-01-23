import Image from "next/image";

const Loading = () => {
    return (
        <div className="flex-center h-screen w-full bg-dark-100">
            <div className="loader">
                <Image
                    src="/assets/images/artify-icon.png"
                    alt="logo"
                    width={50}
                    height={50}
                    className="animate-spin duration-1000"
                />
            </div>
        </div>
    );
};

export default Loading;
