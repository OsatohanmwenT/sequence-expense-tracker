"use client"

import React, {useState} from 'react'
import {deactivateBudget} from "@/lib/actions/budget.actions";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const DeactivateButton = ({id}: {id: string}) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDeactivate = async () => {
        setLoading(true);
        try{
            await deactivateBudget(id);
            router.push("/budget");
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <Button
            onClick={handleDeactivate}
            disabled={loading}
            className={`flex text-white rounded-sm items-center gap-2 ${
                loading ? "bg-gray-300" : "bg-red-400"
            }`}
        >
            {loading ? "Deactivating..." : "Deactivate"}
        </Button>
    )
}
export default DeactivateButton
