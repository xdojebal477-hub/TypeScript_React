import type { BookLog } from "../types";
import { BookLogCard } from "./BookLogCard";
import { InboxIcon } from "@heroicons/react/24/outline";

export interface BookLogProps {
  items: BookLog[];
  onDelete: (id: string) => void;
}

const BookLogList = ({ items, onDelete }: BookLogProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <InboxIcon className="w-12 h-12 mx-auto mb-3 text-violet-500/40" />
        <p className="text-sm font-medium text-slate-400">
          No hay libros todavía.
        </p>
        <p className="text-xs mt-1 text-slate-600">
          ¡Añade uno con el formulario de arriba!
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((book) => (
        <BookLogCard key={book.id} data={book} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BookLogList;
