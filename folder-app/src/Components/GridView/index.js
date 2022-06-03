import styled from 'styled-components';

import Document from '../Document';

const Container = styled.div`
  display: flex;
  gap: 1em;
  margin: 1em;
`;

const Label = styled.div`

`;

const GridView = (props) => {
  const {files, folders, handleFileClick, handleFolderClick, selected} = props;
  return (
    <div>
      <Label> Folder </Label>
      <Container>
        {
          folders.map(folder => 
            <Document
              key={folder.name} 
              isSelected={selected && selected.name === folder.name}
              name={folder.name}
              handleClick={handleFolderClick}
              isFolder={true}>
            </Document>
          )
        }
      </Container>
      
      <Label> Files </Label>
      <Container>
        {
          files.map(file => 
            <Document
              key={file.name} 
              isSelected={selected && selected.name === file.name}
              name={file.name}
              handleClick={handleFileClick}
              isFolder={false}>
            </Document>
          )
        }
      </Container>
    </div>
  );
};

export default GridView;