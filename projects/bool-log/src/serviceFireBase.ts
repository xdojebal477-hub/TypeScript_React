import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import type { BookLog } from "./types";

const COLLECTION_NAME = "books";

export async function getBooks(): Promise<BookLog[]> {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME)); //pedimos todos loos docs

  const booklogs: BookLog[] = []; //ahora transformamos los docs de firebase en datos de nuesstros tipos
  querySnapshot.forEach((docSnap) => {
    booklogs.push({
      id: docSnap.id,
      ...(docSnap.data() as Omit<BookLog, "id">),
    });
  });

  return booklogs;
}

//omitimos el atributo que en este caso es el id ya que firebase nos genera uno
export async function addBookLog(booklog:Omit<BookLog,"id">):Promise<string>{
    const docRef = await addDoc(collection(db,COLLECTION_NAME),booklog)
    return docRef.id;
}

export async function deleteBookLog(id:string):Promise<void> {
    const docRef= doc(db,COLLECTION_NAME,id);
    return deleteDoc(docRef);
    
}