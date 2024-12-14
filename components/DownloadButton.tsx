"use client"

import React from 'react'
import {Download} from "lucide-react";
import {exportExpenses} from "@/lib/actions/analytics.actions";
import {showToast} from "@/lib/utils/toast";

const DownloadButton = () => {
    const downloadExpense = async () => {
        try {
            const blob = await exportExpenses();
            showToast({
                title: "Downloading!",
                description: "Expenses is getting ready......",
            });
            if (blob) {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement("a");
                link.href = url;
                showToast({
                    title: "Success!",
                    description: "Expense successfully exported.",
                    type: "success",
                });

                link.setAttribute("download", "expenses.csv");

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                window.URL.revokeObjectURL(url);
            } else {
                console.error("Failed to export expenses.");
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <button onClick={downloadExpense}
            aria-label="export button"
            className="flex items-center hover:translate-y-[1px] transition-all md:bg-green-200 px-3 py-2 rounded-md md:text-white"
        >
            <Download className="size-5 md:mr-1"/>
            <span className="max-md:hidden">Export</span>
        </button>
    )
}
export default DownloadButton
