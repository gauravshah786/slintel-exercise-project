import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const DocumentContainer = styled.div`
  background-color: ${props => props.isSelected ? 'deepskyblue': ''};
  border: 1px solid grey;
  cursor: pointer;
  display: grid;
  grid-template-columns: 20% auto;
  /* margin: 5px; */
  width: 10%;
`;

const Label = styled.div`
  padding-left: 5px;
  display: flex;
  align-items: center;
  
  ::selection {
    background-color: unset;
    color: unset;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Document = (props) => {
  const { name, isSelected, handleClick, isFolder } = props;

  return (
    <DocumentContainer id={name} isSelected={isSelected} onClick={handleClick}>
      <Icon>
        <FontAwesomeIcon icon={isFolder ? faFolder : faFile} />
      </Icon>
      <Label>
        { name }
      </Label>
    </DocumentContainer>
  );
};

export default Document;