## learning

- npm i chart.js react-chartjs-2
- new way of accessing obj prop value let a={ name:"naim"} a.name,a[name]
- chakra ui new properties:
  radiogroup>stack>radio,
  stat>statLabel|statnumber|stathelptext>statarro
  badge

- chart

```
import { Line } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement,LineElement,Title, Tooltip,Legend } from "chart.js";
ChartJS.register(
	CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
);
```
we need three thing in this arr, currency and day we will pass in props