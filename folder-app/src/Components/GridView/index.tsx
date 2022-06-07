import React from 'react';
import styled from 'styled-components';

import Document from '../Document';
import { ViewProps } from '../FileFolderView';

const Container = styled.div`
  display: flex;
  gap: 1em;
  margin: 1em;
`;

const Label = styled.div`

`;

const GridView = (props: ViewProps) => {
  const {files, folders, handleFileClick, handleFolderClick, selected} = props;
  return (
    <div>
      <Label> Folder </Label>
      <Container>
        {
          folders.map(folder => 
            <Document
              key={folder.name} 
              isSelected={selected?.name === folder.name}
              name={folder.name}
              handleClick={handleFolderClick}
              isFolder={true} />
          )
        }
      </Container>
      
      <Label> Files </Label>
      <Container>
        {
          files.map(file => 
            <Document
              key={file.name} 
              isSelected={selected?.name === file.name}
              name={file.name}
              handleClick={handleFileClick}
              isFolder={false} />
          )
        }
      </Container>
    </div>
  );
};

export default GridView;