"use client"
import { DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Dialog, } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { useState } from "react";
import IconPicker from "./IconPicker";
import { HighlighterIcon } from "lucide-react";
import { useSession } from "next-auth/react";

interface Habit {
    id?: number
    name?: string
    description?: string
    icon?: string
    color?: string
    frequency?: string
    currentStreak?: number
    longestStreak?: number
}

export default function HabitForm(props: { habit?: Habit,}) {
    const habit = props.habit
    const [formData, setFormData] = useState({ name: habit?.name ?? "", description: habit?.description ?? "", icon: habit?.icon ?? "", color: habit?.color ?? "", frequency: habit?.frequency ?? "" })
    const [open, setOpen] = useState(false);
    const { data: session } = useSession()
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            if (habit) {
                var res = await fetch("/api/habits", {
                    method:"PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({...formData, userEmail: session?.user?.email, id: habit.id})
                })
            }
            else {
                var res = await fetch("/api/habits", {
                    method:"POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({...formData, userEmail: session?.user?.email})
                })
            }

           
            
            if (res.ok) {
                // Reset form and close dialog
                setFormData({ name: "", description: "", icon: "", color: "#000000", frequency: "daily" })
                setOpen(false)
                // Reload the page to refresh the habit list
                window.location.reload()
            }
        } catch (error) {
            console.error("Error creating habit:", error)
        }
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {habit ? <HighlighterIcon color="#9f9fa9" className="cursor-pointer"/> : <button className="bg-blue-500 text-white p-2 rounded-md">Add Habit</button> }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Habit</DialogTitle>
                        <DialogDescription>
                        Add a new habit to your dashboard.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input 
                                id="name" 
                                name="name" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                id="description" 
                                name="description"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="icon">Icon</Label>
                            <IconPicker
                                value={formData.icon}
                                onChange={(iconName) => setFormData({...formData, icon: iconName})}
                                color={formData.color}
                        
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="color">Color</Label>
                            <Input 
                                id="color" 
                                name="color" 
                                type="color"
                                value={formData.color}
                                onChange={(e) => setFormData({...formData, color: e.target.value})}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="frequency">Frequency</Label>
                            <Select value={formData.frequency} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}