import { useState, useEffect } from 'react';
import { collection, query, QueryConstraint, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/src/firebase/config';
import Toast from 'react-native-toast-message';

export function useFirestoreSnapshot<T = DocumentData>(
  path: string[],
  constraints: QueryConstraint[] = [],
  dependencies: any[] = []
) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    if (dependencies.some(value => !value)) return;

    const collectionPath = path.join('/');
    const collectionRef = collection(db, collectionPath);
    const queryRef = query(collectionRef, ...constraints);

    const unsubscribe = onSnapshot(
      queryRef, 
      (snapshot) => {
        const documents = snapshot.docs.map(doc => doc.data() as T);
        setData(documents);
        setIsLoading(false);
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

  return { data, isLoading };
}
