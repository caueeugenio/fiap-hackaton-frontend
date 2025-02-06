"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

export function ProgressBar({ targetProgress }: { targetProgress: number }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(targetProgress), 500)
    return () => clearTimeout(timer)
  }, [targetProgress])

  return <Progress value={progress} className="mr-2" />
}
