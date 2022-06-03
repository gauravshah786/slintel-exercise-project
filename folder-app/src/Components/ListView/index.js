import styled from 'styled-components';

import Document from '../Document';

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

const ListView = (props) => {
  const {files, folders, handleFileClick, handleFolderClick, selected} = props;
  return (
    <ListViewContainer>
        {
          folders.map(folder => 
            <ItemContainer key={folder.name}>
              <Document
                isSelected={selected === folder.name}
                name={folder.name}
                handleClick={handleFolderClick}
                isFolder={true}>
              </Document>
            </ItemContainer>
          )
        }
        {
          files.map(file => 
            <ItemContainer key={file.name}>
              <Document
                isSelected={selected === file.name}
                name={file.name}
                handleClick={handleFileClick}
                isFolder={false}>
              </Document>
            </ItemContainer>
          )
        }
    </ListViewContainer>
  );
};

export default ListView;