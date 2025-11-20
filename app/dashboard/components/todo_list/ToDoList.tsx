"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { formatDateLocal } from "@/lib/date"
import { PencilIcon, SendHorizonalIcon, TrashIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function ToDoList() {
    const [items, setItems] = useState([])
    const [formItem, setFormItem] = useState("")
    const today = formatDateLocal( new Date())


    function handleSubmit() {
        fetch("/api/todo", {
            method: "POST",
            body: JSON.stringify({ name: formItem, data: today }),
        })
    }

    function handleDelete(id: number) {
        fetch(`/api/todo?id=${id}`, {
            method: "DELETE",
        })
        setItems(items.filter((item: any) => item.id !== id))
    }

    function handleEdit(id: number) {
        fetch(`/api/todo?id=${id}`, {
            method: "PATCH"
        })
        // setItems(items.map((item: any) => item.id === id ? { ...item, name: formItem } : item))
    }


    useEffect(() => {
        fetch(`/api/todo?date=${today}`)
        .then(res => res.json())
        .then(data => {
            setItems(data)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    return(
        <div>
            <h1 className="text-2xl font-semibold text-foreground my-2">To Do List</h1>
            <div className="border rounded-lg flex flex-col justify-center items-center">
                {items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center w-full p-2 border-b ">
                        <div className="flex justify-start items-center gap-4 w-full p-4">
                            <Checkbox />
                            <h1 className="text-lg text-foreground">{item.name}</h1>
                        </div>
                        <div className="flex items-center gap-2 justify-end w-full p-4">
                            <TrashIcon className="w-4 h-4 text-destructive cursor-pointer" onClick={() => handleDelete(item.id)} />
                            <PencilIcon className="w-4 h-4 text-primary cursor-pointer" onClick={() => handleEdit(item.id)}/>
                        </div>
                    </div>
                ))}
                <div className="w-full px-4 pb-6">
                    <div className="flex justify-start items-center gap-2">
                        <SendHorizonalIcon className="w-4 h-4"/>
                        <form className="w-full" onSubmit={() => handleSubmit()}>
                            <input value={formItem} onChange={(e) => setFormItem(e.target.value)} placeholder="Add a task" className="w-full border-b-2 border-border bg-transparent px-2 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-0" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}       