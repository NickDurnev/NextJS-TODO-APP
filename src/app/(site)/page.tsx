import EmptyState from "../components/EmptyState";
import TODOList from "../components/TODOList";

const mockTODO = [
  {
    id: "1",
    title: "TODO 1",
    description: "TODO 1 description",
    status: "DONE",
    priority: 1,
    createdAt: new Date(),
  },
];

export default function Home() {
  return (
    <main>
      <div className="w-full flex justify-center top-20 sm:top-4 text-center">
        {mockTODO.length > 0 ? <TODOList data={mockTODO} /> : <EmptyState />}
      </div>
    </main>
  );
}
