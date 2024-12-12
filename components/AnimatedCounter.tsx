'use client'

import React from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { formatNumber } from '@/lib/utils'

interface AnimatedCounterProps {
    value: number | undefined
    duration?: number
}

export default function AnimatedCounter({ value, duration = 1 }: AnimatedCounterProps) {
    if(!value) return formatNumber(0)
    const spring = useSpring(0, { duration: duration * 1000 })
    const display = useTransform(spring, (current) => formatNumber(Math.floor(current)))

    React.useEffect(() => {
        spring.set(value)
    }, [spring, value])

    return <motion.span>{display}</motion.span>
}

