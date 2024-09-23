// firebase.d.ts
declare module 'firebase/app' {
  interface FirebaseOptions {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  }
}
 




declare module 'firebase/storage' {
  import { FirebaseApp } from 'firebase/app';
  
  interface FirebaseStorage {
    ref(path?: string): firebase.storage.Reference;
    refFromURL(url: string): firebase.storage.Reference;
  }

  // interface FullMetadata {
  //   FullMetadata(downloadTokens: string): firebase.storage.DownloadTokens;
  // }
  function getStorage(app?: FirebaseApp): FirebaseStorage;
}

export declare function getDownloadURL(ref: StorageReference): Promise<string>;

declare module 'firebase/storage' {
  export = firebase.storage;
}
