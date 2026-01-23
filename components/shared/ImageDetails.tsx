"use client";

import { useState } from "react";
import { Download, Share2, CornerUpLeft } from "lucide-react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { download, copyToClipboard } from "@/lib/utils";
import { IImage } from "@/lib/database/models/image.model";

export const ImageDetails = ({
    image,
    children,
    className
}: {
    image: IImage;
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={className}>
                    {children}
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl bg-white dark:bg-dark-200 border-none !p-0 overflow-hidden">
                <div className="relative h-[400px] w-full bg-dark-100 flex-center">
                    <CldImage
                        width={image.width}
                        height={image.height}
                        src={image.publicId}
                        alt={image.title}
                        {...image.config}
                        className="object-contain h-full w-full"
                        sizes="100vw"
                    />
                </div>

                <div className="p-6 pt-2 space-y-4">
                    <div className="flex-between">
                        <h3 className="h3-bold text-dark-600">{image.title}</h3>
                        <div className="flex gap-2">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full bg-purple-100 text-purple-500 hover:bg-purple-200"
                                onClick={(e) => {
                                    e.preventDefault();
                                    download(image.secureURL, image.title);
                                }}
                            >
                                <Download className="h-5 w-5" />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full bg-purple-100 text-purple-500 hover:bg-purple-200"
                                onClick={(e) => {
                                    e.preventDefault();
                                    copyToClipboard(`${window.location.origin}/transformations/${image._id}`)
                                }}
                            >
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-dark-600">
                        <div className="p-14-medium md:p-16-medium flex gap-2">
                            <p className="text-dark-600 font-semibold">Width:</p>
                            <p>{image.width}</p>
                        </div>
                        <div className="p-14-medium md:p-16-medium flex gap-2">
                            <p className="text-dark-600 font-semibold">Height:</p>
                            <p>{image.height}</p>
                        </div>
                        <div className="p-14-medium md:p-16-medium flex gap-2">
                            <p className="text-dark-600 font-semibold">Aspect Ratio:</p>
                            <p>{image.aspectRatio}</p>
                        </div>
                    </div>

                    <Button
                        asChild
                        className="w-full rounded-full bg-purple-gradient bg-cover text-white"
                    >
                        <a href={`/transformations/${image._id}`}>
                            Edit / View Details
                        </a>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
