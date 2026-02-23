"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";

interface IRNewsProps {
    headline: string;
    stockPrice: string;
    stockChange: string;
    news: string[];
}

export const IRNews: React.FC<IRNewsProps> = ({ headline, stockPrice, stockChange, news }) => {

    // State for real-time data
    const [realTimeData, setRealTimeData] = React.useState<{ price: string; change: string } | null>(null);

    React.useEffect(() => {
        const fetchStock = async () => {
            try {
                const res = await fetch('/api/stock');
                if (res.ok) {
                    const data = await res.json();
                    if (data.price && data.change) {
                        setRealTimeData({
                            price: data.price,
                            change: data.change
                        });
                    }
                }
            } catch (error) {
                console.error("Failed to fetch stock data", error);
            }
        };

        fetchStock();
        // Refresh every minute
        const interval = setInterval(fetchStock, 60000);
        return () => clearInterval(interval);
    }, []);

    // Use real-time data if available, otherwise fallback to props
    const displayPrice = realTimeData?.price || stockPrice;
    const displayChange = realTimeData?.change || stockChange;

    return (
        <section className="py-24 bg-white">
            <div className="container max-w-[1600px] mx-auto px-6">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <span className="text-sm font-bold tracking-[0.2em] text-[#0055FF] uppercase">Market Info</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0F]">{headline}</h2>
                    </div>
                </div>

                <div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-6"
                    style={{ overflow: "hidden" }}
                >

                 
                    <div className="p-8 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 flex flex-col justify-between h-full relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors" />

                        <div>
                            <div className="flex items-center gap-2 text-blue-100 mb-4">
                                <TrendingUp size={20} />
                                <span className="text-sm font-bold uppercase tracking-wider">KOSDAQ: 032620</span>
                            </div>
                            <div className="text-4xl font-black text-white mb-2">{displayPrice}</div>
                            <div className="text-blue-200 font-medium flex items-center gap-1">
                                {displayChange} <span className="text-white/60 text-sm font-normal">vs yesterday</span>
                            </div>
                        </div>
                        <p className="text-white/40 text-sm mt-8">Prices delayed by 15 mins</p>
                    </div>

                    {/* News List */}
                    <div className="lg:col-span-2 space-y-4">
                        {news.map((item, idx) => (
                            <motion.a
                                key={idx}
                                href="#"
                                className="block p-6 rounded-[16px] bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all group"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: idx * 0.06, ease: "easeOut" }}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors truncate pr-8">
                                        {item}
                                    </span>
                                    <ArrowUpRight size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
                                </div>
                                    <span className="text-slate-400 text-sm mt-2 block">2024.10.{24 - idx}</span>
                                </motion.a>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};
