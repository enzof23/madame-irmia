export function TarotDisplayLoader() {
  return (
    <div className="animate-pulse h-[307px] rounded-lg p-[1px] gradient-right">
      <div className="flex flex-col gap-y-4 px-3 py-5 rounded-lg sm:grid bg-dark sm:grid-cols-[max-content_1fr] sm:gap-x-5">
        <div className="flex-1 bg-neutral-700 h-[265px] w-screen self-center max-w-[155px] rounded-lg" />
        <div className="flex-1 flex flex-col gap-y-3 bg-neutral-800 p-3 pr-5 rounded-lg">
          <div className="bg-neutral-700 max-h-8 mb-1 rounded-lg flex-1 max-w-[100%]" />
          <div className="bg-neutral-700 max-h-4 rounded-lg flex-1 max-w-[75%]" />
          <div className="bg-neutral-700 max-h-4 rounded-lg flex-1 max-w-[80%]" />
          <div className="bg-neutral-700 max-h-4 rounded-lg flex-1 max-w-[85%]" />
          <div className="bg-neutral-700 max-h-4 rounded-lg flex-1 max-w-[90%]" />
          <div className="bg-neutral-700 max-h-4 rounded-lg flex-1 max-w-[100%]" />
        </div>
      </div>
    </div>
  );
}

export function TarotQuestionLoader() {
  return (
    <div className="h-[98px] rounded-lg p-[1px] gradient-right">
      <div className="flex items-center animate-pulse pl-3 bg-dark h-full rounded-lg" />
    </div>
  );
}

export function TarotDateLoader() {
  return (
    <div className="text-primary-20 flex items-center gap-x-3 text-2xl font-spectral font-semibold">
      Chargement en cours...
    </div>
  );
}
