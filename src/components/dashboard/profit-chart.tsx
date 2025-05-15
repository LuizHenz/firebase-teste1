"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { CardDescription } from "@/components/ui/card"

const data = [
  { date: "Mon", total: Math.floor(Math.random() * 300) + 50 },
  { date: "Tue", total: Math.floor(Math.random() * 400) + 100 },
  { date: "Wed", total: Math.floor(Math.random() * 250) + 70 },
  { date: "Thu", total: Math.floor(Math.random() * 500) + 150 },
  { date: "Fri", total: Math.floor(Math.random() * 450) + 120 },
  { date: "Sat", total: Math.floor(Math.random() * 600) + 200 },
  { date: "Sun", total: Math.floor(Math.random() * 350) + 90 },
]

export function ProfitChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}
            contentStyle={{ 
              background: 'hsl(var(--background))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Bar dataKey="total" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <CardDescription className="text-center mt-2 text-xs">
        Mock sales data for the last 7 days.
      </CardDescription>
    </div>
  )
}
