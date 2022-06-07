import React from 'react';
import styled from 'styled-components';

import Document from '../Document';
import { ViewProps } from '../FileFolderView';

const ListViewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemContainer = styled.div`
`;

// const FolderContainer = styled.div`
// `;

// const FileContainer = styled.div`
// `;

const ListView = (props: ViewProps) => {
  const {files, folders, handleFileClick, handleFolderClick, selected} = props;
  return (
    <ListViewContainer>
        {
          folders.map(folder => 
            <ItemContainer key={folder.name}>
              <Document
                isSelected={selected?.name === folder.name}
                name={folder.name}
                handleClick={handleFolderClick}
                isFolder={true} />
            </ItemContainer>
          )
        }
        {
          files.map(file => 
            <ItemContainer key={file.name}>
              <Document
                isSelected={selected?.name === file.name}
                name={file.name}
                handleClick={handleFileClick}
                isFolder={false} />
            </ItemContainer>
          )
        }
    </ListViewContainer>
  );
};

export default ListView;