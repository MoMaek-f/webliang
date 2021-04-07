import React, { useState } from 'react';
import * as echarts from 'echarts'
import Echarts from './e-charts'

export default function Index() {
  const [count, setCount] = useState(0);


  return (
    <div>
      <Echarts/>
    </div>
  );
}