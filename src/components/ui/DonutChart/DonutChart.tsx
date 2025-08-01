import React from 'react';
import {PieChart, Pie, Cell} from 'recharts';
import './DonutChart.scss';
import ListGroup from '../listGroup/listGroup';

interface DonutChartProps {
    data: {
        name: string;
        value: number;
        color: string;
    }[];
}

const DonutChart: React.FC<DonutChartProps> = ({data}) => {
    return (
        <div className="donut-chart">
            <PieChart className="donut-chart__wrapper" width={240} height={240}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent"/>
                    ))}
                </Pie>
            </PieChart>
            <ListGroup>
                {data.map(({name, value, color}, index) => (
                    <ListGroup.Item key={index} className="donut-chart__legend-item">
                        <span className="donut-chart__legend-item-color" style={{backgroundColor: color}}></span>
                        <span className="donut-chart__legend-item-label">{name}</span>
                        <span className="donut-chart__legend-item-value">{value}</span>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default DonutChart;