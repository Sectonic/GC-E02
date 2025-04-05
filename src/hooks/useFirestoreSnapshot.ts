import { useState, useEffect } from 'react';
import { collection, query, QueryConstraint, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/src/firebase/config';
import Toast from 'react-native-toast-message';

export function useFirestoreSnapshot<T = DocumentData>(
  path: string | string[],
  constraints: QueryConstraint[] = [],
  dependencies: any[] = []
) {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    if (dependencies.some(value => !value)) return;

    let collectionPath: string;
    if (Array.isArray(path)) {
      collectionPath = path.join('/');
    } else {
      collectionPath = path;
    }
    
    const collectionRef = collection(db, collectionPath);
    const queryRef = query(collectionRef, ...constraints);

    const unsubscribe = onSnapshot(
      queryRef, 
      (snapshot) => {
        const documents = snapshot.docs.map(doc => doc.data() as T);
        setData(documents);
      },
      (error) => {
        Toast.show({
          type: 'error',
          text1: 'App error',
          text2: `Error listening to ${collectionPath}`
        });
        console.error(`Error listening to ${collectionPath}:`, error);
      }
    );

    return () => unsubscribe();
  }, [...dependencies]);

  return { data };
}
