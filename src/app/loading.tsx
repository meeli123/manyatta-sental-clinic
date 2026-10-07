import { LogoMark } from "@/components/ui";

export default function Loading() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="flex flex-col items-center gap-5">
        <span className="animate-pulse">
          <LogoMark className="size-12 rounded-2xl" />
        </span>
        <p className="text-[0.7rem] font-semibold tracking-[0.3em] text-muted uppercase">
          Manyatta Dental
        </p>
      </div>
    </div>
  );
}
