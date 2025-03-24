import TiptapEditor from "@/components/tip-tap/editor";

export default function NewProductPage() {
  return (
    <main className="w-[min(calc(100%-2rem),_800px)] mx-auto mt-12">
      <section className="border border-gray-400 bg-accent rounded-lg p-6 space-y-10">
        <div className="flex flex-col gap-4">
          <button className="border w-fit px-4 py-2 rounded-md border-gray-300 bg-gray-50 hover:bg-transparent">
            Add a Cover Image
          </button>
          <input
            type="text"
            placeholder="New product title here..."
            className="border-none outline-none focus:outline-none focus:ring-0 text-3xl sm:text-4xl placeholder:text-gray-700 font-bold"
          />
          <input
            type="text"
            placeholder="Excerpt here..."
            className="border-none outline-none focus:outline-none focus:ring-0 text-xl"
          />
        </div>
        <TiptapEditor />
      </section>
    </main>
  );
}
