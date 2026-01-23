"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useTransition } from "react"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CustomField } from "./CustomField"
import { aspectRatioOptions, creditFee } from "@/constants"
import { AspectRatioKey } from "@/lib/utils"
// import { generateImageAction } from "@/lib/actions/generation.actions" // To be implemented
import { useRouter } from "next/navigation"
import Image from "next/image"

export const generationFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    prompt: z.string().min(1, "Prompt is required"),
    aspectRatio: z.string().optional(),
})

const GenerationForm = ({ type, userId, creditBalance }: { type: 'generation' | 'video', userId: string, creditBalance: number }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof generationFormSchema>>({
        resolver: zodResolver(generationFormSchema),
        defaultValues: {
            title: "",
            prompt: "",
            aspectRatio: "1:1",
        },
    })

    async function onSubmit(values: z.infer<typeof generationFormSchema>) {
        setIsSubmitting(true);

        // TODO: Call Server Action to Generate Image/Video using Gemini
        // const response = await generateImageAction({ ...values, type, userId });

        // Mock response for now
        setTimeout(() => {
            setIsSubmitting(false);
            // Placeholder result
            setResult("https://placehold.co/1024x1024/crimson/white?text=Generated+Image");
            // In real impl, we would save to DB and redirect.
            // router.push(`/transformations/${newImageId}`);
        }, 2000);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CustomField
                    control={form.control}
                    name="title"
                    formLabel="Title"
                    className="w-full"
                    render={({ field }) => <Input {...field} className="input-field" placeholder="My Awesome Creation" />}
                />

                <CustomField
                    control={form.control}
                    name="prompt"
                    formLabel="Prompt"
                    className="w-full"
                    render={({ field }) => (
                        <textarea
                            {...field}
                            className="input-field h-32 pt-4"
                            placeholder="Describe what you want to generate..."
                        />
                    )}
                />

                {type === 'generation' && (
                    <CustomField
                        control={form.control}
                        name="aspectRatio"
                        formLabel="Aspect Ratio"
                        className="w-full"
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <SelectTrigger className="select-field">
                                    <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(aspectRatioOptions).map((key) => (
                                        <SelectItem key={key} value={key} className="select-item">
                                            {aspectRatioOptions[key as AspectRatioKey].label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                )}

                <div className="flex flex-col gap-4">
                    <Button
                        type="submit"
                        className="submit-button capitalize"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Generating...' : 'Generate'}
                    </Button>
                </div>

                {result && (
                    <div className="mt-8 border-2 border-dashed border-crimson-200/20 rounded-[16px] p-4 bg-white/50">
                        <h3 className="h3-bold text-dark-600 mb-4">Result</h3>
                        <div className="relative h-96 w-full rounded-[10px] overflow-hidden">
                            <Image
                                src={result}
                                alt="Generated Result"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="mt-2 text-center text-gray-500">
                            (This is a placeholder. Actual generation requires Backend Integration with Google Gemini API)
                        </p>
                    </div>
                )}
            </form>
        </Form>
    )
}

export default GenerationForm
