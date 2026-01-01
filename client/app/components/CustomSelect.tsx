import { useState, useRef, useEffect } from "react";

type CustomSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

export default function CustomSelect({
  label,
  value,
  options,
  onChange,
}: CustomSelectProps) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-36">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full border px-4 py-2 rounded-full text-left
          transition
          focus:outline-none
          focus:ring-2 focus:ring-[#1CB536]/40
          hover:border-[#1CB536]
          cursor-pointer
        "
      >
        <span className="filter-section">{label}</span>: <span className="text-green">{value}</span>
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="
                px-4 py-2 cursor-pointer
                transition
                hover:bg-[#1CB536]/10
                hover:text-[#1CB536]
              "
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
