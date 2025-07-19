import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { ArtoEnType, EnToArType } from "./types/type";

export async function addBookmark(wordData: ArtoEnType | EnToArType) {
  const user = auth.currentUser;

  if (!user || typeof wordData === "string") return;

  const uid = user.uid;
  if (isEnToArType(wordData)) {
    await addDoc(collection(db, "users", uid, "bookmarkWords"), {
      arWord: wordData.arabicTranslation,
      enWord: wordData.englishWord,
      wordType: wordData.type,
      rootWord: wordData.root,
      rootWordExplanation: wordData.rootExplanation,
      rootRelatedWords: wordData.relatedRoots,
      examples: wordData.examples,
    });
  } else {
    await addDoc(collection(db, "users", uid, "bookmarkWords"), {
      arWord: wordData.searchWithHarakat,
      enWord: wordData.translation,
      wordType: wordData.type,
      rootWord: wordData.root,
      rootWordExplanation: wordData.rootExplanation,
      rootRelatedWords: wordData.relatedWords,
      examples: wordData.examples,
    });
  }
}

//   --- remove bookmark word ---

export async function removeBookmark(wordData: ArtoEnType | EnToArType) {
  const user = auth.currentUser;
  if (!user) return;
  const uid = user.uid;
  const bookmarkRef = collection(db, "users", uid, "bookmarkWords");
  let q;
  if (isEnToArType(wordData)) {
    q = query(
      bookmarkRef,
      where("arWord", "==", wordData.arabicTranslation),
      where("enWord", "==", wordData.englishWord)
    );
  } else {
    q = query(
      bookmarkRef,
      where("arWord", "==", wordData.searchWithHarakat),
      where("enWord", "==", wordData.translation)
    );
  }
  const snapshot = await getDocs(q);

  snapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
}

//   --- checking type of wordData ---
function isEnToArType(data: ArtoEnType | EnToArType): data is EnToArType {
  return (
    "arabicTranslation" in data && typeof data.arabicTranslation === "string"
  );
}

export function removeBookmarkWithId(id:string){
  const user = auth.currentUser;
  if (!user) return;
  const uid = user.uid;
  const bookmarkRef = collection(db, "users", uid, "bookmarkWords");
  const docRef = doc(bookmarkRef, id);
  deleteDoc(docRef);
}
