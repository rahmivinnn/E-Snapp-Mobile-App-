import { useState } from "react";
import { Header } from "@/components/Header";
import { EnergyTrendChart } from "@/components/EnergyTrendChart";
import { CO2Summary } from "@/components/CO2Summary";
import { motion } from "framer-motion";

const trendData = {
  day: [
    { name: "00:00", value: 2.5 },
    { name: "06:00", value: 3.2 },
    { name: "12:00", value: 4.8 },
    { name: "18:00", value: 4.2 },
  ],
  week: [
    { name: "Mon", value: 5.5 },
    { name: "Tue", value: 6.2 },
    { name: "Wed", value: 8.8 },
    { name: "Thu", value: 14.7 },
    { name: "Fri", value: 6.1 },
    { name: "Sat", value: 5.3 },
    { name: "Sun", value: 6.3 },
  ],
  month: [
    { name: "Week 1", value: 12.0 },
    { name: "Week 2", value: 14.0 },
    { name: "Week 3", value: 11.0 },
    { name: "Week 4", value: 15.9 },
  ],
  cycle: [
    { name: "Jul", value: 25.0 },
    { name: "Aug", value: 27.9 },
  ]
};

const comparisonData = [
  { period: "mon", amount: 5.5 },
  { period: "Tue", amount: 6.2 },
  { period: "Wed", amount: 8.8 },
  { period: "Thu", amount: 14.7 },
  { period: "Fri", amount: 6.1 },
  { period: "Sat", amount: 5.3 },
  { period: "Sun", amount: 6.3 },
];

const tabs = [
  { id: "energy", label: "Energy & CO₂" }
];

export const Trends = () => {
  const [activeTab, setActiveTab] = useState("energy");

  return (
    <motion.div 
      className="min-h-screen bg-background pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center justify-between p-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-xl font-semibold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >Energy Consumption</motion.h1>
        <motion.div 
          className="bg-primary rounded-full px-3 py-1 flex items-center space-x-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-primary-foreground text-sm font-medium">kWh</span>
          <span className="text-primary-foreground/60 text-sm">EUR</span>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="px-4 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <EnergyTrendChart
            data={trendData}
            total={52.9}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CO2Summary
            emitted={42.7}
            avoided={121.1}
          />
        </motion.div>
        
        {/* Comparison Cards */}
        <motion.div
          className="bg-card rounded-2xl p-4 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Compared to Previous</h3>
          
          <div className="grid grid-cols-3 gap-3">
            <motion.div 
              className="bg-primary-light rounded-lg p-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="text-sm text-muted-foreground mb-1">Energy Used</div>
              <div className="text-lg font-bold text-foreground">42.7 kWh</div>
              <div className="text-sm text-success">↑ +6%</div>
            </motion.div>
            
            <motion.div 
              className="bg-primary-light rounded-lg p-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="text-sm text-muted-foreground mb-1">Cost</div>
              <div className="text-lg font-bold text-foreground">€37.50</div>
              <div className="text-sm text-destructive">↓ -3.4%</div>
            </motion.div>
            
            <motion.div 
              className="bg-primary-light rounded-lg p-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <div className="text-sm text-muted-foreground mb-1">CO₂</div>
              <div className="text-lg font-bold text-foreground">42.7 kg</div>
              <div className="text-sm text-success">↑ +3.5%</div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Energy used this week */}
        <motion.div 
          className="bg-card rounded-2xl p-4 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="text-sm text-muted-foreground mb-2">Energy used</div>
          <div className="text-2xl font-bold text-foreground mb-4">18.7 kWh</div>
          
          <div className="grid grid-cols-7 gap-1">
            {comparisonData.map((day, index) => (
              <div key={day.period} className="text-center">
                <div 
                  className="bg-border rounded-sm mb-1 transition-all duration-300"
                  style={{ height: `${day.amount * 2}px` }}
                />
                <div className="text-xs text-muted-foreground capitalize">{day.period}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};