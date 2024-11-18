"use client"

import DottedSeparator from "@/components/DottedSeparator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateWorkspace } from "../api/useCreateWorkspace";
import { updateWorkspaceSchema } from "../schemas";
import { Workspace } from "../types";


interface EditWorkspaceFormProps {
    onCancel?: () => void;
    initialValues: Workspace
}
const EditWorkspaceForm = ({
    onCancel,
    initialValues
}: EditWorkspaceFormProps) => {
    const router = useRouter();
    const { mutate: createWorksapce, isPending } = useCreateWorkspace();

    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
        resolver: zodResolver(updateWorkspaceSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? "",
        }
    })

    const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : undefined,
        }
        createWorksapce({ 
            form: finalValues,
            param: { workspaceId: initialValues.$id }
        }, {
            onSuccess: ({ data }) => {
                form.reset();
                router.push(`/workspaces/${data.$id}`)
            }
        })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file)
        }
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    {initialValues.name}
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Workspace Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Enter workspace name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex items-center gap-x-5">
                                            {field.value ? (
                                                <div className="size-[72px] relative rounded-md overflow-hidden">
                                                    <Image
                                                        src={field.value instanceof File ? URL.createObjectURL(field.value) : field.value}
                                                        alt="Logo image"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <Avatar className="size-[72px]">
                                                    <AvatarFallback>
                                                        <ImageIcon className="size-[36px] text-neutral-400" />
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col ">
                                                <p className="text-sm">Workspace Icon</p>
                                                <p className="text-sm text-muted-foreground">JPG, PNG, SVG or JPEG, max 1MB</p>
                                                <input
                                                    className="hidden"
                                                    type="file"
                                                    accept=".jpg, .png, .svg, .jpeg"
                                                    ref={inputRef}
                                                    disabled={isPending}
                                                    onChange={handleImageChange}
                                                />
                                                <Button
                                                    type="button"
                                                    disabled={isPending}
                                                    variant="teritary"
                                                    size="xs"
                                                    className="w-fit mt-2"
                                                    onClick={() => inputRef.current?.click()}
                                                >
                                                    Upload Image
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        <DottedSeparator classname="py-7" />
                        <div className="flex items-center justify-between">
                            <Button
                                type="button"
                                size="lg"
                                variant="secondary"
                                onClick={onCancel}
                                disabled={isPending}
                                className={cn(!onCancel && "invisible")}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isPending}
                            >
                                Update Workspace
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default EditWorkspaceForm