import type { BookLog } from "../types";
import { BookLogCard } from "./BookLogCard";

export interface BookLogProps {
  items: BookLog[];
  onDelete: (id: string)=>void;
}

const BookLogList = ({ items, onDelete }: BookLogProps) => {
  if (items.length === 0) {
    return (
      <div className="alert alert-info">No hay logs de libros recientes</div>
    );
  }
  return (
    <div className="grid">
      {items.map((book) => (
        // La prop 'key' es obligatoria en listas de React
        <BookLogCard key={book.id} data={book} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BookLogList;
