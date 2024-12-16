import React from 'react'

const StatusTag = ({status}: {status: string | undefined}) => {
    return (
        <div className={`px-4 py-1 rounded-3xl w-fit ${status === "active" ? "bg-light-green-200/30" : "bg-red-100"}`}>
            <span className={` ${status === "active" ? "text-green" : "text-red-700"}`}>{status}</span>
        </div>
    )
}
export default StatusTag
