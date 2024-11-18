"use client"
import ResponsiveModal from "@/components/ResponsiveModal"
import { useCreateWorkspaceModal } from "../hooks/useCreateWorkspaceModal"
import CreateWorkspaceForm from "./CreateWorkspaceForm"

const CreateWorkspaceModal = () => {
    const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkspaceForm onCancel={close}/>
        </ResponsiveModal>
    )
}

export default CreateWorkspaceModal