"use client";
import { SvgIconComponent } from "@mui/icons-material";

interface Characters {
  bgColor: string;
  integer: number;
  text: string;
  image: SvgIconComponent;
}

export default function Cards({
  bgColor,
  integer,
  text,
  image: Icon,
}: Characters) {
  return (
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
  );
}
