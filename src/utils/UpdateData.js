const UpdateData = (root, id, fileName, isFolder) => {
  const findFolderById = (root, id) => {
    if (root.id === id) {
      return root;
    }
    if (root.children) {
      for (const child of root.children) {
        const folder = findFolderById(child, id);
        if (folder) {
          return folder;
        }
      }
    }
    return null;
  };

  const addFileById = (root, parentId, fileName) => {
    const parentFolder = findFolderById(root, parentId);
    if (parentFolder) {
      const newFile = {
        name: fileName,
        type: "file",
        id: `${parentFolder.id}/${fileName}`,
      };
      if (!parentFolder.children) {
        parentFolder.children = [];
      }
      if(parentFolder.children.find(child=>(child.id===newFile.id&&child.type==="file")))
      return 'alreadyexists';
      parentFolder.children.push(newFile);
      parentFolder.children.sort(function(a,b){
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if(x>y){return 1;} 
        if(x<y){return -1;}
        return 0;
      });
      return root;
    }
    return null;
  };

  const addFolderById = (root, parentId, folderName) => {
    const parentFolder = findFolderById(root, parentId);
    if (parentFolder) {
      const newFolder = {
        name: folderName,
        type: "folder",
        id: `${parentFolder.id}/${folderName}`,
        children: [],
      };
      if (!parentFolder.children) {
        parentFolder.children = [];
      }
      if(parentFolder.children.find(child=>(child.id===newFolder.id&&child.type==="folder")))
      return 'alreadyexists';
      parentFolder.children.push(newFolder);
      parentFolder.children.sort(function(a,b){
           let x = a.name.toLowerCase();
           let y = b.name.toLowerCase();
           if(x>y){return 1;} 
           if(x<y){return -1;}
           return 0;
         });
      return root;
    }
    return null;
  };

  return isFolder
    ? addFolderById(root, id, fileName)
    : addFileById(root, id, fileName);
};

export default UpdateData;
