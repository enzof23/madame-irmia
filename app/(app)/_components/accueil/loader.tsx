export default function DashboardRecent() {
  return (
    <div className="animate-pulse flex flex-col gap-y-4">
      <div className="flex justify-start pl-2 text-primary-30 text-lg font-spectral font-semibold items-center h-[32px]">
        Chargement de l'historique...
      </div>

      <div className="flex gap-3 flex-wrap justify-center md:justify-start">
        <div className="animate-card h-[172px] max-w-[352px] flex-1 rounded-lg bg-neutral-800" />
        <div className="animate-card h-[172px] max-w-[352px] flex-1 rounded-lg bg-neutral-800" />
      </div>
    </div>
  );
}
