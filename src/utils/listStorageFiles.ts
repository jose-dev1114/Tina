import { ref, listAll } from 'firebase/storage';
import { storage } from '../lib/firebase';

/**
 * List all files in the recordings folder
 */
export const listRecordingFiles = async () => {
  try {
    const recordingsRef = ref(storage, 'recordings/');
    const result = await listAll(recordingsRef);

    console.log('📁 Files in recordings folder:');
    console.log('Total files:', result.items.length);

    const fileNames = result.items.map(item => {
      console.log('  -', item.name);
      return item.name;
    });

    return fileNames;
  } catch (error) {
    console.error('❌ Error listing files:', error);
    return [];
  }
};

/**
 * List ALL folders and files in root storage
 */
export const listAllStorageContents = async () => {
  try {
    const rootRef = ref(storage, '/');
    const result = await listAll(rootRef);

    console.log('🗂️ ROOT STORAGE CONTENTS:');
    console.log('='.repeat(50));

    console.log('\n📁 Folders:', result.prefixes.length);
    result.prefixes.forEach(folder => {
      console.log('  📂', folder.name);
    });

    console.log('\n📄 Files in root:', result.items.length);
    result.items.forEach(item => {
      console.log('  📄', item.name);
    });

    // List contents of each folder
    for (const folderRef of result.prefixes) {
      console.log(`\n📂 Contents of "${folderRef.name}":`);
      try {
        const folderResult = await listAll(folderRef);
        console.log(`   Files: ${folderResult.items.length}`);
        folderResult.items.forEach(item => {
          console.log('     -', item.name);
        });
        console.log(`   Subfolders: ${folderResult.prefixes.length}`);
        folderResult.prefixes.forEach(subfolder => {
          console.log('     📁', subfolder.name);
        });
      } catch (err) {
        console.error(`   ❌ Error listing folder:`, err);
      }
    }

    console.log('\n' + '='.repeat(50));

    return {
      folders: result.prefixes.map(p => p.name),
      files: result.items.map(i => i.name)
    };
  } catch (error) {
    console.error('❌ Error listing storage:', error);
    return { folders: [], files: [] };
  }
};

