export default function CourseLoading() {
  return (
    <main
      aria-label="Loading course"
      aria-busy="true"
      className="min-h-screen bg-[#f7f8fc] px-4 py-8 text-slate-900 sm:py-12"
    >
      <div className="mx-auto w-full animate-pulse sm:w-[90%] lg:w-[80%] motion-reduce:animate-none">
        <div className="h-5 w-28 rounded bg-slate-200" />
        <div className="mt-7 overflow-hidden rounded-[2rem] bg-white shadow-xl">
          <div className="h-64 bg-slate-200 sm:h-96" />
          <div className="space-y-5 p-7 sm:p-10 lg:p-14">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-10 w-3/4 rounded bg-slate-200" />
            <div className="h-4 w-full max-w-xl rounded bg-slate-200" />
            <div className="h-4 w-2/3 max-w-xl rounded bg-slate-200" />
            <div className="h-12 w-36 rounded-xl bg-slate-200" />
          </div>
        </div>
        <div className="mt-8 h-48 rounded-3xl bg-white" />
      </div>
    </main>
  );
}
