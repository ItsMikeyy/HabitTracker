import { Checkbox } from "@/components/ui/checkbox"
import { SendHorizonalIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function ToDoList() {

    const [items, setItems] = useState([])
    const [formItem, setFormItem] = useState("")

    function handleSubmit() {
        return
    }
    return(
        <div>
            <h1 className="text-2xl font-semibold text-foreground my-2">To Do List</h1>
            <div className="border rounded-lg flex flex-col justify-center items-center">
                <div className="flex justify-start items-center gap-4 w-full p-4">
                    <Checkbox />
                    <h1 className="text-lg text-foreground">Study 30 min</h1>
                </div>
                <div className="flex justify-start items-center gap-4 w-full p-4">
                    <Checkbox />
                    <h1 className="text-lg text-foreground">Study 30 min</h1>
                </div>
                <div className="w-full px-8 pb-6">
                    <div className="flex justify-start items-center gap-2">
                        <SendHorizonalIcon className="w-4 h-4"/>
                        <form className="w-full" onSubmit={()=> handleSubmit()}>
                            <input placeholder="Add a task" className="w-full border-b-2 border-border bg-transparent px-2 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-0" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}       