/* FLIGHT DECK v2 — glass reskin
   VOICES: numerals=B612 Mono · labels=Inter tiny caps · body=Inter
   GLASS: frosted panels (backdrop-blur), hairline borders, deep charcoal base
   COLOR: --bg=#0B0E13 · --glass=rgba(255,255,255,0.04) · --stroke=rgba(255,255,255,0.08)
          --accent=#6E8BFF (cool blue, the active state) · --up=#46D39A · --warn=#FFB84D · --down=#FF6B6B
   Anomalies/regressions = --down. Caution = --warn. */

const { useState, useEffect, useRef, useMemo, useCallback } = React;
const { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea, ReferenceLine, Cell } = Recharts;
const RAW = [{
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 0,
  "wt": 15,
  "rp": 8
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 1,
  "wt": 15,
  "rp": 8
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 2,
  "wt": 15,
  "rp": 7
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 10,
  "rp": 8
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 10,
  "rp": 10
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 10,
  "rp": 8
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 1,
  "wt": 47,
  "rp": 10
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 8
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 15,
  "rp": 8
}, {
  "d": "2025-02-19",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 15,
  "rp": 8
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 6
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 0,
  "wt": 40,
  "rp": 8
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 1,
  "wt": 40,
  "rp": 12
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 2,
  "wt": 42.5,
  "rp": 10
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 0,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 1,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 2,
  "wt": 20,
  "rp": 14
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 0,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 1,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 2,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 0,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 1,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 26,
  "rp": 10
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 26,
  "rp": 10
}, {
  "d": "2025-02-21",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 26,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 35,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 2,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 20,
  "rp": 8
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 1,
  "wt": 40,
  "rp": 8
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 2,
  "wt": 40,
  "rp": 7
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Lateral Raise (Cable)",
  "s": 0,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-02-22",
  "w": "Arms",
  "ex": "Lateral Raise (Cable)",
  "s": 1,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 0,
  "wt": 15,
  "rp": 6
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 1,
  "wt": 12.5,
  "rp": 4
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 2,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 3,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 10,
  "rp": 10
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 10,
  "rp": 10
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 10,
  "rp": 10
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 12
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 12
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 9
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-23",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 12
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 0,
  "wt": 40,
  "rp": 12
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 1,
  "wt": 42.5,
  "rp": 10
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 2,
  "wt": 42.5,
  "rp": 10
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 0,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 2,
  "wt": 22.5,
  "rp": 14
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 0,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 1,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 2,
  "wt": 17.5,
  "rp": 12
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 12
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-02-27",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 33,
  "rp": 9
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 8
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 40,
  "rp": 16
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 2,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 2,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Lateral Raise (Cable)",
  "s": 0,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Lateral Raise (Cable)",
  "s": 1,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-03-03",
  "w": "Arms",
  "ex": "Lateral Raise (Cable)",
  "s": 2,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 1,
  "wt": 15,
  "rp": 8
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 2,
  "wt": 15,
  "rp": 8
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 10,
  "rp": 8
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 10,
  "rp": 8
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 10,
  "rp": 8
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 8
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 8
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 12
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 8
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 7
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 1,
  "wt": 42.5,
  "rp": 10
}, {
  "d": "2025-03-27",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 2,
  "wt": 45,
  "rp": 7
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 8
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 2,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 0,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 2,
  "wt": 20,
  "rp": 12
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 1,
  "wt": 17.5,
  "rp": 9
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 2,
  "wt": 17.5,
  "rp": 8
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 12
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 33,
  "rp": 9
}, {
  "d": "2025-03-29",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 45,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 2,
  "wt": 45,
  "rp": 8
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 20,
  "rp": 12
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 0,
  "wt": 40,
  "rp": 9
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 2,
  "wt": 40,
  "rp": 6
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 1,
  "wt": 15,
  "rp": 11
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 2,
  "wt": 15,
  "rp": 9
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Lateral Raise (Cable)",
  "s": 0,
  "wt": 5,
  "rp": 8
}, {
  "d": "2025-04-04",
  "w": "Arms",
  "ex": "Lateral Raise (Cable)",
  "s": 1,
  "wt": 5,
  "rp": 8
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 2,
  "wt": 15,
  "rp": 7
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 10,
  "rp": 10
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 10,
  "rp": 8
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 10,
  "rp": 8
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 14
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 8
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 9
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 0,
  "wt": 47,
  "rp": 8
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 1,
  "wt": 47,
  "rp": 8
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 2,
  "wt": 47,
  "rp": 8
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 15,
  "rp": 8
}, {
  "d": "2025-04-05",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 15,
  "rp": 8
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 1,
  "wt": 45,
  "rp": 9
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 2,
  "wt": 45,
  "rp": 8
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 0,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 2,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 0,
  "wt": 15,
  "rp": 9
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 1,
  "wt": 15,
  "rp": 9
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-08",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 7
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 45,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 45,
  "rp": 13
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 2,
  "wt": 45,
  "rp": 8
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 2,
  "wt": 40,
  "rp": 7
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 33,
  "rp": 8
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Lateral Raise (Cable)",
  "s": 0,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-04-09",
  "w": "Arms",
  "ex": "Lateral Raise (Cable)",
  "s": 1,
  "wt": 5,
  "rp": 8
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 2,
  "wt": 15,
  "rp": 6
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 10,
  "rp": 10
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 10,
  "rp": 10
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 12.5,
  "rp": 7
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 12
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 14
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 13
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 2,
  "wt": 47,
  "rp": 7
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 20,
  "rp": 8
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 20,
  "rp": 7
}, {
  "d": "2025-04-13",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 20,
  "rp": 8
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Lat Pullover (Machine)",
  "s": 2,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 1,
  "wt": 22.5,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 2,
  "wt": 22.5,
  "rp": 12
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Row (Machine)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 12
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-14",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 40,
  "rp": 7
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 9
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 45,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 45,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 45,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 45,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 45,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 2,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 2,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 40,
  "rp": 8
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Lateral Raise (Cable)",
  "s": 0,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-04-18",
  "w": "Arms",
  "ex": "Lateral Raise (Cable)",
  "s": 1,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Bench Press (Barbell)",
  "s": 2,
  "wt": 17.5,
  "rp": 8
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 12.5,
  "rp": 8
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Decline Chest Fly (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 12
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Incline Chest Fly (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 13
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 0,
  "wt": 56.5,
  "rp": 9
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 1,
  "wt": 56.5,
  "rp": 9
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Chest Fly (Machine)",
  "s": 2,
  "wt": 47,
  "rp": 7
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-20",
  "w": "Chest",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-04-24",
  "w": "Legs",
  "ex": "Leg Press (Machine)",
  "s": 0,
  "wt": 25,
  "rp": 12
}, {
  "d": "2025-04-24",
  "w": "Legs",
  "ex": "Leg Press (Machine)",
  "s": 1,
  "wt": 50,
  "rp": 12
}, {
  "d": "2025-04-24",
  "w": "Legs",
  "ex": "Leg Press (Machine)",
  "s": 2,
  "wt": 50,
  "rp": 12
}, {
  "d": "2025-04-24",
  "w": "Legs",
  "ex": "Leg Extension (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 15
}, {
  "d": "2025-04-24",
  "w": "Legs",
  "ex": "Leg Extension (Machine)",
  "s": 1,
  "wt": 33,
  "rp": 15
}, {
  "d": "2025-04-24",
  "w": "Legs",
  "ex": "Leg Extension (Machine)",
  "s": 2,
  "wt": 47,
  "rp": 10
}, {
  "d": "2025-04-24",
  "w": "Legs",
  "ex": "Leg Curl (Seated Machine)",
  "s": 0,
  "wt": 33,
  "rp": 15
}, {
  "d": "2025-04-24",
  "w": "Legs",
  "ex": "Leg Curl (Seated Machine)",
  "s": 1,
  "wt": 40,
  "rp": 15
}, {
  "d": "2025-04-24",
  "w": "Legs",
  "ex": "Leg Curl (Seated Machine)",
  "s": 2,
  "wt": 40,
  "rp": 15
}, {
  "d": "2025-04-24",
  "w": "Legs",
  "ex": "Romanian Deadlift (Dumbbell)",
  "s": 0,
  "wt": 12,
  "rp": 12
}, {
  "d": "2025-04-24",
  "w": "Legs",
  "ex": "Romanian Deadlift (Dumbbell)",
  "s": 1,
  "wt": 12,
  "rp": 12
}, {
  "d": "2025-04-24",
  "w": "Legs",
  "ex": "Romanian Deadlift (Dumbbell)",
  "s": 2,
  "wt": 12,
  "rp": 16
}, {
  "d": "2025-05-25",
  "w": "Full boddy",
  "ex": "Bench Press (Barbell)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-05-25",
  "w": "Full boddy",
  "ex": "Bench Press (Barbell)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-05-25",
  "w": "Full boddy",
  "ex": "Bench Press (Barbell)",
  "s": 2,
  "wt": 15,
  "rp": 6
}, {
  "d": "2025-05-25",
  "w": "Full boddy",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-05-25",
  "w": "Full boddy",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-05-25",
  "w": "Full boddy",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 7
}, {
  "d": "2025-05-25",
  "w": "Full boddy",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 10,
  "rp": 10
}, {
  "d": "2025-05-25",
  "w": "Full boddy",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 10,
  "rp": 10
}, {
  "d": "2025-05-25",
  "w": "Full boddy",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 10,
  "rp": 8
}, {
  "d": "2025-05-25",
  "w": "Full boddy",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 35,
  "rp": 10
}, {
  "d": "2025-05-25",
  "w": "Full boddy",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 35,
  "rp": 10
}, {
  "d": "2025-05-25",
  "w": "Full boddy",
  "ex": "Biceps Curl (Cable)",
  "s": 2,
  "wt": 35,
  "rp": 6
}, {
  "d": "2025-05-25",
  "w": "Full boddy",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-05-25",
  "w": "Full boddy",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 10,
  "rp": 12
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 0,
  "wt": 54.5,
  "rp": 10
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 1,
  "wt": 54.5,
  "rp": 10
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 2,
  "wt": 47,
  "rp": 14
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 40,
  "rp": 7
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 15,
  "rp": 9
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 15,
  "rp": 6
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Lateral Raise (Cable)",
  "s": 0,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-05-29",
  "w": "Push",
  "ex": "Lateral Raise (Cable)",
  "s": 1,
  "wt": 5,
  "rp": 8
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 6
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Lat Pullover (Machine)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Lat Pullover (Machine)",
  "s": 1,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Lat Pullover (Machine)",
  "s": 2,
  "wt": 33,
  "rp": 11
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Row (T-Bar)",
  "s": 0,
  "wt": 20,
  "rp": 11
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Row (T-Bar)",
  "s": 1,
  "wt": 22.5,
  "rp": 10
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Row (T-Bar)",
  "s": 2,
  "wt": 22.5,
  "rp": 11
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Trap Raise (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Trap Raise (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 14
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Single-Arm Curl (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Single-Arm Curl (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 7
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Single-Arm Curl (Cable)",
  "s": 2,
  "wt": 10,
  "rp": 8
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-05-31",
  "w": "Pull",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 12.5,
  "rp": 7
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 12
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 0,
  "wt": 52,
  "rp": 10
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 1,
  "wt": 52,
  "rp": 10
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 2,
  "wt": 52,
  "rp": 11
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 6
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 35,
  "rp": 10
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 35,
  "rp": 8
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 17.5,
  "rp": 6
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Lateral Raise (Cable)",
  "s": 0,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-06-21",
  "w": "Push",
  "ex": "Lateral Raise (Cable)",
  "s": 1,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 9
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 0,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 1,
  "wt": 22.5,
  "rp": 10
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 2,
  "wt": 25,
  "rp": 8
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 16
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 33,
  "rp": 8
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 9
}, {
  "d": "2025-06-23",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 6
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Biceps Curl (Dumbbell)",
  "s": 0,
  "wt": 7.5,
  "rp": 12
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Biceps Curl (Dumbbell)",
  "s": 1,
  "wt": 10,
  "rp": 12
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Biceps Curl (Dumbbell)",
  "s": 2,
  "wt": 10,
  "rp": 10
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Triceps Pushdown (Cable - Rope)",
  "s": 0,
  "wt": 15,
  "rp": 20
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Triceps Pushdown (Cable - Rope)",
  "s": 1,
  "wt": 30,
  "rp": 8
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Triceps Pushdown (Cable - Rope)",
  "s": 2,
  "wt": 25,
  "rp": 3
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Biceps Curl (Cable)",
  "s": 2,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 25,
  "rp": 12
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 25,
  "rp": 12
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 25,
  "rp": 13
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 0,
  "wt": 15,
  "rp": 12
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 1,
  "wt": 15,
  "rp": 12
}, {
  "d": "2025-06-25",
  "w": "Arms p2",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 2,
  "wt": 15,
  "rp": 12
}, {
  "d": "2025-06-26",
  "w": "Legs",
  "ex": "Leg Press (Machine)",
  "s": 0,
  "wt": 50,
  "rp": 12
}, {
  "d": "2025-06-26",
  "w": "Legs",
  "ex": "Leg Press (Machine)",
  "s": 1,
  "wt": 70,
  "rp": 12
}, {
  "d": "2025-06-26",
  "w": "Legs",
  "ex": "Leg Press (Machine)",
  "s": 2,
  "wt": 70,
  "rp": 12
}, {
  "d": "2025-06-26",
  "w": "Legs",
  "ex": "Leg Extension (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 15
}, {
  "d": "2025-06-26",
  "w": "Legs",
  "ex": "Leg Extension (Machine)",
  "s": 1,
  "wt": 33,
  "rp": 15
}, {
  "d": "2025-06-26",
  "w": "Legs",
  "ex": "Leg Extension (Machine)",
  "s": 2,
  "wt": 47,
  "rp": 10
}, {
  "d": "2025-06-26",
  "w": "Legs",
  "ex": "Leg Curl (Seated Machine)",
  "s": 0,
  "wt": 33,
  "rp": 15
}, {
  "d": "2025-06-26",
  "w": "Legs",
  "ex": "Leg Curl (Seated Machine)",
  "s": 1,
  "wt": 40,
  "rp": 15
}, {
  "d": "2025-06-26",
  "w": "Legs",
  "ex": "Leg Curl (Seated Machine)",
  "s": 2,
  "wt": 40,
  "rp": 15
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 12.5,
  "rp": 12
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 12.5,
  "rp": 12
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 12.5,
  "rp": 9
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Chest Fly (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 12
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Chest Fly (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Chest Fly (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 8
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Row (T-Bar)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Row (T-Bar)",
  "s": 1,
  "wt": 25,
  "rp": 12
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Row (T-Bar)",
  "s": 2,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Biceps Curl (Cable)",
  "s": 2,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Lateral Raise (Cable)",
  "s": 0,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-06-29",
  "w": "Upper",
  "ex": "Lateral Raise (Cable)",
  "s": 1,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-07-01",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 15,
  "rp": 9
}, {
  "d": "2025-07-01",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 15,
  "rp": 8
}, {
  "d": "2025-07-01",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 12.5,
  "rp": 9
}, {
  "d": "2025-07-01",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-07-01",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 1,
  "wt": 25,
  "rp": 12
}, {
  "d": "2025-07-01",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 2,
  "wt": 25,
  "rp": 12
}, {
  "d": "2025-07-01",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-07-01",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-07-01",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-07-01",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-07-01",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 30,
  "rp": 8
}, {
  "d": "2025-07-01",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 30,
  "rp": 9
}, {
  "d": "2025-07-01",
  "w": "Push",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-07-01",
  "w": "Push",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 17.5,
  "rp": 6
}, {
  "d": "2025-07-03",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-07-03",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 62,
  "rp": 9
}, {
  "d": "2025-07-03",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 62,
  "rp": 7
}, {
  "d": "2025-07-03",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 3,
  "wt": 48,
  "rp": 7
}, {
  "d": "2025-07-03",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 0,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-03",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 1,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-03",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 2,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-03",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-07-03",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 1,
  "wt": 15,
  "rp": 12
}, {
  "d": "2025-07-03",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 2,
  "wt": 15,
  "rp": 15
}, {
  "d": "2025-07-05",
  "w": "Legs",
  "ex": "Leg Press (Machine)",
  "s": 0,
  "wt": 80,
  "rp": 12
}, {
  "d": "2025-07-05",
  "w": "Legs",
  "ex": "Leg Press (Machine)",
  "s": 1,
  "wt": 80,
  "rp": 12
}, {
  "d": "2025-07-05",
  "w": "Legs",
  "ex": "Leg Press (Machine)",
  "s": 2,
  "wt": 80,
  "rp": 12
}, {
  "d": "2025-07-05",
  "w": "Legs",
  "ex": "Leg Extension (Machine)",
  "s": 0,
  "wt": 38,
  "rp": 15
}, {
  "d": "2025-07-05",
  "w": "Legs",
  "ex": "Leg Extension (Machine)",
  "s": 1,
  "wt": 38,
  "rp": 15
}, {
  "d": "2025-07-05",
  "w": "Legs",
  "ex": "Leg Extension (Machine)",
  "s": 2,
  "wt": 47,
  "rp": 10
}, {
  "d": "2025-07-05",
  "w": "Legs",
  "ex": "Leg Curl (Seated Machine)",
  "s": 0,
  "wt": 33,
  "rp": 15
}, {
  "d": "2025-07-05",
  "w": "Legs",
  "ex": "Leg Curl (Seated Machine)",
  "s": 1,
  "wt": 33,
  "rp": 15
}, {
  "d": "2025-07-05",
  "w": "Legs",
  "ex": "Leg Curl (Seated Machine)",
  "s": 2,
  "wt": 47,
  "rp": 8
}, {
  "d": "2025-07-05",
  "w": "Legs",
  "ex": "Romanian Deadlift (Dumbbell)",
  "s": 0,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-05",
  "w": "Legs",
  "ex": "Romanian Deadlift (Dumbbell)",
  "s": 1,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-05",
  "w": "Legs",
  "ex": "Romanian Deadlift (Dumbbell)",
  "s": 2,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 15,
  "rp": 5
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 12.5,
  "rp": 5
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 12.5,
  "rp": 9
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 9
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 7
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Chest Fly (Machine)",
  "s": 0,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Chest Fly (Machine)",
  "s": 1,
  "wt": 61,
  "rp": 10
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Chest Fly (Machine)",
  "s": 2,
  "wt": 61,
  "rp": 5
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Row (T-Bar)",
  "s": 0,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Row (T-Bar)",
  "s": 1,
  "wt": 27.5,
  "rp": 10
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Row (T-Bar)",
  "s": 2,
  "wt": 27.5,
  "rp": 6
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 30,
  "rp": 12
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 35,
  "rp": 10
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Biceps Curl (Cable)",
  "s": 2,
  "wt": 35,
  "rp": 12
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 35,
  "rp": 12
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 12
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 30,
  "rp": 6
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Lateral Raise (Cable)",
  "s": 0,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-07-07",
  "w": "Upper",
  "ex": "Lateral Raise (Cable)",
  "s": 1,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Biceps Curl (Dumbbell)",
  "s": 0,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Biceps Curl (Dumbbell)",
  "s": 1,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Biceps Curl (Dumbbell)",
  "s": 2,
  "wt": 12.5,
  "rp": 7
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Triceps Pushdown (Cable - Rope)",
  "s": 0,
  "wt": 15,
  "rp": 20
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Triceps Pushdown (Cable - Rope)",
  "s": 1,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Triceps Pushdown (Cable - Rope)",
  "s": 2,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 35,
  "rp": 10
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 35,
  "rp": 10
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Biceps Curl (Cable)",
  "s": 2,
  "wt": 35,
  "rp": 12
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 35,
  "rp": 10
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 7
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 35,
  "rp": 7
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 0,
  "wt": 15,
  "rp": 12
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 1,
  "wt": 15,
  "rp": 12
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 20,
  "rp": 8
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 20,
  "rp": 7
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Lateral Raise (Cable)",
  "s": 0,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-07-11",
  "w": "Arms p2",
  "ex": "Lateral Raise (Cable)",
  "s": 1,
  "wt": 5,
  "rp": 9
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 58.5,
  "rp": 6
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 54,
  "rp": 4
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 54,
  "rp": 10
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 0,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 1,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 2,
  "wt": 30,
  "rp": 8
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 0,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 1,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 2,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 7
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 5
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Preacher Curl (EZ-Bar)",
  "s": 0,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Preacher Curl (EZ-Bar)",
  "s": 1,
  "wt": 5,
  "rp": 9
}, {
  "d": "2025-07-12",
  "w": "Back",
  "ex": "Preacher Curl (EZ-Bar)",
  "s": 2,
  "wt": 5,
  "rp": 8
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 1,
  "wt": 25,
  "rp": 12
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 2,
  "wt": 25,
  "rp": 15
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 0,
  "wt": 61,
  "rp": 8
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 1,
  "wt": 61,
  "rp": 10
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 2,
  "wt": 61,
  "rp": 6
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 35,
  "rp": 10
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 5
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 35,
  "rp": 10
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 20,
  "rp": 8
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Lateral Raise (Cable)",
  "s": 0,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-07-13",
  "w": "Push",
  "ex": "Lateral Raise (Cable)",
  "s": 1,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-07-15",
  "w": "Legs",
  "ex": "Leg Press (Machine)",
  "s": 0,
  "wt": 90,
  "rp": 12
}, {
  "d": "2025-07-15",
  "w": "Legs",
  "ex": "Leg Press (Machine)",
  "s": 1,
  "wt": 100,
  "rp": 12
}, {
  "d": "2025-07-15",
  "w": "Legs",
  "ex": "Leg Press (Machine)",
  "s": 2,
  "wt": 120,
  "rp": 12
}, {
  "d": "2025-07-15",
  "w": "Legs",
  "ex": "Leg Extension (Machine)",
  "s": 0,
  "wt": 47,
  "rp": 15
}, {
  "d": "2025-07-15",
  "w": "Legs",
  "ex": "Leg Extension (Machine)",
  "s": 1,
  "wt": 47,
  "rp": 15
}, {
  "d": "2025-07-15",
  "w": "Legs",
  "ex": "Leg Extension (Machine)",
  "s": 2,
  "wt": 47,
  "rp": 10
}, {
  "d": "2025-07-15",
  "w": "Legs",
  "ex": "Leg Curl (Seated Machine)",
  "s": 0,
  "wt": 40,
  "rp": 15
}, {
  "d": "2025-07-15",
  "w": "Legs",
  "ex": "Leg Curl (Seated Machine)",
  "s": 1,
  "wt": 40,
  "rp": 15
}, {
  "d": "2025-07-15",
  "w": "Legs",
  "ex": "Leg Curl (Seated Machine)",
  "s": 2,
  "wt": 47,
  "rp": 8
}, {
  "d": "2025-07-15",
  "w": "Legs",
  "ex": "Romanian Deadlift (Dumbbell)",
  "s": 0,
  "wt": 17.5,
  "rp": 10
}, {
  "d": "2025-07-15",
  "w": "Legs",
  "ex": "Romanian Deadlift (Dumbbell)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 7
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 8
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 35,
  "rp": 6
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 2,
  "wt": 40,
  "rp": 12
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 0,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 1,
  "wt": 30,
  "rp": 9
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 2,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-07-19",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 12.5,
  "rp": 12
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 1,
  "wt": 25,
  "rp": 12
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 17
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 0,
  "wt": 61,
  "rp": 10
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 1,
  "wt": 61,
  "rp": 8
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 2,
  "wt": 61,
  "rp": 6
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 7
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 35,
  "rp": 6
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 20,
  "rp": 8
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 20,
  "rp": 7
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 20,
  "rp": 6
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Lateral Raise (Cable)",
  "s": 0,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Lateral Raise (Cable)",
  "s": 1,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-07-20",
  "w": "Push",
  "ex": "Lateral Raise (Cable)",
  "s": 2,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 61,
  "rp": 10
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 61,
  "rp": 9
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 61,
  "rp": 8
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 0,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 1,
  "wt": 30,
  "rp": 9
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 2,
  "wt": 30,
  "rp": 8
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 0,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 1,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 2,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 33,
  "rp": 10
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 38,
  "rp": 10
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 8
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 7
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Preacher Curl (EZ-Bar)",
  "s": 0,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Preacher Curl (EZ-Bar)",
  "s": 1,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-07-22",
  "w": "Back",
  "ex": "Preacher Curl (EZ-Bar)",
  "s": 2,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 61,
  "rp": 10
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 61,
  "rp": 9
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 61,
  "rp": 10
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 0,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 1,
  "wt": 30,
  "rp": 9
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 2,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 0,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 1,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 2,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 8
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 8
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 6
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Preacher Curl (EZ-Bar)",
  "s": 0,
  "wt": 7.5,
  "rp": 10
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Preacher Curl (EZ-Bar)",
  "s": 1,
  "wt": 7.5,
  "rp": 8
}, {
  "d": "2025-07-27",
  "w": "Back",
  "ex": "Preacher Curl (EZ-Bar)",
  "s": 2,
  "wt": 5,
  "rp": 10
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Biceps Curl (Dumbbell)",
  "s": 0,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Biceps Curl (Dumbbell)",
  "s": 1,
  "wt": 12.5,
  "rp": 10
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Biceps Curl (Dumbbell)",
  "s": 2,
  "wt": 12.5,
  "rp": 8
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Triceps Pushdown (Cable - Rope)",
  "s": 0,
  "wt": 15,
  "rp": 15
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Triceps Pushdown (Cable - Rope)",
  "s": 1,
  "wt": 35,
  "rp": 10
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Triceps Pushdown (Cable - Rope)",
  "s": 2,
  "wt": 35,
  "rp": 12
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Biceps Curl (Cable)",
  "s": 2,
  "wt": 40,
  "rp": 13
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 9
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 7
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 35,
  "rp": 6
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 1,
  "wt": 20,
  "rp": 12
}, {
  "d": "2025-07-30",
  "w": "Arms p2",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-08-02",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-08-02",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-08-02",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-08-02",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 0,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-08-02",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 1,
  "wt": 25,
  "rp": 12
}, {
  "d": "2025-08-02",
  "w": "Push",
  "ex": "Decline Chest Fly (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 15
}, {
  "d": "2025-08-02",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 0,
  "wt": 61,
  "rp": 8
}, {
  "d": "2025-08-02",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 1,
  "wt": 61,
  "rp": 8
}, {
  "d": "2025-08-02",
  "w": "Push",
  "ex": "Chest Fly (Machine)",
  "s": 2,
  "wt": 61,
  "rp": 5
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 8
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 8
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 6
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 40,
  "rp": 8
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 45,
  "rp": 10
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 2,
  "wt": 45,
  "rp": 13
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 22.5,
  "rp": 10
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 22.5,
  "rp": 10
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 0,
  "wt": 30,
  "rp": 10
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 2,
  "wt": 40,
  "rp": 13
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-08-04",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-08-10",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 0,
  "wt": 15,
  "rp": 10
}, {
  "d": "2025-08-10",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 1,
  "wt": 15,
  "rp": 9
}, {
  "d": "2025-08-10",
  "w": "Push",
  "ex": "Incline Bench Press (Barbell)",
  "s": 2,
  "wt": 15,
  "rp": 9
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Single-Arm Curl (Cable)",
  "s": 2,
  "wt": 20,
  "rp": 9
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Overhead Triceps Extension (Cable)",
  "s": 2,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 0,
  "wt": 45,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 1,
  "wt": 45,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Biceps Curl (Cable)",
  "s": 2,
  "wt": 45,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 0,
  "wt": 22.5,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 1,
  "wt": 22.5,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Seated Overhead Press (Machine)",
  "s": 2,
  "wt": 22.5,
  "rp": 12
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Triceps Pushdown (Cable - V-Bar)",
  "s": 2,
  "wt": 40,
  "rp": 14
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-08-13",
  "w": "Arms",
  "ex": "Hammer Curl (Cable - Rope)",
  "s": 2,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 0,
  "wt": 66,
  "rp": 10
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 1,
  "wt": 66,
  "rp": 10
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Front Lat Pulldown (Machine)",
  "s": 2,
  "wt": 66,
  "rp": 10
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 0,
  "wt": 35,
  "rp": 10
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 1,
  "wt": 35,
  "rp": 6
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Row (T-Bar)",
  "s": 2,
  "wt": 30,
  "rp": 4
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 0,
  "wt": 25,
  "rp": 10
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 1,
  "wt": 27.5,
  "rp": 10
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Trap Raise (Cable)",
  "s": 2,
  "wt": 27.5,
  "rp": 13
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 0,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 1,
  "wt": 40,
  "rp": 10
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Rear Delt Fly (Machine)",
  "s": 2,
  "wt": 40,
  "rp": 8
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 0,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 1,
  "wt": 20,
  "rp": 10
}, {
  "d": "2025-08-21",
  "w": "Back",
  "ex": "Single-Arm Curl (Cable)",
  "s": 2,
  "wt": 25,
  "rp": 6
}];
const INBODY = [{
  d: '2022-12-07',
  wt: 50.3,
  smm: 25.1,
  bfm: 4.5,
  pbf: 9.4,
  bmi: 16.1,
  score: null,
  bmr: null
}, {
  d: '2023-01-04',
  wt: 52.2,
  smm: 26.5,
  bfm: 4.3,
  pbf: 8.2,
  bmi: 16.7,
  score: null,
  bmr: null
}, {
  d: '2023-02-16',
  wt: 52.7,
  smm: 25.9,
  bfm: 5.8,
  pbf: 11.1,
  bmi: 16.8,
  score: null,
  bmr: null
}, {
  d: '2024-07-20',
  wt: 57.3,
  smm: 29.6,
  bfm: 4.5,
  pbf: 7.8,
  bmi: 18.3,
  score: 67,
  bmr: 1511
}, {
  d: '2025-04-08',
  wt: 58.0,
  smm: 28.3,
  bfm: 7.5,
  pbf: 12.9,
  bmi: 20.1,
  score: 74,
  bmr: 1460
}, {
  d: '2025-07-11',
  wt: 59.5,
  smm: 30.7,
  bfm: 5.2,
  pbf: 8.7,
  bmi: 19.0,
  score: 70,
  bmr: 1543
}, {
  d: '2025-08-21',
  wt: 59.4,
  smm: 30.7,
  bfm: 5.0,
  pbf: 8.4,
  bmi: 19.0,
  score: 70,
  bmr: 1545
}, {
  d: '2025-09-14',
  wt: 60.0,
  smm: 31.2,
  bfm: 4.9,
  pbf: 8.1,
  bmi: 19.2,
  score: 71,
  bmr: 1560
}, {
  d: '2026-04-10',
  wt: 59.4,
  smm: 30.3,
  bfm: 5.6,
  pbf: 9.5,
  bmi: 19.0,
  score: 70,
  bmr: 1531
}, {
  d: '2026-04-29',
  wt: 59.9,
  smm: 31.0,
  bfm: 5.0,
  pbf: 8.4,
  bmi: 19.1,
  score: 70,
  bmr: 1555
}];

// SMM-target driven ideal (the app is muscle-focused). Honest math: fat mass held
// constant, SMM rises 0.4kg/mo, weight = baseline + accumulated muscle.
const SMM_GOAL = 34.0; // ~natural ceiling target for 177cm frame, derived not magic
const IDEAL = (() => {
  const last = INBODY[INBODY.length - 1];
  const pts = [{
    d: last.d,
    smm: last.smm,
    wt: last.wt
  }];
  const start = new Date(last.d);
  for (let i = 1; i <= 12; i++) {
    const nd = new Date(start);
    nd.setMonth(nd.getMonth() + i);
    const smm = Math.min(SMM_GOAL, +(last.smm + i * 0.4).toFixed(1));
    // weight tracks muscle gain linearly, fat mass held constant
    const wt = +(last.wt + (smm - last.smm)).toFixed(1);
    pts.push({
      d: nd.toISOString().slice(0, 10),
      smm,
      wt
    });
  }
  return pts;
})();

// Display-name normalizer for messy split labels
const SPLIT_NAME = {
  'Full boddy': 'Full Body'
};
const cleanSplit = s => SPLIT_NAME[s] || s;

// Epley 1RM, capped: above 12 reps the formula inflates wildly, so clamp rep input
const e1rm = (wt, reps) => wt > 0 ? Math.round(wt * (1 + Math.min(reps, 12) / 30) * 10) / 10 : 0;
const fmt = d => {
  const [, m, day] = d.split('-');
  return `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+m - 1]} ${+day}`;
};
const fmtY = d => {
  const [y, m] = d.split('-');
  return `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+m - 1]} '${y.slice(2)}`;
};
const todayISO = () => new Date().toISOString().slice(0, 10);
const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
const addDays = (iso, n) => {
  const d = new Date(iso);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};
const INBODY_INTERVAL_DEFAULT = 28; // weeks*7; configurable in-app

/*  STORAGE CONTRACT — these keys are immutable across versions:
    zsk4-workouts          JSON array of workout objects
    zsk4-inbody-interval   JSON number (days)
    zsk4-data-version      JSON number (schema version)
    Never rename these keys. Future format changes go through migrate(). */
const DATA_VERSION = 1;

// Storage — detect backend once at init, commit to it. No racing.
const STORE = (() => {
  let backend = 'none';
  try {
    localStorage.setItem('__test', '1');
    localStorage.removeItem('__test');
    backend = 'local';
  } catch (e) {}
  if (backend === 'none') {
    try {
      if (typeof window !== 'undefined' && window.storage) backend = 'cloud';
    } catch (e) {}
  }
  return {
    async get(k) {
      if (backend === 'local') return localStorage.getItem(k);
      if (backend === 'cloud') {
        try {
          const r = await window.storage.get(k);
          return r?.value ?? null;
        } catch (e) {
          return null;
        }
      }
      return null;
    },
    async set(k, v) {
      if (backend === 'local') {
        localStorage.setItem(k, v);
        return;
      }
      if (backend === 'cloud') {
        try {
          await window.storage.set(k, v);
        } catch (e) {}
      }
    },
    backend
  };
})();

// Migration chain: upgrades stored data from any older version to current.
// Each migration transforms the full state object { workouts, inbodyInterval }.
// Add new entries as DATA_VERSION increments in future versions.
const MIGRATIONS = {
  // 0→1: initial schema, no transform needed (workouts are already [{name,date,duration,exercises:[{name,sets:[{wt,rp}]}]}])
  1: state => state
  // Future: 2: (state) => { /* transform state for v2 schema */ return state; }
};
function migrateState(state, fromVersion) {
  let v = fromVersion || 0;
  while (v < DATA_VERSION) {
    v++;
    if (MIGRATIONS[v]) state = MIGRATIONS[v](state);
  }
  return state;
}
function useProcessed(allData) {
  return useMemo(() => {
    const dates = [...new Set(allData.map(r => r.d))].sort();
    const exercises = [...new Set(allData.map(r => r.ex))].sort();
    const exByDate = {};
    const splits = {};
    const prs = {};
    for (const r of allData) {
      const sp = cleanSplit(r.w);
      if (!splits[sp]) splits[sp] = new Set();
      splits[sp].add(r.d);
      const k = `${r.d}|${r.ex}`;
      if (!exByDate[k]) exByDate[k] = {
        maxWt: 0,
        totalVol: 0,
        sets: 0,
        repsAtMax: 0,
        bestE1rm: 0,
        bestSet: null
      };
      const e = exByDate[k];
      if (r.wt > e.maxWt) {
        e.maxWt = r.wt;
        e.repsAtMax = r.rp;
      }
      e.totalVol += r.wt * r.rp;
      e.sets++;
      const er = e1rm(r.wt, r.rp);
      if (er > e.bestE1rm) {
        e.bestE1rm = er;
        e.bestSet = {
          wt: r.wt,
          rp: r.rp
        };
      }
      // PR by e1rm, not raw weight — honest progression signal
      const prE = e1rm(r.wt, r.rp);
      if (!prs[r.ex] || prE > prs[r.ex].e1rm) prs[r.ex] = {
        wt: r.wt,
        rp: r.rp,
        d: r.d,
        e1rm: prE
      };
    }

    // Per-exercise series (data points only, sequential)
    const strengthData = {};
    for (const ex of exercises) {
      const exDates = dates.filter(d => exByDate[`${d}|${ex}`]);
      if (exDates.length < 1) continue;
      const pts = [];
      for (let i = 0; i < exDates.length; i++) {
        const d = exDates[i];
        const e = exByDate[`${d}|${ex}`];
        const gapDays = i > 0 ? Math.round((new Date(d) - new Date(exDates[i - 1])) / 86400000) : 0;
        // Regression by e1rm (volume-aware), not top-set weight
        const prevE = i > 0 ? exByDate[`${exDates[i - 1]}|${ex}`].bestE1rm : null;
        const isRegression = prevE !== null && e.bestE1rm < prevE - 0.5;
        pts.push({
          d,
          wt: e.maxWt,
          vol: e.totalVol,
          e1rm: e.bestE1rm,
          reps: e.repsAtMax,
          sets: e.sets,
          gapDays,
          isRegression
        });
      }
      const avgWt = Math.round(pts.reduce((s, p) => s + p.wt, 0) / pts.length * 10) / 10;
      const bestWt = Math.max(...pts.map(p => p.wt));
      const bestE1 = Math.max(...pts.map(p => p.e1rm));
      const lastDate = exDates[exDates.length - 1];
      strengthData[ex] = {
        pts,
        avgWt,
        bestWt,
        bestE1,
        lastDate
      };
    }

    // General strength index (% of e1rm PR, EMA-smoothed, ≥2 prior sessions)
    const exHist = {};
    for (const ex of exercises) {
      exHist[ex] = dates.filter(d => exByDate[`${d}|${ex}`]).map(d => ({
        d,
        e1: exByDate[`${d}|${ex}`].bestE1rm
      }));
    }
    const rawGS = [];
    for (const d of dates) {
      const scores = [];
      let beat = 0,
        total = 0;
      for (const ex of exercises) {
        const e = exByDate[`${d}|${ex}`];
        if (!e || e.bestE1rm === 0 || !prs[ex]) continue;
        const prior = exHist[ex].filter(h => h.d < d);
        if (prior.length < 2) continue;
        scores.push(e.bestE1rm / prs[ex].e1rm * 100);
        const pAvg = prior.reduce((s, h) => s + h.e1, 0) / prior.length;
        if (e.bestE1rm > pAvg) beat++;
        total++;
      }
      if (scores.length > 0) rawGS.push({
        d,
        raw: Math.round(scores.reduce((s, v) => s + v, 0) / scores.length * 10) / 10,
        beat,
        total
      });
    }
    let ema = null;
    const A = 0.4;
    const generalStrength = rawGS.map(p => {
      ema = ema === null ? p.raw : A * p.raw + (1 - A) * ema;
      return {
        ...p,
        idx: Math.round(ema * 10) / 10
      };
    });

    // Templates — SECOND pass, actual most-recent session's working set per exercise
    const tplMap = {};
    for (const r of allData) {
      const sp = cleanSplit(r.w);
      if (!tplMap[sp]) tplMap[sp] = {
        name: sp,
        dates: new Set(),
        exOrder: {},
        raw: []
      };
      tplMap[sp].dates.add(r.d);
      tplMap[sp].raw.push(r);
      if (tplMap[sp].exOrder[r.ex] === undefined) tplMap[sp].exOrder[r.ex] = r.s;else tplMap[sp].exOrder[r.ex] = Math.min(tplMap[sp].exOrder[r.ex], r.s);
    }
    const templates = Object.values(tplMap).map(t => {
      const lastDate = [...t.dates].sort().pop();
      const exNames = [...new Set(t.raw.map(r => r.ex))].sort((a, b) => t.exOrder[a] - t.exOrder[b]);
      // Precompute last date each exercise appeared in this template
      const lastDatePerEx = {};
      for (const r of t.raw) {
        if (!lastDatePerEx[r.ex] || r.d > lastDatePerEx[r.ex]) lastDatePerEx[r.ex] = r.d;
      }
      const exercisesT = exNames.map(name => {
        const ld = lastDatePerEx[name];
        let top = {
          wt: 0,
          rp: 10
        };
        for (const r of t.raw) {
          if (r.ex === name && r.d === ld && r.wt > top.wt) top = r;
        }
        return {
          name,
          lastWt: top.wt,
          lastRp: top.rp
        };
      });
      return {
        name: t.name,
        count: t.dates.size,
        lastDate,
        exercises: exercisesT
      };
    }).sort((a, b) => b.count - a.count);

    // Split counts
    const splitCounts = Object.entries(splits).map(([name, ds]) => ({
      name,
      count: ds.size
    })).sort((a, b) => b.count - a.count);

    // Body anomalies — noise-gated. PBF flagged only on absolute fat-MASS change ≥0.8kg
    // or relative PBF jump ≥25% of baseline. SMM drop ≥0.5kg.
    const bodyAnomalies = [];
    for (let i = 1; i < INBODY.length; i++) {
      const p = INBODY[i - 1],
        c = INBODY[i];
      const fatPrev = p.wt * p.pbf / 100,
        fatCur = c.wt * c.pbf / 100;
      if (c.smm < p.smm - 0.5) bodyAnomalies.push({
        d: c.d,
        sev: 'warn',
        msg: `SMM −${(p.smm - c.smm).toFixed(1)}kg`
      });
      if (fatCur - fatPrev >= 0.8 && c.pbf - p.pbf >= p.pbf * 0.25) bodyAnomalies.push({
        d: c.d,
        sev: 'down',
        msg: `Fat +${(fatCur - fatPrev).toFixed(1)}kg`
      });
    }

    // Recent-session caution signals for the master bar
    const lastSessionDate = dates[dates.length - 1];
    let regressedLifts = 0;
    for (const ex of exercises) {
      const sd = strengthData[ex];
      if (sd && sd.pts.length && sd.pts[sd.pts.length - 1].d === lastSessionDate && sd.pts[sd.pts.length - 1].isRegression) regressedLifts++;
    }
    const recentBodyAnomaly = bodyAnomalies.length ? bodyAnomalies[bodyAnomalies.length - 1] : null;

    // Per-session total volume (tonnage): Σ wt×reps across all sets, all exercises
    const sessionAgg = {};
    for (const r of allData) {
      if (!sessionAgg[r.d]) sessionAgg[r.d] = {
        vol: 0,
        sets: 0,
        exs: new Set(),
        split: cleanSplit(r.w)
      };
      sessionAgg[r.d].vol += r.wt * r.rp;
      sessionAgg[r.d].sets++;
      sessionAgg[r.d].exs.add(r.ex);
    }
    const sessionVolume = dates.map((d, i) => {
      const a = sessionAgg[d];
      const vol = Math.round(a.vol);
      const prevVol = i > 0 ? Math.round(sessionAgg[dates[i - 1]].vol) : null;
      const gapDays = i > 0 ? daysBetween(dates[i - 1], d) : 0;
      return {
        d,
        vol,
        sets: a.sets,
        exCount: a.exs.size,
        split: a.split,
        delta: prevVol !== null ? vol - prevVol : 0,
        perSet: Math.round(vol / a.sets)
      };
    });
    const avgSessionVol = sessionVolume.length ? Math.round(sessionVolume.reduce((s, p) => s + p.vol, 0) / sessionVolume.length) : 0;
    const bestSessionVol = sessionVolume.length ? Math.max(...sessionVolume.map(p => p.vol)) : 0;
    return {
      dates,
      exercises: Object.keys(strengthData).sort(),
      strengthData,
      prs,
      splitCounts,
      totalSessions: dates.length,
      generalStrength,
      templates,
      bodyAnomalies,
      regressedLifts,
      recentBodyAnomaly,
      lastSessionDate,
      sessionVolume,
      avgSessionVol,
      bestSessionVol
    };
  }, [allData]);
}
const C = {
  bg: '#0B0E13',
  bg2: '#0E121A',
  glass: 'rgba(255,255,255,0.04)',
  glassHi: 'rgba(255,255,255,0.07)',
  stroke: 'rgba(255,255,255,0.08)',
  strokeHi: 'rgba(255,255,255,0.14)',
  accent: '#6E8BFF',
  up: '#46D39A',
  warn: '#FFB84D',
  down: '#FF6B6B',
  text: '#EAEEF5',
  dim: '#7E8794',
  dimmer: '#4A515C',
  grid: 'rgba(255,255,255,0.05)'
};
const F = "Inter,-apple-system,system-ui,sans-serif";
const MONO = "'B612 Mono',ui-monospace,monospace";

// Glass card
const Card = ({
  children,
  style,
  onClick
}) => /*#__PURE__*/React.createElement("div", {
  onClick: onClick,
  style: {
    background: C.glass,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1px solid ${C.stroke}`,
    borderRadius: 18,
    ...style
  }
}, children);

// Stat block (replaces annunciators) — clean numerals, tiny label
const Stat = ({
  label,
  value,
  sub,
  accent
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    minWidth: 0,
    padding: '12px 14px'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: F,
    fontSize: 9,
    letterSpacing: '.12em',
    textTransform: 'uppercase',
    color: C.dim,
    marginBottom: 5
  }
}, label), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: MONO,
    fontSize: 20,
    fontWeight: 700,
    color: accent || C.text,
    lineHeight: 1
  }
}, value), sub && /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: MONO,
    fontSize: 10,
    color: C.dimmer,
    marginTop: 3
  }
}, sub));
const SectionLabel = ({
  children,
  right
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: F,
    fontSize: 11,
    letterSpacing: '.1em',
    textTransform: 'uppercase',
    color: C.dim,
    fontWeight: 600
  }
}, children), right && /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: MONO,
    fontSize: 10,
    color: C.dimmer
  }
}, right));

// Icons (inline SVG, stroke-based to match SC)
const Icon = ({
  name,
  size = 22,
  color = C.text
}) => {
  const s = {
    width: size,
    height: size,
    fill: 'none',
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  switch (name) {
    case 'history':
      return /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24",
        style: s
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 7v5l3 2"
      }));
    case 'exercises':
      return /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24",
        style: s
      }, /*#__PURE__*/React.createElement("path", {
        d: "M6.5 6.5v11M9.5 8v8M14.5 8v8M17.5 6.5v11M3 10v4M21 10v4"
      }));
    case 'workout':
      return /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24",
        style: {
          ...s,
          strokeWidth: 2
        }
      }, /*#__PURE__*/React.createElement("path", {
        d: "M12 5v14M5 12h14"
      }));
    case 'stats':
      return /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24",
        style: s
      }, /*#__PURE__*/React.createElement("path", {
        d: "M5 20V10M12 20V4M19 20v-6"
      }));
    case 'body':
      return /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24",
        style: s
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "5",
        r: "2.4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 8v7M12 9l-5 2M12 9l5 2M12 15l-3 5M12 15l3 5"
      }));
    default:
      return null;
  }
};

// Mini stat (inline, for workout insights)
const Mini = ({
  label,
  v,
  c
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '8px 13px',
    textAlign: 'center'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: F,
    fontSize: 8,
    letterSpacing: '.1em',
    color: C.dimmer,
    marginBottom: 3
  }
}, label), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: MONO,
    fontSize: 13,
    fontWeight: 700,
    color: c || C.text
  }
}, v));
const Sep = () => /*#__PURE__*/React.createElement("div", {
  style: {
    width: 1,
    background: 'rgba(255,255,255,0.07)'
  }
});

// Big stepper input (weight/reps), validated on blur
const Stepper = ({
  label,
  val,
  step,
  color,
  onChange,
  onBlur
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    marginBottom: 14
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: F,
    fontSize: 9,
    letterSpacing: '.14em',
    color: C.dim,
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'uppercase'
  }
}, label), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  }
}, /*#__PURE__*/React.createElement("button", {
  onClick: () => onChange(val - step),
  style: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: C.glass,
    border: `1px solid ${C.stroke}`,
    color: C.text,
    fontSize: 24,
    cursor: 'pointer',
    fontFamily: MONO
  }
}, "−"), /*#__PURE__*/React.createElement("input", {
  type: "number",
  value: val,
  onChange: e => onChange(parseFloat(e.target.value)),
  onBlur: e => onBlur(parseFloat(e.target.value)),
  style: {
    width: 104,
    textAlign: 'center',
    background: 'rgba(255,255,255,0.03)',
    color,
    border: `2px solid ${color}`,
    borderRadius: 14,
    padding: '13px 0',
    fontFamily: MONO,
    fontSize: 26,
    fontWeight: 700,
    outline: 'none'
  }
}), /*#__PURE__*/React.createElement("button", {
  onClick: () => onChange(val + step),
  style: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: C.glass,
    border: `1px solid ${C.stroke}`,
    color: C.text,
    fontSize: 24,
    cursor: 'pointer',
    fontFamily: MONO
  }
}, "+")), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: MONO,
    fontSize: 9,
    color: C.dimmer,
    textAlign: 'center',
    marginTop: 6
  }
}, "±", step));

// Legend chip
const Lg = ({
  c,
  t,
  dash,
  dot
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontFamily: MONO,
    fontSize: 9,
    color: C.dim
  }
}, dot ? /*#__PURE__*/React.createElement("span", {
  style: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: c
  }
}) : /*#__PURE__*/React.createElement("span", {
  style: {
    width: 12,
    height: 2,
    background: dash ? 'transparent' : c,
    borderTop: dash ? `1.5px dashed ${c}` : 'none'
  }
}), t);
const NAV = [{
  id: 'history',
  label: 'History',
  icon: 'history'
}, {
  id: 'exercises',
  label: 'Exercises',
  icon: 'exercises'
}, {
  id: 'workout',
  label: 'Workout',
  icon: 'workout'
}, {
  id: 'stats',
  label: 'Statistics',
  icon: 'stats'
}, {
  id: 'body',
  label: 'Body',
  icon: 'body'
}];
function FlightDeckV2() {
  const [nav, setNav] = useState('history');
  const [selectedEx, setSelectedEx] = useState('');

  // Persistence — versioned with migration, corrupt-parse safe
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [inbodyInterval, setInbodyInterval] = useState(INBODY_INTERVAL_DEFAULT);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const verStr = await STORE.get('zsk4-data-version');
        const storedVer = verStr !== null ? JSON.parse(verStr) : 0;
        let workouts = null; // null = not successfully parsed
        let parseFailed = false;
        const wRaw = await STORE.get('zsk4-workouts');
        if (wRaw !== null) {
          try {
            workouts = JSON.parse(wRaw);
          } catch (e) {
            parseFailed = true;
          }
        }
        let interval = INBODY_INTERVAL_DEFAULT;
        const ivRaw = await STORE.get('zsk4-inbody-interval');
        if (ivRaw !== null) {
          try {
            interval = JSON.parse(ivRaw);
          } catch (e) {}
        }

        // If parse failed, back up the raw string and don't overwrite
        if (parseFailed) {
          await STORE.set('zsk4-workouts-backup', wRaw);
          workouts = [];
        }
        if (workouts === null) workouts = [];

        // Run migration only if parse succeeded (don't migrate empty on corrupt)
        if (!parseFailed && storedVer < DATA_VERSION) {
          const migrated = migrateState({
            workouts,
            inbodyInterval: interval
          }, storedVer);
          workouts = Array.isArray(migrated.workouts) ? migrated.workouts : workouts;
          interval = migrated.inbodyInterval !== undefined && migrated.inbodyInterval !== null ? migrated.inbodyInterval : interval;
          await STORE.set('zsk4-workouts', JSON.stringify(workouts));
          await STORE.set('zsk4-inbody-interval', JSON.stringify(interval));
          await STORE.set('zsk4-data-version', JSON.stringify(DATA_VERSION));
        }
        setSavedWorkouts(workouts);
        setInbodyInterval(interval);
      } catch (e) {/* first launch, no data */}
      setLoaded(true);
    })();
  }, []);
  const persist = async list => {
    await STORE.set('zsk4-workouts', JSON.stringify(list));
    await STORE.set('zsk4-data-version', JSON.stringify(DATA_VERSION));
  };
  const updateScanInterval = async n => {
    setInbodyInterval(n);
    await STORE.set('zsk4-inbody-interval', JSON.stringify(n));
  };

  // Export / import backup — always stamped with DATA_VERSION
  const fileRef = useRef(null);
  const exportData = () => {
    const blob = new Blob([JSON.stringify({
      dataVersion: DATA_VERSION,
      appVersion: '2.6',
      exported: new Date().toISOString(),
      workouts: savedWorkouts,
      inbodyInterval
    }, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flightdeck-backup-${todayISO()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const importData = e => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const d = JSON.parse(reader.result);
        const importVer = d.dataVersion || 0;
        const migrated = migrateState({
          workouts: d.workouts || [],
          inbodyInterval: d.inbodyInterval !== undefined ? d.inbodyInterval : INBODY_INTERVAL_DEFAULT
        }, importVer);
        if (Array.isArray(migrated.workouts)) {
          setSavedWorkouts(migrated.workouts);
          await persist(migrated.workouts);
        }
        if (migrated.inbodyInterval !== undefined && migrated.inbodyInterval !== null) await updateScanInterval(migrated.inbodyInterval);
        alert(`Imported ${migrated.workouts?.length || 0} workouts (schema v${importVer} → v${DATA_VERSION}).`);
      } catch (err) {
        alert('Invalid backup file.');
      }
    };
    reader.readAsText(f);
    e.target.value = '';
  };

  // InBody scheduling
  const inbodySchedule = useMemo(() => {
    const last = INBODY[INBODY.length - 1].d;
    const due = addDays(last, inbodyInterval);
    const daysLeft = daysBetween(todayISO(), due);
    const sinceLastScan = daysBetween(last, todayISO());
    return {
      last,
      due,
      daysLeft,
      sinceLastScan,
      overdue: daysLeft < 0,
      dueSoon: daysLeft >= 0 && daysLeft <= 5
    };
  }, [inbodyInterval]);

  // Live clock for timers
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // Merge saved workouts into RAW
  const mergedData = useMemo(() => {
    if (!savedWorkouts.length) return RAW;
    const rows = [];
    for (const w of savedWorkouts) for (const ex of w.exercises) ex.sets.forEach((s, i) => rows.push({
      d: w.date,
      w: w.name,
      ex: ex.name,
      s: i,
      wt: s.wt,
      rp: s.rp
    }));
    return [...RAW, ...rows];
  }, [savedWorkouts]);
  const data = useProcessed(mergedData);

  // ---- Workout flow state ----
  const [wkPhase, setWkPhase] = useState('select'); // select | active | summary
  const [wkTpl, setWkTpl] = useState(null);
  const [wkIdx, setWkIdx] = useState(0);
  const [wkLog, setWkLog] = useState([]);
  const [wkInput, setWkInput] = useState({
    wt: 0,
    rp: 10
  });
  const [wkStart, setWkStart] = useState(null);
  const [wkName, setWkName] = useState('');
  const [wkExs, setWkExs] = useState([]);
  const [exQuery, setExQuery] = useState('');
  const [exPickerOpen, setExPickerOpen] = useState(false);
  const [addExMode, setAddExMode] = useState(false); // mid-workout add
  const [restStart, setRestStart] = useState(null);
  const [restTarget, setRestTarget] = useState(90);
  const [flashSet, setFlashSet] = useState(null);
  const stepFor = exName => {
    // context-aware: infer from last delta in history, fallback 2.5
    const sd = data.strengthData[exName];
    if (sd && sd.pts.length >= 2) {
      const a = sd.pts[sd.pts.length - 1].wt,
        b = sd.pts[sd.pts.length - 2].wt;
      const d = Math.abs(a - b);
      if (d >= 5) return 5;
    }
    if (sd && sd.bestWt >= 45) return 5; // heavy cable stacks
    return 2.5;
  };
  const beginWorkout = tpl => {
    setWkTpl(tpl);
    setWkIdx(0);
    setWkLog(tpl.exercises.map(e => ({
      name: e.name,
      lastWt: e.lastWt,
      lastRp: e.lastRp,
      sets: []
    })));
    setWkInput({
      wt: tpl.exercises[0]?.lastWt || 0,
      rp: tpl.exercises[0]?.lastRp || 10
    });
    setWkStart(Date.now());
    setRestStart(null);
    setWkPhase('active');
  };
  const beginCustom = () => {
    if (!wkName || !wkExs.length) return;
    beginWorkout({
      name: wkName,
      count: 0,
      lastDate: null,
      exercises: wkExs.map(n => {
        const sd = data.strengthData[n];
        const lp = sd?.pts[sd.pts.length - 1];
        return {
          name: n,
          lastWt: lp?.wt || 0,
          lastRp: lp?.reps || 10
        };
      })
    });
  };
  const logSet = () => {
    // Guard: don't log NaN or negative weight
    const wt = isNaN(wkInput.wt) || wkInput.wt < 0 ? 0 : wkInput.wt;
    const rp = isNaN(wkInput.rp) || wkInput.rp < 1 ? 1 : Math.round(wkInput.rp);
    const L = [...wkLog];
    L[wkIdx].sets.push({
      wt,
      rp
    });
    setWkLog(L);
    setFlashSet(`${wkIdx}-${L[wkIdx].sets.length - 1}`);
    setTimeout(() => setFlashSet(null), 450);
    setRestStart(Date.now());
  };
  const undoSet = () => {
    const L = [...wkLog];
    if (L[wkIdx].sets.length) {
      L[wkIdx].sets.pop();
      setWkLog(L);
    }
  };
  const goEx = i => {
    setWkIdx(i);
    const e = wkLog[i];
    setWkInput({
      wt: e.lastWt || wkInput.wt,
      rp: e.lastRp || 10
    });
    setRestStart(null);
    setAddExMode(false);
  };
  const addMidEx = name => {
    const sd = data.strengthData[name];
    const lp = sd?.pts[sd.pts.length - 1];
    const L = [...wkLog, {
      name,
      lastWt: lp?.wt || 0,
      lastRp: lp?.reps || 10,
      sets: []
    }];
    setWkLog(L);
    setAddExMode(false);
    setExQuery('');
    setExPickerOpen(false);
    setWkIdx(L.length - 1);
    setWkInput({
      wt: lp?.wt || 0,
      rp: lp?.reps || 10
    });
  };
  const finishWorkout = async () => {
    const dur = Math.max(1, Math.round((Date.now() - wkStart) / 60000));
    const summary = {
      name: wkTpl.name,
      date: todayISO(),
      duration: dur,
      exercises: wkLog.filter(e => e.sets.length > 0)
    };
    if (!summary.exercises.length) {
      exitWorkout();
      return;
    }
    const list = [...savedWorkouts, summary];
    setSavedWorkouts(list);
    await persist(list); // await before transitioning — no stale closure clobber
    setWkPhase('summary');
  };
  const exitWorkout = () => {
    setWkPhase('select');
    setWkTpl(null);
    setWkLog([]);
    setWkName('');
    setWkExs([]);
    setExQuery('');
    setExPickerOpen(false);
    setAddExMode(false);
    setRestStart(null);
    setNav('history');
  };
  const [restDone, setRestDone] = useState(false);
  useEffect(() => {
    if (!restStart) {
      setRestDone(false);
      return;
    }
    const elapsed = now - restStart;
    if (elapsed >= restTarget * 1000 && !restDone) {
      setRestDone(true);
      try {
        navigator.vibrate?.(200);
      } catch (e) {}
    }
  }, [now, restStart, restTarget, restDone]);
  const fmtClock = ms => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  };

  // Master caution state
  const caution = useMemo(() => {
    if (inbodySchedule.overdue) return {
      lit: true,
      sev: 'warn',
      msg: `InBody scan overdue by ${Math.abs(inbodySchedule.daysLeft)}d`,
      go: 'body'
    };
    if (data.regressedLifts > 0) return {
      lit: true,
      sev: 'warn',
      msg: `${data.regressedLifts} lift${data.regressedLifts > 1 ? 's' : ''} down last session`,
      go: 'stats'
    };
    if (data.recentBodyAnomaly && data.recentBodyAnomaly.d === INBODY[INBODY.length - 1].d) return {
      lit: true,
      sev: data.recentBodyAnomaly.sev,
      msg: `Body check — ${data.recentBodyAnomaly.msg}`,
      go: 'body'
    };
    if (inbodySchedule.dueSoon) return {
      lit: true,
      sev: 'warn',
      msg: `InBody scan due in ${inbodySchedule.daysLeft}d`,
      go: 'body'
    };
    return {
      lit: false,
      sev: 'up',
      msg: 'All systems nominal',
      go: null
    };
  }, [data, inbodySchedule]);
  const inWorkout = nav === 'workout' && wkPhase !== 'select';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: `radial-gradient(120% 80% at 50% 0%, ${C.bg2} 0%, ${C.bg} 60%)`,
      minHeight: '100dvh',
      paddingTop: 20,
      color: C.text,
      fontFamily: F,
      paddingBottom: inWorkout ? 0 : 105
    }
  }, /*#__PURE__*/React.createElement("link", {
    href: "https://fonts.googleapis.com/css2?family=B612+Mono:wght@400;700&family=Inter:wght@400;500;600;700&display=swap",
    rel: "stylesheet"
  }), /*#__PURE__*/React.createElement("style", null, `
        @media(prefers-reduced-motion:no-preference){
          @keyframes flashGlow { 0%{background:rgba(70,211,154,0.28)} 100%{background:rgba(70,211,154,0)} }
          @keyframes cautionPulse { 0%,100%{opacity:.55} 50%{opacity:1} }
          .flash { animation: flashGlow .45s ease-out; }
          .caution-lit { animation: cautionPulse 1.6s ease-in-out infinite; }
        }
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        ::-webkit-scrollbar{width:0;height:0}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
        input[type=number]{-moz-appearance:textfield}
        body{margin:0}
      `), !inWorkout && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 18px 10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: F,
      fontSize: 20,
      fontWeight: 700,
      letterSpacing: '-.01em'
    }
  }, NAV.find(n => n.id === nav)?.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      color: C.dimmer,
      marginTop: 2
    }
  }, data.totalSessions, " sessions · ", data.dates[0]?.slice(0, 7), " → ", data.dates[data.dates.length - 1]?.slice(0, 7))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      color: C.dimmer,
      opacity: 0.6
    }
  }, "v2.6")), !inWorkout && /*#__PURE__*/React.createElement("div", {
    onClick: () => caution.go && setNav(caution.go),
    style: {
      margin: '0 18px 16px',
      cursor: caution.go ? 'pointer' : 'default'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: caution.lit ? 'caution-lit' : '',
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 14px',
      borderRadius: 12,
      background: caution.lit ? `${caution.sev === 'down' ? C.down : C.warn}14` : C.glass,
      border: `1px solid ${caution.lit ? (caution.sev === 'down' ? C.down : C.warn) + '44' : C.stroke}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: caution.lit ? caution.sev === 'down' ? C.down : C.warn : C.up,
      boxShadow: `0 0 8px ${caution.lit ? caution.sev === 'down' ? C.down : C.warn : C.up}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: F,
      fontSize: 12.5,
      color: caution.lit ? C.text : C.dim,
      flex: 1,
      fontWeight: 500
    }
  }, caution.msg), caution.go && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 14,
      color: C.dim
    }
  }, "›"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 18px',
      maxWidth: 760,
      margin: '0 auto'
    }
  }, nav === 'history' && (() => {
    const monthSet = [...new Set(data.dates.map(d => d.slice(0, 7)))].sort();
    const MN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Recent sessions (reverse), grouped by date with split + set count
    const byDate = {};
    for (const r of mergedData) {
      if (!byDate[r.d]) byDate[r.d] = {
        split: cleanSplit(r.w),
        exs: new Set(),
        sets: 0
      };
      byDate[r.d].exs.add(r.ex);
      byDate[r.d].sets++;
    }
    const recent = Object.entries(byDate).sort((a, b) => b[0].localeCompare(a[0]));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: exportData,
      style: {
        flex: 1,
        padding: '10px',
        background: C.glass,
        border: `1px solid ${C.stroke}`,
        borderRadius: 11,
        color: C.text,
        fontFamily: F,
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: C.dim,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 3v12M7 10l5 5 5-5M5 21h14"
    })), "Export"), /*#__PURE__*/React.createElement("button", {
      onClick: () => fileRef.current?.click(),
      style: {
        flex: 1,
        padding: '10px',
        background: C.glass,
        border: `1px solid ${C.stroke}`,
        borderRadius: 11,
        color: C.text,
        fontFamily: F,
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: C.dim,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 21V9M7 14l5-5 5 5M5 3h14"
    })), "Import"), /*#__PURE__*/React.createElement("input", {
      ref: fileRef,
      type: "file",
      accept: "application/json,.json",
      onChange: importData,
      style: {
        display: 'none'
      }
    })), /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      right: `${monthSet.length} months`
    }, "Training Frequency"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: 6,
        height: 80
      }
    }, monthSet.slice(-8).map(m => {
      const n = data.dates.filter(d => d.startsWith(m)).length;
      const h = Math.max(8, n / 12 * 72);
      const col = n >= 8 ? C.up : n >= 4 ? C.warn : C.down;
      return /*#__PURE__*/React.createElement("div", {
        key: m,
        style: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 5
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: MONO,
          fontSize: 10,
          color: C.dim
        }
      }, n), /*#__PURE__*/React.createElement("div", {
        style: {
          width: '100%',
          maxWidth: 28,
          height: h,
          borderRadius: '6px 6px 2px 2px',
          background: `linear-gradient(180deg, ${col}, ${col}66)`
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: F,
          fontSize: 9,
          color: C.dimmer
        }
      }, MN[+m.split('-')[1] - 1]));
    }))), data.sessionVolume.length > 0 && (() => {
      const sv = data.sessionVolume;
      const last = sv[sv.length - 1];
      const avg = data.avgSessionVol,
        best = data.bestSessionVol;
      const fmtVol = v => v >= 1000 ? `${(v / 1000).toFixed(1)}t` : `${v}`;
      const VTip = ({
        active,
        payload
      }) => {
        if (!active || !payload?.length) return null;
        const p = payload[0]?.payload;
        return /*#__PURE__*/React.createElement("div", {
          style: {
            background: C.bg2,
            border: `1px solid ${C.stroke}`,
            borderRadius: 10,
            padding: '9px 12px',
            fontFamily: MONO,
            fontSize: 10,
            color: C.dim
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            color: '#fff',
            marginBottom: 4
          }
        }, fmt(p.d), " · ", p.split), /*#__PURE__*/React.createElement("div", {
          style: {
            color: C.accent,
            fontSize: 13,
            fontWeight: 700
          }
        }, p.vol.toLocaleString(), " kg"), /*#__PURE__*/React.createElement("div", {
          style: {
            marginTop: 3
          }
        }, p.exCount, " exercises · ", p.sets, " sets"), /*#__PURE__*/React.createElement("div", {
          style: {
            color: C.dimmer
          }
        }, p.perSet, " kg/set avg"), p.delta !== 0 && /*#__PURE__*/React.createElement("div", {
          style: {
            color: p.delta > 0 ? C.up : C.down,
            marginTop: 2
          }
        }, p.delta > 0 ? '+' : '', p.delta.toLocaleString(), " vs prev"));
      };
      return /*#__PURE__*/React.createElement(Card, {
        style: {
          padding: 16,
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement(SectionLabel, {
        right: `avg ${fmtVol(avg)}`
      }, "Total Volume per Session"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: MONO,
          fontSize: 9,
          color: C.dimmer,
          marginBottom: 6
        }
      }, "total weight moved — Σ weight × reps, all sets"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 0,
          background: C.glass,
          borderRadius: 12,
          border: `1px solid ${C.stroke}`,
          overflow: 'hidden',
          marginBottom: 14
        }
      }, /*#__PURE__*/React.createElement(Mini, {
        label: "LAST",
        v: `${last.vol.toLocaleString()}`,
        c: last.vol >= avg ? C.up : C.warn
      }), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement(Mini, {
        label: "AVG",
        v: `${avg.toLocaleString()}`
      }), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement(Mini, {
        label: "BEST",
        v: `${best.toLocaleString()}`,
        c: C.up
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 200
        }
      }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
        width: "100%",
        height: "100%"
      }, /*#__PURE__*/React.createElement(BarChart, {
        data: sv,
        margin: {
          top: 5,
          right: 8,
          bottom: 0,
          left: -6
        }
      }, /*#__PURE__*/React.createElement(CartesianGrid, {
        stroke: C.grid,
        vertical: false
      }), /*#__PURE__*/React.createElement(ReferenceLine, {
        y: avg,
        stroke: C.dimmer,
        strokeDasharray: "5 4"
      }), /*#__PURE__*/React.createElement(XAxis, {
        dataKey: "d",
        tick: false,
        axisLine: {
          stroke: C.stroke
        }
      }), /*#__PURE__*/React.createElement(YAxis, {
        tick: {
          fill: C.dimmer,
          fontSize: 9,
          fontFamily: MONO
        },
        axisLine: false,
        tickLine: false,
        tickFormatter: fmtVol,
        width: 36
      }), /*#__PURE__*/React.createElement(Tooltip, {
        cursor: {
          fill: 'rgba(255,255,255,0.03)'
        },
        content: /*#__PURE__*/React.createElement(VTip, null)
      }), /*#__PURE__*/React.createElement(Bar, {
        dataKey: "vol",
        radius: [4, 4, 2, 2],
        isAnimationActive: false
      }, sv.map((p, i) => /*#__PURE__*/React.createElement(Cell, {
        key: i,
        fill: p.vol >= best ? C.up : p.vol >= avg ? C.accent : 'rgba(110,139,255,0.45)'
      })))))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 14,
          marginTop: 10
        }
      }, /*#__PURE__*/React.createElement(Lg, {
        c: C.up,
        t: "Best"
      }), /*#__PURE__*/React.createElement(Lg, {
        c: C.accent,
        t: "Above avg"
      }), /*#__PURE__*/React.createElement(Lg, {
        c: C.dimmer,
        t: "Avg line",
        dash: true
      })));
    })(), /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "Calendar"), monthSet.slice().reverse().map(month => {
      const [y, mm] = month.split('-').map(Number);
      const days = new Date(y, mm, 0).getDate(),
        first = new Date(y, mm - 1, 1).getDay();
      const mset = new Set(data.dates.filter(d => d.startsWith(month)));
      const cells = [];
      for (let i = 0; i < first; i++) cells.push(/*#__PURE__*/React.createElement("div", {
        key: 'e' + i
      }));
      for (let d = 1; d <= days; d++) {
        const ds = `${month}-${String(d).padStart(2, '0')}`;
        const on = mset.has(ds);
        cells.push(/*#__PURE__*/React.createElement("div", {
          key: d,
          style: {
            aspectRatio: '1',
            borderRadius: 8,
            display: 'grid',
            placeItems: 'center',
            fontFamily: MONO,
            fontSize: 11,
            background: on ? C.accent : C.glass,
            color: on ? '#fff' : C.dimmer,
            fontWeight: on ? 700 : 400,
            border: `1px solid ${on ? 'transparent' : C.stroke}`
          }
        }, d));
      }
      return /*#__PURE__*/React.createElement("div", {
        key: month,
        style: {
          marginBottom: 14
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: MONO,
          fontSize: 11,
          color: C.accent,
          marginBottom: 8
        }
      }, MN[mm - 1], " ", y), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(7,1fr)',
          gap: 5
        }
      }, ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((l, i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          textAlign: 'center',
          fontSize: 8,
          color: C.dimmer,
          fontFamily: F,
          paddingBottom: 2
        }
      }, l)), cells));
    })), /*#__PURE__*/React.createElement(SectionLabel, null, "Recent Sessions"), recent.slice(0, 15).map(([d, info]) => {
      // Check if this session is user-logged (deletable)
      const swIdx = savedWorkouts.findIndex(w => w.date === d && w.name === info.split);
      const deletable = swIdx !== -1;
      const handleDelete = async () => {
        if (!confirm(`Delete ${info.split} on ${fmt(d)}?`)) return;
        const list = savedWorkouts.filter((_, i) => i !== swIdx);
        setSavedWorkouts(list);
        await persist(list);
      };
      return /*#__PURE__*/React.createElement(Card, {
        key: d,
        style: {
          padding: '13px 15px',
          marginBottom: 8,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: F,
          fontSize: 14,
          fontWeight: 600
        }
      }, info.split), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: MONO,
          fontSize: 10,
          color: C.dim,
          marginTop: 2
        }
      }, info.exs.size, " exercises · ", info.sets, " sets")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: MONO,
          fontSize: 11,
          color: C.dimmer
        }
      }, fmtY(d)), deletable && /*#__PURE__*/React.createElement("button", {
        onClick: handleDelete,
        style: {
          background: 'none',
          border: 'none',
          color: C.down,
          cursor: 'pointer',
          fontSize: 14,
          padding: '0 2px',
          fontFamily: MONO,
          opacity: 0.6
        }
      }, "×")));
    }));
  })(), nav === 'exercises' && (() => {
    const defEx = selectedEx || data.exercises[0] || '';
    const sd = data.strengthData[defEx] || {
      pts: [],
      avgWt: 0,
      bestWt: 0,
      bestE1: 0
    };
    const pts = sd.pts;
    const pr = data.prs[defEx];
    if (!pts.length) return /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: MONO,
        fontSize: 12,
        color: C.dim,
        padding: 20
      }
    }, "No data.");
    const first = pts[0],
      last = pts[pts.length - 1];
    const delta = +(last.wt - first.wt).toFixed(1);
    const regs = pts.filter(p => p.isRegression).length;
    const Tip = ({
      active,
      payload,
      kind
    }) => {
      if (!active || !payload?.length) return null;
      const p = payload[0]?.payload;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          background: C.bg2,
          border: `1px solid ${p?.isRegression ? C.down : C.stroke}`,
          borderRadius: 10,
          padding: '8px 11px',
          fontFamily: MONO,
          fontSize: 10,
          color: C.dim
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: p?.isRegression ? C.down : '#fff',
          marginBottom: 3
        }
      }, fmt(p.d), p.gapDays > 14 ? ` · ${p.gapDays}d gap` : ''), kind === 'wt' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          color: C.up
        }
      }, "Max ", p.wt, "kg × ", p.reps), /*#__PURE__*/React.createElement("div", {
        style: {
          color: C.warn
        }
      }, "e1RM ", p.e1rm)), kind === 'vol' && /*#__PURE__*/React.createElement("div", {
        style: {
          color: C.accent
        }
      }, p.vol, " kg·reps"));
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("select", {
      value: defEx,
      onChange: e => setSelectedEx(e.target.value),
      style: {
        width: '100%',
        appearance: 'none',
        background: C.glass,
        backdropFilter: 'blur(20px)',
        color: C.text,
        border: `1px solid ${C.strokeHi}`,
        borderRadius: 14,
        padding: '14px 16px',
        fontFamily: F,
        fontSize: 15,
        fontWeight: 600,
        outline: 'none'
      }
    }, data.exercises.map(ex => /*#__PURE__*/React.createElement("option", {
      key: ex,
      value: ex,
      style: {
        background: C.bg2
      }
    }, ex))), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        color: C.dim,
        pointerEvents: 'none',
        fontSize: 12
      }
    }, "▾")), /*#__PURE__*/React.createElement(Card, {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: 16,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(Stat, {
      label: "Sessions",
      value: pts.length
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1,
        background: C.stroke
      }
    }), /*#__PURE__*/React.createElement(Stat, {
      label: "PR",
      value: `${pr?.wt}`,
      sub: `× ${pr?.rp}`,
      accent: C.up
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1,
        background: C.stroke
      }
    }), /*#__PURE__*/React.createElement(Stat, {
      label: "Avg",
      value: `${sd.avgWt}`,
      sub: "kg top set"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1,
        background: C.stroke
      }
    }), /*#__PURE__*/React.createElement(Stat, {
      label: "Trend",
      value: `${delta >= 0 ? '+' : ''}${delta}`,
      sub: "kg overall",
      accent: delta >= 0 ? C.up : C.down
    })), /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      right: regs > 0 ? `${regs} regressions` : ''
    }, "Max Weight · e1RM"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 200
      }
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
      width: "100%",
      height: "100%"
    }, /*#__PURE__*/React.createElement(LineChart, {
      data: pts,
      margin: {
        top: 5,
        right: 8,
        bottom: 0,
        left: -18
      }
    }, /*#__PURE__*/React.createElement(CartesianGrid, {
      stroke: C.grid,
      vertical: false
    }), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "d",
      tick: false,
      axisLine: {
        stroke: C.stroke
      }
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: {
        fill: C.dimmer,
        fontSize: 10,
        fontFamily: MONO
      },
      axisLine: false,
      tickLine: false,
      domain: ['dataMin-5', 'dataMax+8']
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: p => /*#__PURE__*/React.createElement(Tip, {
        ...p,
        kind: "wt"
      })
    }), /*#__PURE__*/React.createElement(Line, {
      type: "monotone",
      dataKey: "e1rm",
      stroke: C.warn,
      strokeWidth: 1.5,
      strokeDasharray: "4 3",
      dot: false,
      isAnimationActive: false
    }), /*#__PURE__*/React.createElement(Line, {
      type: "monotone",
      dataKey: "wt",
      stroke: C.up,
      strokeWidth: 2.5,
      isAnimationActive: false,
      dot: pr => {
        const {
          cx,
          cy,
          payload
        } = pr;
        if (!cx) return null;
        return /*#__PURE__*/React.createElement("circle", {
          cx: cx,
          cy: cy,
          r: payload.isRegression ? 5 : 3.5,
          fill: payload.isRegression ? C.down : C.up
        });
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 14,
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement(Lg, {
      c: C.up,
      t: "Max"
    }), /*#__PURE__*/React.createElement(Lg, {
      c: C.warn,
      t: "e1RM",
      dash: true
    }), /*#__PURE__*/React.createElement(Lg, {
      c: C.down,
      t: "Regression",
      dot: true
    }))), /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "Session Volume"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 150
      }
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
      width: "100%",
      height: "100%"
    }, /*#__PURE__*/React.createElement(BarChart, {
      data: pts,
      margin: {
        top: 5,
        right: 8,
        bottom: 0,
        left: -18
      }
    }, /*#__PURE__*/React.createElement(CartesianGrid, {
      stroke: C.grid,
      vertical: false
    }), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "d",
      tick: false,
      axisLine: {
        stroke: C.stroke
      }
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: {
        fill: C.dimmer,
        fontSize: 10,
        fontFamily: MONO
      },
      axisLine: false,
      tickLine: false
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: p => /*#__PURE__*/React.createElement(Tip, {
        ...p,
        kind: "vol"
      })
    }), /*#__PURE__*/React.createElement(Bar, {
      dataKey: "vol",
      radius: [5, 5, 2, 2],
      isAnimationActive: false
    }, pts.map((p, i) => /*#__PURE__*/React.createElement(Cell, {
      key: i,
      fill: p.isRegression ? C.down : C.accent
    }))))))), /*#__PURE__*/React.createElement(SectionLabel, null, "Session Log"), /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: '4px 0',
        overflow: 'hidden'
      }
    }, (() => {
      const rev = [...pts].reverse();
      return rev.map((p, i) => {
        const prev = i < rev.length - 1 ? rev[i + 1] : null;
        const wd = prev ? +(p.wt - prev.wt).toFixed(1) : 0;
        return /*#__PURE__*/React.createElement("div", {
          key: p.d,
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '11px 16px',
            borderBottom: i < pts.length - 1 ? `1px solid ${C.grid}` : 'none'
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontFamily: MONO,
            fontSize: 12,
            color: p.isRegression ? C.down : C.text
          }
        }, fmt(p.d)), /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            gap: 16,
            alignItems: 'baseline'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: MONO,
            fontSize: 13,
            fontWeight: 700,
            color: p.isRegression ? C.down : C.up
          }
        }, p.wt, "kg", /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 9,
            color: wd > 0 ? C.up : wd < 0 ? C.down : C.dimmer,
            marginLeft: 4
          }
        }, wd > 0 ? `+${wd}` : wd < 0 ? wd : '')), /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: MONO,
            fontSize: 11,
            color: C.dim,
            width: 28,
            textAlign: 'right'
          }
        }, "×", p.reps), /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: MONO,
            fontSize: 10,
            color: C.dimmer,
            width: 36,
            textAlign: 'right'
          }
        }, p.e1rm)));
      });
    })()));
  })(), nav === 'workout' && wkPhase === 'select' && (() => {
    const q = exQuery.toLowerCase().trim();
    const filtered = q ? data.exercises.filter(e => e.toLowerCase().includes(q)) : data.exercises;
    const added = new Set(wkExs);
    const exact = data.exercises.some(e => e.toLowerCase() === q);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, null, "Templates"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        marginBottom: 24
      }
    }, data.templates.map(t => /*#__PURE__*/React.createElement(Card, {
      key: t.name,
      onClick: () => beginWorkout(t),
      style: {
        padding: '16px 15px',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: F,
        fontSize: 15,
        fontWeight: 700,
        marginBottom: 6
      }
    }, t.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: MONO,
        fontSize: 10,
        color: C.dim
      }
    }, t.exercises.length, " exercises"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: MONO,
        fontSize: 10,
        color: C.dimmer,
        marginTop: 2
      }
    }, t.count, "× · ", t.lastDate ? fmt(t.lastDate) : '—')))), /*#__PURE__*/React.createElement(SectionLabel, null, "New Template"), /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: wkName,
      onChange: e => setWkName(e.target.value),
      placeholder: "Template name",
      style: {
        width: '100%',
        background: C.bg2,
        color: C.text,
        border: `1px solid ${C.stroke}`,
        borderRadius: 12,
        padding: '12px 14px',
        fontFamily: F,
        fontSize: 14,
        outline: 'none',
        marginBottom: 10
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        marginBottom: wkExs.length ? 12 : 0
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: exQuery,
      onFocus: () => setExPickerOpen(true),
      onChange: e => {
        setExQuery(e.target.value);
        setExPickerOpen(true);
      },
      placeholder: "Search or create exercise",
      style: {
        width: '100%',
        background: C.bg2,
        color: C.text,
        border: `1px solid ${exPickerOpen ? C.accent : C.stroke}`,
        borderRadius: 12,
        padding: '12px 14px',
        fontFamily: F,
        fontSize: 13,
        outline: 'none'
      }
    }), exPickerOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 'calc(100% + 6px)',
        left: 0,
        right: 0,
        zIndex: 20,
        background: C.bg2,
        border: `1px solid ${C.strokeHi}`,
        borderRadius: 12,
        overflow: 'hidden',
        maxHeight: 260,
        overflowY: 'auto',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }
    }, q && !exact && /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setWkExs(p => [...p, exQuery.trim()]);
        setExQuery('');
        setExPickerOpen(false);
      },
      style: {
        width: '100%',
        padding: '12px 14px',
        background: `${C.up}14`,
        border: 'none',
        borderBottom: `1px solid ${C.grid}`,
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.up,
        fontFamily: F,
        fontSize: 11,
        fontWeight: 700
      }
    }, "+ NEW"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#fff',
        fontFamily: F,
        fontSize: 13
      }
    }, exQuery.trim())), filtered.filter(e => !added.has(e)).slice(0, 14).map(e => {
      const p = data.prs[e];
      return /*#__PURE__*/React.createElement("button", {
        key: e,
        onClick: () => {
          setWkExs(x => [...x, e]);
          setExQuery('');
          setExPickerOpen(false);
        },
        style: {
          width: '100%',
          padding: '11px 14px',
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${C.grid}`,
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: C.text,
          fontFamily: F,
          fontSize: 13
        }
      }, e), p && /*#__PURE__*/React.createElement("span", {
        style: {
          color: C.dimmer,
          fontFamily: MONO,
          fontSize: 10
        }
      }, p.wt, "kg"));
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => setExPickerOpen(false),
      style: {
        width: '100%',
        padding: '9px',
        background: C.glass,
        border: 'none',
        color: C.dim,
        fontFamily: F,
        fontSize: 11,
        cursor: 'pointer'
      }
    }, "Close"))), wkExs.map((e, i) => {
      const isNew = !data.exercises.includes(e);
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '9px 12px',
          background: i % 2 ? C.glass : 'transparent',
          borderRadius: 8,
          fontFamily: F,
          fontSize: 13,
          color: C.dim
        }
      }, /*#__PURE__*/React.createElement("span", null, i + 1, ". ", e, isNew && /*#__PURE__*/React.createElement("span", {
        style: {
          color: C.up,
          fontSize: 9,
          marginLeft: 7,
          fontWeight: 700
        }
      }, "NEW")), /*#__PURE__*/React.createElement("button", {
        onClick: () => setWkExs(p => p.filter((_, j) => j !== i)),
        style: {
          background: 'none',
          border: 'none',
          color: C.down,
          cursor: 'pointer',
          fontSize: 16
        }
      }, "×"));
    }), wkName && wkExs.length > 0 && /*#__PURE__*/React.createElement("button", {
      onClick: beginCustom,
      style: {
        width: '100%',
        marginTop: 12,
        background: C.accent,
        color: '#fff',
        border: 'none',
        borderRadius: 12,
        padding: '13px',
        fontFamily: F,
        fontSize: 14,
        fontWeight: 700,
        cursor: 'pointer'
      }
    }, "Start ", wkName)));
  })(), nav === 'workout' && wkPhase === 'active' && wkLog.length > 0 && (() => {
    const ex = wkLog[wkIdx];
    const totalSets = wkLog.reduce((s, e) => s + e.sets.length, 0);
    const sd = data.strengthData[ex.name];
    const pr = data.prs[ex.name];
    const step = stepFor(ex.name);
    const sessionMax = ex.sets.length ? Math.max(...ex.sets.map(s => s.wt)) : 0;
    const sessionE1 = ex.sets.length ? Math.max(...ex.sets.map(s => e1rm(s.wt, s.rp))) : 0;
    const newPR = pr && sessionE1 > pr.e1rm;
    const aboveAvg = sd && sessionMax > sd.avgWt;
    const restMs = restStart ? now - restStart : 0;
    const restLeft = restStart ? Math.max(0, restTarget * 1000 - restMs) : 0;
    const q = exQuery.toLowerCase().trim();
    const added = new Set(wkLog.map(e => e.name));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: exitWorkout,
      style: {
        background: 'none',
        border: 'none',
        color: C.dim,
        fontFamily: F,
        fontSize: 13,
        cursor: 'pointer',
        padding: 0
      }
    }, "‹ Exit"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: MONO,
        fontSize: 15,
        fontWeight: 700,
        color: C.text
      }
    }, fmtClock(now - wkStart)), /*#__PURE__*/React.createElement("button", {
      onClick: finishWorkout,
      style: {
        background: C.glass,
        border: `1px solid ${C.strokeHi}`,
        borderRadius: 10,
        padding: '7px 14px',
        color: C.text,
        fontFamily: F,
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer'
      }
    }, "Finish")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        marginBottom: 18,
        paddingBottom: 4
      }
    }, wkLog.map((e, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => goEx(i),
      style: {
        flexShrink: 0,
        padding: '7px 12px',
        borderRadius: 20,
        background: i === wkIdx ? C.accent : C.glass,
        border: `1px solid ${i === wkIdx ? 'transparent' : e.sets.length ? C.up + '55' : C.stroke}`,
        fontFamily: F,
        fontSize: 11,
        fontWeight: 600,
        color: i === wkIdx ? '#fff' : e.sets.length ? C.up : C.dim,
        cursor: 'pointer',
        whiteSpace: 'nowrap'
      }
    }, e.name.split('(')[0].trim().slice(0, 14), e.sets.length ? ` ${e.sets.length}` : '')), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setAddExMode(!addExMode);
        setExPickerOpen(!addExMode);
      },
      style: {
        flexShrink: 0,
        width: 32,
        padding: '7px 0',
        borderRadius: 20,
        background: C.glass,
        border: `1px dashed ${C.strokeHi}`,
        color: C.dim,
        cursor: 'pointer',
        fontSize: 14
      }
    }, "+")), addExMode && /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: 12,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: exQuery,
      autoFocus: true,
      onChange: e => setExQuery(e.target.value),
      placeholder: "Add exercise to this session",
      style: {
        width: '100%',
        background: C.bg2,
        color: C.text,
        border: `1px solid ${C.accent}`,
        borderRadius: 10,
        padding: '10px 12px',
        fontFamily: F,
        fontSize: 13,
        outline: 'none',
        marginBottom: q ? 8 : 0
      }
    }), q && /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: 180,
        overflowY: 'auto'
      }
    }, !data.exercises.some(e => e.toLowerCase() === q) && /*#__PURE__*/React.createElement("button", {
      onClick: () => addMidEx(exQuery.trim()),
      style: {
        width: '100%',
        padding: '10px 12px',
        background: `${C.up}14`,
        border: 'none',
        borderRadius: 8,
        textAlign: 'left',
        cursor: 'pointer',
        color: C.up,
        fontFamily: F,
        fontSize: 13,
        fontWeight: 600,
        marginBottom: 4
      }
    }, "+ New: ", exQuery.trim()), data.exercises.filter(e => e.toLowerCase().includes(q) && !added.has(e)).slice(0, 8).map(e => /*#__PURE__*/React.createElement("button", {
      key: e,
      onClick: () => addMidEx(e),
      style: {
        width: '100%',
        padding: '10px 12px',
        background: 'transparent',
        border: 'none',
        textAlign: 'left',
        cursor: 'pointer',
        color: C.text,
        fontFamily: F,
        fontSize: 13
      }
    }, e)))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: F,
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 10
      }
    }, ex.name), sd ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        gap: 0,
        background: C.glass,
        borderRadius: 12,
        border: `1px solid ${C.stroke}`,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(Mini, {
      label: "AVG",
      v: `${sd.avgWt}kg`
    }), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement(Mini, {
      label: "BEST",
      v: `${sd.bestWt}kg`,
      c: C.up
    }), /*#__PURE__*/React.createElement(Sep, null), pr && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Mini, {
      label: "PR",
      v: `${pr.wt}×${pr.rp}`,
      c: C.warn
    }), /*#__PURE__*/React.createElement(Sep, null)), /*#__PURE__*/React.createElement(Mini, {
      label: "DONE",
      v: sd.pts.length
    })) : /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: MONO,
        fontSize: 11,
        color: C.up
      }
    }, "NEW EXERCISE"), ex.sets.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: MONO,
        fontSize: 11,
        marginTop: 10,
        color: newPR ? C.up : aboveAvg ? C.warn : C.dim
      }
    }, newPR ? '★ NEW PR THIS SESSION' : aboveAvg ? '↑ above your average' : `session ${sessionMax}kg`)), restStart && /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: '12px 16px',
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: restLeft === 0 ? C.up + '55' : C.stroke
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: F,
        fontSize: 11,
        color: C.dim,
        letterSpacing: '.08em',
        textTransform: 'uppercase'
      }
    }, "Rest"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: MONO,
        fontSize: 22,
        fontWeight: 700,
        color: restLeft === 0 ? C.up : C.text
      }
    }, restLeft === 0 ? 'DONE' : fmtClock(restLeft)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, [60, 90, 120].map(s => /*#__PURE__*/React.createElement("button", {
      key: s,
      onClick: () => setRestTarget(s),
      style: {
        padding: '5px 9px',
        borderRadius: 8,
        background: restTarget === s ? C.accent : C.glass,
        border: `1px solid ${restTarget === s ? 'transparent' : C.stroke}`,
        color: restTarget === s ? '#fff' : C.dim,
        fontFamily: MONO,
        fontSize: 10,
        cursor: 'pointer'
      }
    }, s)), /*#__PURE__*/React.createElement("button", {
      onClick: () => setRestStart(null),
      style: {
        padding: '5px 9px',
        borderRadius: 8,
        background: C.glass,
        border: `1px solid ${C.stroke}`,
        color: C.dim,
        fontFamily: F,
        fontSize: 10,
        cursor: 'pointer'
      }
    }, "✕"))), /*#__PURE__*/React.createElement(Stepper, {
      label: "WEIGHT (KG)",
      val: wkInput.wt,
      step: step,
      color: C.up,
      onChange: v => setWkInput(p => ({
        ...p,
        wt: Math.max(0, +v.toFixed(2))
      })),
      onBlur: v => setWkInput(p => ({
        ...p,
        wt: isNaN(v) || v < 0 ? 0 : v
      }))
    }), /*#__PURE__*/React.createElement(Stepper, {
      label: "REPS",
      val: wkInput.rp,
      step: 1,
      color: C.warn,
      onChange: v => setWkInput(p => ({
        ...p,
        rp: Math.max(1, Math.round(v))
      })),
      onBlur: v => setWkInput(p => ({
        ...p,
        rp: isNaN(v) || v < 1 ? 1 : Math.round(v)
      }))
    }), /*#__PURE__*/React.createElement("button", {
      onClick: logSet,
      style: {
        width: '100%',
        background: C.accent,
        color: '#fff',
        border: 'none',
        borderRadius: 14,
        padding: '17px',
        fontFamily: F,
        fontSize: 15,
        fontWeight: 700,
        cursor: 'pointer',
        marginTop: 6,
        marginBottom: 16
      }
    }, "Log Set"), ex.sets.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 16
      }
    }, ex.sets.map((s, i) => {
      const reg = i > 0 && e1rm(s.wt, s.rp) < e1rm(ex.sets[i - 1].wt, ex.sets[i - 1].rp);
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: flashSet === `${wkIdx}-${i}` ? 'flash' : '',
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '11px 15px',
          borderRadius: 10,
          background: reg ? `${C.down}10` : C.glass,
          borderLeft: `3px solid ${reg ? C.down : C.up}`,
          marginBottom: 5
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: MONO,
          fontSize: 11,
          color: C.dim
        }
      }, "Set ", i + 1), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: MONO,
          fontSize: 14,
          fontWeight: 700,
          color: reg ? C.down : C.text
        }
      }, s.wt, "kg × ", s.rp));
    }), /*#__PURE__*/React.createElement("button", {
      onClick: undoSet,
      style: {
        background: 'none',
        border: 'none',
        color: C.down,
        fontFamily: F,
        fontSize: 11,
        cursor: 'pointer',
        padding: '6px 0'
      }
    }, "Undo last set")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, wkIdx > 0 && /*#__PURE__*/React.createElement("button", {
      onClick: () => goEx(wkIdx - 1),
      style: {
        flex: 1,
        padding: '12px',
        background: C.glass,
        border: `1px solid ${C.stroke}`,
        borderRadius: 12,
        color: C.dim,
        fontFamily: F,
        fontSize: 12,
        cursor: 'pointer'
      }
    }, "‹ Prev"), wkIdx < wkLog.length - 1 && /*#__PURE__*/React.createElement("button", {
      onClick: () => goEx(wkIdx + 1),
      style: {
        flex: 1,
        padding: '12px',
        background: C.glass,
        border: `1px solid ${C.stroke}`,
        borderRadius: 12,
        color: C.dim,
        fontFamily: F,
        fontSize: 12,
        cursor: 'pointer'
      }
    }, "Next ›")));
  })(), nav === 'workout' && wkPhase === 'summary' && savedWorkouts.length > 0 && (() => {
    const w = savedWorkouts[savedWorkouts.length - 1];
    const vol = w.exercises.reduce((s, e) => s + e.sets.reduce((a, b) => a + b.wt * b.rp, 0), 0);
    const sets = w.exercises.reduce((s, e) => s + e.sets.length, 0);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: F,
        fontSize: 22,
        fontWeight: 700,
        color: C.up,
        marginBottom: 6
      }
    }, "Workout Complete"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: MONO,
        fontSize: 12,
        color: C.dim
      }
    }, w.name, " · ", w.duration, "min · ", sets, " sets · ", Math.round(vol), " kg·reps")), w.exercises.map((e, i) => /*#__PURE__*/React.createElement(Card, {
      key: i,
      style: {
        padding: '14px 16px',
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: F,
        fontSize: 14,
        fontWeight: 600,
        marginBottom: 8
      }
    }, e.name), e.sets.map((s, j) => {
      const reg = j > 0 && e1rm(s.wt, s.rp) < e1rm(e.sets[j - 1].wt, e.sets[j - 1].rp);
      return /*#__PURE__*/React.createElement("div", {
        key: j,
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          padding: '5px 0',
          fontFamily: MONO,
          fontSize: 12
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: C.dim
        }
      }, "Set ", j + 1), /*#__PURE__*/React.createElement("span", {
        style: {
          color: reg ? C.down : C.text
        }
      }, s.wt, "kg × ", s.rp));
    }))), /*#__PURE__*/React.createElement("button", {
      onClick: exitWorkout,
      style: {
        width: '100%',
        marginTop: 8,
        background: C.accent,
        color: '#fff',
        border: 'none',
        borderRadius: 14,
        padding: '15px',
        fontFamily: F,
        fontSize: 15,
        fontWeight: 700,
        cursor: 'pointer'
      }
    }, "Done"));
  })(), nav === 'stats' && (() => {
    const gs = data.generalStrength;
    const gsAvg = gs.length ? Math.round(gs.reduce((s, p) => s + p.idx, 0) / gs.length * 10) / 10 : 0;
    const gsMin = gs.length ? Math.floor(Math.min(...gs.map(p => p.idx)) / 5) * 5 : 80;
    const gsMax = gs.length ? Math.ceil(Math.max(...gs.map(p => p.idx)) / 5) * 5 + 5 : 105;
    // PR recency
    const prList = Object.entries(data.prs).filter(([, v]) => v.wt > 0).map(([ex, v]) => ({
      ex,
      ...v,
      age: Math.round((new Date(data.lastSessionDate) - new Date(v.d)) / 86400000)
    })).sort((a, b) => b.e1rm - a.e1rm);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      right: `avg ${gsAvg}%`
    }, "General Strength Index"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: MONO,
        fontSize: 9,
        color: C.dimmer,
        marginBottom: 10
      }
    }, "each lift as % of its e1RM PR · EMA-smoothed"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 190
      }
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
      width: "100%",
      height: "100%"
    }, /*#__PURE__*/React.createElement(LineChart, {
      data: gs,
      margin: {
        top: 5,
        right: 8,
        bottom: 0,
        left: -18
      }
    }, /*#__PURE__*/React.createElement(CartesianGrid, {
      stroke: C.grid,
      vertical: false
    }), /*#__PURE__*/React.createElement(ReferenceLine, {
      y: gsAvg,
      stroke: C.dimmer,
      strokeDasharray: "5 4"
    }), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "d",
      tick: false,
      axisLine: {
        stroke: C.stroke
      }
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: {
        fill: C.dimmer,
        fontSize: 10,
        fontFamily: MONO
      },
      axisLine: false,
      tickLine: false,
      domain: [gsMin, gsMax],
      tickFormatter: v => `${v}%`
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: ({
        active,
        payload
      }) => {
        if (!active || !payload?.length) return null;
        const p = payload[0]?.payload;
        return /*#__PURE__*/React.createElement("div", {
          style: {
            background: C.bg2,
            border: `1px solid ${C.stroke}`,
            borderRadius: 10,
            padding: '8px 11px',
            fontFamily: MONO,
            fontSize: 10,
            color: C.dim
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            color: '#fff'
          }
        }, fmt(p.d)), /*#__PURE__*/React.createElement("div", {
          style: {
            color: p.idx >= gsAvg ? C.up : C.warn
          }
        }, p.idx, "% of PR"), /*#__PURE__*/React.createElement("div", null, "beat avg: ", p.beat, "/", p.total));
      }
    }), /*#__PURE__*/React.createElement(Line, {
      type: "monotone",
      dataKey: "idx",
      stroke: C.accent,
      strokeWidth: 2.5,
      isAnimationActive: false,
      dot: pr => {
        const {
          cx,
          cy,
          payload
        } = pr;
        if (!cx) return null;
        return /*#__PURE__*/React.createElement("circle", {
          cx: cx,
          cy: cy,
          r: payload.idx < gsAvg ? 4 : 3,
          fill: payload.idx < gsAvg ? C.warn : C.accent
        });
      }
    }))))), /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "Split Frequency"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 170
      }
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
      width: "100%",
      height: "100%"
    }, /*#__PURE__*/React.createElement(BarChart, {
      data: data.splitCounts,
      margin: {
        top: 5,
        right: 8,
        bottom: 0,
        left: -18
      }
    }, /*#__PURE__*/React.createElement(CartesianGrid, {
      stroke: C.grid,
      vertical: false
    }), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "name",
      tick: {
        fill: C.dim,
        fontSize: 9,
        fontFamily: F
      },
      axisLine: {
        stroke: C.stroke
      },
      tickLine: false
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: {
        fill: C.dimmer,
        fontSize: 10,
        fontFamily: MONO
      },
      axisLine: false,
      tickLine: false
    }), /*#__PURE__*/React.createElement(Tooltip, {
      cursor: {
        fill: 'rgba(255,255,255,0.03)'
      },
      content: ({
        active,
        payload
      }) => {
        if (!active || !payload?.length) return null;
        const p = payload[0]?.payload;
        return /*#__PURE__*/React.createElement("div", {
          style: {
            background: C.bg2,
            border: `1px solid ${C.stroke}`,
            borderRadius: 10,
            padding: '7px 10px',
            fontFamily: MONO,
            fontSize: 10,
            color: C.text
          }
        }, p.name, ": ", p.count);
      }
    }), /*#__PURE__*/React.createElement(Bar, {
      dataKey: "count",
      radius: [5, 5, 2, 2],
      isAnimationActive: false
    }, data.splitCounts.map((_, i) => /*#__PURE__*/React.createElement(Cell, {
      key: i,
      fill: i === 0 ? C.accent : C.dimmer
    }))))))), /*#__PURE__*/React.createElement(SectionLabel, {
      right: "by e1RM"
    }, "Personal Records"), /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: '4px 0',
        overflow: 'hidden'
      }
    }, prList.map((p, i) => /*#__PURE__*/React.createElement("div", {
      key: p.ex,
      onClick: () => {
        setSelectedEx(p.ex);
        setNav('exercises');
      },
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '11px 16px',
        borderBottom: i < prList.length - 1 ? `1px solid ${C.grid}` : 'none',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: F,
        fontSize: 13,
        color: C.text,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, p.ex), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: MONO,
        fontSize: 9,
        color: p.age > 60 ? C.warn : C.dimmer,
        marginTop: 2
      }
    }, p.age > 60 ? `stale · ${p.age}d ago · tap to view` : `${fmt(p.d)}`)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: MONO,
        fontSize: 14,
        fontWeight: 700,
        color: C.up
      }
    }, p.wt, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.dim
      }
    }, "×", p.rp)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: MONO,
        fontSize: 14,
        color: C.dimmer
      }
    }, "›"))))), data.sessionVolume.length > 0 && (() => {
      const sv = [...data.sessionVolume].sort((a, b) => b.vol - a.vol);
      const top5 = sv.slice(0, 5);
      // Best per split
      const bySplit = {};
      for (const s of data.sessionVolume) {
        if (!bySplit[s.split] || s.vol > bySplit[s.split].vol) bySplit[s.split] = s;
      }
      const splitBests = Object.values(bySplit).sort((a, b) => b.vol - a.vol);
      // Heaviest single set (by e1RM)
      const allPRs = Object.entries(data.prs).map(([ex, v]) => ({
        ex,
        ...v
      })).sort((a, b) => b.e1rm - a.e1rm);
      const topSet = allPRs[0];
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionLabel, {
        right: "by tonnage"
      }, "Session Records"), /*#__PURE__*/React.createElement(Card, {
        style: {
          padding: '4px 0',
          overflow: 'hidden',
          marginBottom: 16
        }
      }, top5.map((s, i) => {
        const isBest = i === 0;
        return /*#__PURE__*/React.createElement("div", {
          key: s.d + i,
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '11px 16px',
            borderBottom: i < top5.length - 1 ? `1px solid ${C.grid}` : 'none'
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            minWidth: 0,
            flex: 1
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }
        }, isBest && /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: MONO,
            fontSize: 8,
            fontWeight: 700,
            color: C.up,
            background: `${C.up}18`,
            padding: '2px 6px',
            borderRadius: 5
          }
        }, "ALL-TIME"), /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: F,
            fontSize: 13,
            fontWeight: 600,
            color: C.text
          }
        }, s.split)), /*#__PURE__*/React.createElement("div", {
          style: {
            fontFamily: MONO,
            fontSize: 9,
            color: C.dimmer,
            marginTop: 2
          }
        }, fmt(s.d), " · ", s.exCount, " exercises · ", s.sets, " sets · ", s.perSet, "/set")), /*#__PURE__*/React.createElement("div", {
          style: {
            fontFamily: MONO,
            fontSize: 14,
            fontWeight: 700,
            color: isBest ? C.up : C.accent,
            marginLeft: 12,
            whiteSpace: 'nowrap'
          }
        }, s.vol >= 1000 ? (s.vol / 1000).toFixed(1) + 't' : s.vol, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 9,
            color: C.dim,
            marginLeft: 2
          }
        }, "kg")));
      })), /*#__PURE__*/React.createElement(SectionLabel, null, "Best Session per Split"), /*#__PURE__*/React.createElement(Card, {
        style: {
          padding: '4px 0',
          overflow: 'hidden',
          marginBottom: 16
        }
      }, splitBests.map((s, i) => /*#__PURE__*/React.createElement("div", {
        key: s.split,
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '11px 16px',
          borderBottom: i < splitBests.length - 1 ? `1px solid ${C.grid}` : 'none'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          minWidth: 0,
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: F,
          fontSize: 13,
          fontWeight: 600,
          color: C.text
        }
      }, s.split), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: MONO,
          fontSize: 9,
          color: C.dimmer,
          marginTop: 2
        }
      }, fmt(s.d), " · ", s.sets, " sets")), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: MONO,
          fontSize: 14,
          fontWeight: 700,
          color: C.accent,
          marginLeft: 12,
          whiteSpace: 'nowrap'
        }
      }, s.vol >= 1000 ? (s.vol / 1000).toFixed(1) + 't' : s.vol, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 9,
          color: C.dim,
          marginLeft: 2
        }
      }, "kg"))))), topSet && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionLabel, null, "Heaviest Single Set"), /*#__PURE__*/React.createElement(Card, {
        style: {
          padding: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 16
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 52,
          height: 52,
          borderRadius: 14,
          background: `${C.up}14`,
          border: `1px solid ${C.up}33`,
          display: 'grid',
          placeItems: 'center'
        }
      }, /*#__PURE__*/React.createElement("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: C.up,
        strokeWidth: "2",
        strokeLinecap: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M6.5 6.5v11M9.5 8v8M14.5 8v8M17.5 6.5v11M3 10v4M21 10v4"
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: F,
          fontSize: 14,
          fontWeight: 700,
          color: C.text
        }
      }, topSet.ex), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: MONO,
          fontSize: 11,
          color: C.dim,
          marginTop: 3
        }
      }, fmt(topSet.d))), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: 'right'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: MONO,
          fontSize: 20,
          fontWeight: 700,
          color: C.up
        }
      }, topSet.wt, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12
        }
      }, "×", topSet.rp)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: MONO,
          fontSize: 10,
          color: C.warn,
          marginTop: 2
        }
      }, "e1RM ", topSet.e1rm)))));
    })());
  })(), nav === 'body' && (() => {
    const latest = INBODY[INBODY.length - 1],
      first = INBODY[0];
    const smmD = +(latest.smm - first.smm).toFixed(1);
    const anomDates = new Set(data.bodyAnomalies.map(a => a.d));
    // Build combined series with a gap marker: insert null between the 2023→2024 jump
    const GAP_THRESH = 180; // days
    const actual = [];
    let gapBand = null;
    for (let i = 0; i < INBODY.length; i++) {
      if (i > 0) {
        const g = Math.round((new Date(INBODY[i].d) - new Date(INBODY[i - 1].d)) / 86400000);
        if (g >= GAP_THRESH) gapBand = {
          x1: INBODY[i - 1].d,
          x2: INBODY[i].d
        };
      }
      actual.push(INBODY[i]);
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: 16,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(Stat, {
      label: "Weight",
      value: `${latest.wt}`,
      sub: "kg"
    }), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement(Stat, {
      label: "SMM",
      value: `${latest.smm}`,
      sub: "kg",
      accent: C.up
    }), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement(Stat, {
      label: "Body Fat",
      value: `${latest.pbf}`,
      sub: "%",
      accent: latest.pbf > 10 ? C.warn : C.up
    }), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement(Stat, {
      label: "SMM Δ",
      value: `+${smmD}`,
      sub: "all-time",
      accent: C.up
    })), (() => {
      const sch = inbodySchedule;
      const col = sch.overdue ? C.down : sch.dueSoon ? C.warn : C.accent;
      const pct = Math.max(0, Math.min(100, sch.sinceLastScan / inbodyInterval * 100));
      const R = 26,
        CIRC = 2 * Math.PI * R;
      return /*#__PURE__*/React.createElement(Card, {
        style: {
          padding: 16,
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement(SectionLabel, {
        right: `every ${inbodyInterval / 7 | 0}w`
      }, "Next InBody Scan"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 16
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: 'relative',
          width: 64,
          height: 64,
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("svg", {
        width: "64",
        height: "64",
        style: {
          transform: 'rotate(-90deg)'
        }
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "32",
        cy: "32",
        r: R,
        fill: "none",
        stroke: C.stroke,
        strokeWidth: "5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "32",
        cy: "32",
        r: R,
        fill: "none",
        stroke: col,
        strokeWidth: "5",
        strokeLinecap: "round",
        strokeDasharray: CIRC,
        strokeDashoffset: CIRC * (1 - pct / 100)
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          fontFamily: MONO,
          fontSize: 14,
          fontWeight: 700,
          color: col
        }
      }, sch.overdue ? '!' : Math.abs(sch.daysLeft))), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: F,
          fontSize: 16,
          fontWeight: 700,
          color: col
        }
      }, sch.overdue ? `Overdue ${Math.abs(sch.daysLeft)}d` : sch.daysLeft === 0 ? 'Due today' : `${sch.daysLeft} days left`), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: MONO,
          fontSize: 11,
          color: C.dim,
          marginTop: 3
        }
      }, "Due ", fmtY(sch.due)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: MONO,
          fontSize: 10,
          color: C.dimmer,
          marginTop: 1
        }
      }, "Last scan ", sch.sinceLastScan, "d ago"))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 6,
          marginTop: 14
        }
      }, [14, 21, 28, 42, 56].map(d => /*#__PURE__*/React.createElement("button", {
        key: d,
        onClick: () => updateScanInterval(d),
        style: {
          flex: 1,
          padding: '8px 0',
          borderRadius: 9,
          background: inbodyInterval === d ? C.accent : C.glass,
          border: `1px solid ${inbodyInterval === d ? 'transparent' : C.stroke}`,
          color: inbodyInterval === d ? '#fff' : C.dim,
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 600,
          cursor: 'pointer'
        }
      }, d / 7 | 0, "w"))));
    })(), data.bodyAnomalies.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 16
      }
    }, data.bodyAnomalies.map((a, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        padding: '9px 13px',
        marginBottom: 5,
        borderRadius: 10,
        background: `${a.sev === 'down' ? C.down : C.warn}12`,
        border: `1px solid ${a.sev === 'down' ? C.down : C.warn}33`,
        fontFamily: MONO,
        fontSize: 10,
        color: a.sev === 'down' ? C.down : C.warn
      }
    }, "⚠ ", fmtY(a.d), " — ", a.msg))), /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      right: `goal ${SMM_GOAL}kg SMM`
    }, "Weight · Muscle · Ideal"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 220
      }
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
      width: "100%",
      height: "100%"
    }, /*#__PURE__*/React.createElement(LineChart, {
      margin: {
        top: 5,
        right: 8,
        bottom: 0,
        left: -18
      }
    }, /*#__PURE__*/React.createElement(CartesianGrid, {
      stroke: C.grid,
      vertical: false
    }), gapBand && /*#__PURE__*/React.createElement(ReferenceArea, {
      x1: gapBand.x1,
      x2: gapBand.x2,
      fill: C.dimmer,
      fillOpacity: 0.07,
      label: {
        value: 'gap',
        position: 'insideTop',
        fill: C.dimmer,
        fontSize: 8,
        fontFamily: MONO
      }
    }), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "d",
      type: "category",
      allowDuplicatedCategory: false,
      tickFormatter: fmtY,
      tick: {
        fill: C.dimmer,
        fontSize: 8,
        fontFamily: MONO
      },
      axisLine: {
        stroke: C.stroke
      },
      tickLine: false,
      interval: "preserveStartEnd"
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: {
        fill: C.dimmer,
        fontSize: 10,
        fontFamily: MONO
      },
      axisLine: false,
      tickLine: false,
      domain: [22, 72]
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: ({
        active,
        payload,
        label
      }) => {
        if (!active || !payload?.length) return null;
        const an = anomDates.has(label);
        return /*#__PURE__*/React.createElement("div", {
          style: {
            background: C.bg2,
            border: `1px solid ${an ? C.down : C.stroke}`,
            borderRadius: 10,
            padding: '8px 11px',
            fontFamily: MONO,
            fontSize: 10,
            color: C.dim
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            color: an ? C.down : '#fff'
          }
        }, fmtY(label), an ? ' ⚠' : ''), payload.filter(p => p.value != null).map((p, i) => /*#__PURE__*/React.createElement("div", {
          key: i,
          style: {
            color: p.color
          }
        }, p.name, ": ", p.value, "kg")));
      }
    }), /*#__PURE__*/React.createElement(ReferenceLine, {
      y: SMM_GOAL,
      stroke: C.up,
      strokeDasharray: "5 4",
      strokeOpacity: 0.5
    }), /*#__PURE__*/React.createElement(Line, {
      data: actual,
      dataKey: "wt",
      name: "Weight",
      stroke: C.text,
      strokeWidth: 2,
      isAnimationActive: false,
      dot: pr => {
        const {
          cx,
          cy,
          payload
        } = pr;
        if (!cx) return null;
        const an = anomDates.has(payload.d);
        return /*#__PURE__*/React.createElement("circle", {
          cx: cx,
          cy: cy,
          r: an ? 5 : 3,
          fill: an ? C.down : C.text
        });
      }
    }), /*#__PURE__*/React.createElement(Line, {
      data: actual,
      dataKey: "smm",
      name: "SMM",
      stroke: C.up,
      strokeWidth: 2,
      dot: {
        r: 3,
        fill: C.up
      },
      isAnimationActive: false
    }), /*#__PURE__*/React.createElement(Line, {
      data: IDEAL,
      dataKey: "smm",
      name: "Ideal SMM",
      stroke: C.up,
      strokeWidth: 1.5,
      strokeDasharray: "5 4",
      strokeOpacity: 0.6,
      dot: false,
      isAnimationActive: false
    }), /*#__PURE__*/React.createElement(Line, {
      data: IDEAL,
      dataKey: "wt",
      name: "Ideal Wt",
      stroke: C.text,
      strokeWidth: 1.5,
      strokeDasharray: "5 4",
      strokeOpacity: 0.4,
      dot: false,
      isAnimationActive: false
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 14,
        marginTop: 10,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Lg, {
      c: C.text,
      t: "Weight"
    }), /*#__PURE__*/React.createElement(Lg, {
      c: C.up,
      t: "SMM"
    }), /*#__PURE__*/React.createElement(Lg, {
      c: C.up,
      t: "Ideal",
      dash: true
    }), /*#__PURE__*/React.createElement(Lg, {
      c: C.down,
      t: "Anomaly",
      dot: true
    }))), /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "Body Fat %"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 160
      }
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
      width: "100%",
      height: "100%"
    }, /*#__PURE__*/React.createElement(LineChart, {
      data: INBODY,
      margin: {
        top: 5,
        right: 8,
        bottom: 0,
        left: -18
      }
    }, /*#__PURE__*/React.createElement(CartesianGrid, {
      stroke: C.grid,
      vertical: false
    }), /*#__PURE__*/React.createElement(ReferenceArea, {
      y1: 8,
      y2: 12,
      fill: C.up,
      fillOpacity: 0.06
    }), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "d",
      tickFormatter: fmtY,
      tick: {
        fill: C.dimmer,
        fontSize: 8,
        fontFamily: MONO
      },
      axisLine: {
        stroke: C.stroke
      },
      tickLine: false,
      interval: "preserveStartEnd"
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: {
        fill: C.dimmer,
        fontSize: 10,
        fontFamily: MONO
      },
      axisLine: false,
      tickLine: false,
      domain: [5, 16]
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: ({
        active,
        payload,
        label
      }) => {
        if (!active || !payload?.length) return null;
        const v = payload[0]?.value;
        return /*#__PURE__*/React.createElement("div", {
          style: {
            background: C.bg2,
            border: `1px solid ${C.stroke}`,
            borderRadius: 10,
            padding: '7px 10px',
            fontFamily: MONO,
            fontSize: 10,
            color: v >= 8 && v <= 12 ? C.up : v > 12 ? C.warn : C.dim
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            color: '#fff'
          }
        }, fmtY(label)), "PBF ", v, "%");
      }
    }), /*#__PURE__*/React.createElement(Line, {
      type: "monotone",
      dataKey: "pbf",
      stroke: C.warn,
      strokeWidth: 2,
      isAnimationActive: false,
      dot: {
        r: 3,
        fill: C.warn
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: MONO,
        fontSize: 9,
        color: C.dimmer,
        marginTop: 8
      }
    }, "shaded band = optimal 8–12%")), /*#__PURE__*/React.createElement(SectionLabel, null, "Scan History"), /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: '4px 0',
        overflow: 'hidden'
      }
    }, [...INBODY].reverse().map((s, i) => {
      const prev = i < INBODY.length - 1 ? [...INBODY].reverse()[i + 1] : null;
      const sd = prev ? +(s.smm - prev.smm).toFixed(1) : 0;
      const an = anomDates.has(s.d);
      return /*#__PURE__*/React.createElement("div", {
        key: s.d,
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '11px 16px',
          borderBottom: i < INBODY.length - 1 ? `1px solid ${C.grid}` : 'none',
          background: an ? `${C.down}08` : 'transparent'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: MONO,
          fontSize: 12,
          color: an ? C.down : C.text
        }
      }, fmtY(s.d), an ? ' ⚠' : ''), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 14
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: MONO,
          fontSize: 12,
          color: C.dim,
          width: 42,
          textAlign: 'right'
        }
      }, s.wt, "kg"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: MONO,
          fontSize: 12,
          fontWeight: 700,
          color: sd >= 0 ? C.up : C.down,
          width: 54,
          textAlign: 'right'
        }
      }, s.smm, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 8,
          marginLeft: 2
        }
      }, prev ? sd >= 0 ? `+${sd}` : sd : '')), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: MONO,
          fontSize: 11,
          color: s.pbf > 12 ? C.warn : C.dim,
          width: 34,
          textAlign: 'right'
        }
      }, s.pbf, "%")));
    })));
  })()), !inWorkout && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '0 12px 12px',
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      background: 'rgba(16,20,28,0.72)',
      backdropFilter: 'blur(24px) saturate(160%)',
      WebkitBackdropFilter: 'blur(24px) saturate(160%)',
      border: `1px solid ${C.strokeHi}`,
      borderRadius: 28,
      padding: '8px 10px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      maxWidth: 560,
      width: '100%'
    }
  }, NAV.map(n => {
    const active = nav === n.id;
    const isCenter = n.id === 'workout';
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      onClick: () => {
        setNav(n.id);
        if (n.id === 'workout') setWkPhase('select');
      },
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '8px 4px',
        background: active && !isCenter ? 'rgba(110,139,255,0.16)' : 'transparent',
        border: 'none',
        borderRadius: 18,
        cursor: 'pointer'
      }
    }, isCenter ? /*#__PURE__*/React.createElement("div", {
      style: {
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: C.accent,
        display: 'grid',
        placeItems: 'center',
        marginTop: -2,
        boxShadow: `0 6px 18px ${C.accent}66`
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "workout",
      size: 22,
      color: "#fff"
    })) : /*#__PURE__*/React.createElement(Icon, {
      name: n.icon,
      size: 21,
      color: active ? C.accent : C.dim
    }), !isCenter && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: F,
        fontSize: 10.5,
        fontWeight: active ? 700 : 500,
        color: active ? C.accent : C.dim
      }
    }, n.label), isCenter && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: F,
        fontSize: 10.5,
        fontWeight: 600,
        color: C.dim
      }
    }, n.label));
  }))));
}
window.__App = FlightDeckV2;