import React from 'react';

const GameWindow = ({ title, children, className = "", color = "green" }) => {
    const borderColor = {
        green: "border-green-500",
        red: "border-red-500",
        blue: "border-blue-500",
        yellow: "border-yellow-500",
        purple: "border-purple-500"
    }[color] || "border-green-500";

    const textColor = {
        green: "text-green-500",
        red: "text-red-500",
        blue: "text-blue-500",
        yellow: "text-yellow-500",
        purple: "text-purple-500"
    }[color] || "text-green-500";

    const bgColor = {
        green: "bg-green-500/10",
        red: "bg-red-500/10",
        blue: "bg-blue-500/10",
        yellow: "bg-yellow-500/10",
        purple: "bg-purple-500/10"
    }[color] || "bg-green-500/10";

    return (
        <div className={`relative border-2 ${borderColor} bg-gray-900/80 backdrop-blur-sm rounded-lg overflow-hidden flex flex-col ${className}`}>
            {/* Header Bar */}
            <div className={`${bgColor} border-b ${borderColor} p-2 flex justify-between items-center shrink-0`}>
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${bgColor.replace('/10', '')} animate-pulse`} />
                    <h3 className={`font-mono font-bold ${textColor} uppercase tracking-widest text-sm`}>
                        MISSION: {title}
                    </h3>
                </div>
                <div className="flex gap-1">
                    <div className={`w-2 h-2 ${borderColor} border`} />
                    <div className={`w-2 h-2 ${borderColor} border`} />
                    <div className={`w-2 h-2 ${bgColor.replace('/10', '')}`} />
                </div>
            </div>

            {/* Content Area with Scanline hint */}
            <div className="p-2 relative flex-1 min-h-0">
                {/* Corner Accents */}
                <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${borderColor} -mt-1 -ml-1`} />
                <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${borderColor} -mt-1 -mr-1`} />
                <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${borderColor} -mb-1 -ml-1`} />
                <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${borderColor} -mb-1 -mr-1`} />

                {children}
            </div>
        </div>
    );
};

export default GameWindow;
