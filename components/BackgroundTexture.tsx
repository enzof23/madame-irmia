export default function BackgroundTexture() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 -z-10">
      <div className="absolute top-[10%] right-[15%] hidden h-[123px] w-[123px] animate-grow rounded-full bg-primary-80 blur-[83px] sm:block" />
      <div className="absolute -bottom-28 -left-24 h-[260px] w-[260px] animate-grow rounded-full bg-primary-80 blur-[222px]" />
      <div className="absolute -bottom-[35%] -right-[15%] hidden h-[450px] w-[450px] animate-grow rounded-full bg-primary-80 blur-[222px] xl:block 2xl:-bottom-[25%] 2xl:-right-[5%]" />
    </div>
  );
}
