"use client";

import { Chart, registerables } from "chart.js";

// chart.js v3+ dropped the auto-registering default export CRA's v2 relied on;
// controllers/scales/elements must be registered explicitly once.
Chart.register(...registerables);

export default Chart;
