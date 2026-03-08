import { Pencil, Eraser, Trash2, Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const palette = [
  "#3B82F6",
  "#10B981",
  "#EF4444",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#E5E7EB",
];

export default function WhiteBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  const penPickerRef = useRef<HTMLInputElement | null>(null);
  const bgPickerRef = useRef<HTMLInputElement | null>(null);

  const [color, setColor] = useState("#3B82F6");
  const [bgColor, setBgColor] = useState("#0f172a");
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [size, setSize] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  const getCtx = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = getCtx();
    if (!ctx) return;

    isDrawing.current = true;

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctx.lineWidth = size;
    ctx.lineCap = "round";

    if (tool === "pen") {
      ctx.strokeStyle = color;
      ctx.globalCompositeOperation = "source-over";
    } else {
      ctx.globalCompositeOperation = "destination-out";
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;

    const ctx = getCtx();
    if (!ctx) return;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDraw = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex-1 flex flex-col border border-[#1e293b] rounded-xl overflow-hidden">
      <div className="flex items-center px-4 py-2 gap-4 border-b border-[#1e293b] bg-[#0f172a]">
        <div className="flex gap-2">
          {palette.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full border transition
              ${color === c ? "border-white scale-110" : "border-transparent hover:scale-110"}`}
              style={{ backgroundColor: c }}
            />
          ))}

          <button
            onClick={() => penPickerRef.current?.click()}
            className="w-6 h-6 rounded border border-white/40 hover:scale-110 transition"
            style={{ backgroundColor: color }}
            title="펜 색상"
          />

          <input
            ref={penPickerRef}
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className="hidden"
          />
        </div>

        <div className="w-px h-6 bg-[#1e293b]" />

        <div className="flex gap-2">
          <button
            onClick={() => setTool("pen")}
            className={`p-2 rounded transition
            ${
              tool === "pen"
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:bg-[#1e293b]"
            }`}
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => setTool("eraser")}
            className={`p-2 rounded transition
            ${
              tool === "eraser"
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:bg-[#1e293b]"
            }`}
          >
            <Eraser size={16} />
          </button>
        </div>

        <div className="w-px h-6 bg-[#1e293b]" />

        <div className="flex items-center gap-2 text-gray-300">
          <button
            onClick={() => setSize(s => Math.max(1, s - 1))}
            className="p-1 hover:bg-[#1e293b] rounded"
          >
            <Minus size={16} />
          </button>

          <input
            type="number"
            value={size}
            min={1}
            max={20}
            onChange={e => {
              let value = Number(e.target.value);
              if (isNaN(value)) return;
              value = Math.max(1, Math.min(20, value));
              setSize(value);
            }}
            className="w-8 text-center text-sm bg-transparent outline-none"
          />

          <button
            onClick={() => setSize(s => Math.min(20, s + 1))}
            className="p-1 hover:bg-[#1e293b] rounded"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="w-px h-6 bg-[#1e293b]" />

        <button
          onClick={() => bgPickerRef.current?.click()}
          className="w-6 h-6 rounded border border-white/40 hover:scale-110 transition"
          style={{ backgroundColor: bgColor }}
          title="배경 색상"
        />

        <input
          ref={bgPickerRef}
          type="color"
          value={bgColor}
          onChange={e => setBgColor(e.target.value)}
          className="hidden"
        />

        <button
          onClick={clearCanvas}
          className="ml-auto text-red-400 hover:bg-red-500/20 p-2 rounded"
          title="전체 지우기"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex-1" style={{ backgroundColor: bgColor }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
        />
      </div>
    </div>
  );
}
