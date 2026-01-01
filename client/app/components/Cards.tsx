"use client";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface characters {
    bgColor: string;
    integer: number;
    text: string;
    image: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
}

export default function Cards({bgColor, integer, text, image}:characters ){
    const Icon = image;
        
    return(
       <section className={`${bgColor} rounded-xl p-4 shadow-md`}>
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center bg-white/40 rounded-full p-3">
                    <Icon sx={{ fontSize: 36, color: "#16A34A", opacity: 0.9 }} />
                </div>
                <div>
                    <p className="text-gray-600 text-xs font-medium">{text}</p>
                    <h2 className="text-xl font-bold text-gray-900">{integer}</h2>
                </div>
            </div>
        </section>

    )
}