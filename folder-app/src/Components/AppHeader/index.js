import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr 2fr;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Filter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppHeader = () => (
  <HeaderContainer>
    <Logo>Logo here</Logo>
    <Filter>Search here</Filter>
    <User>User info here</User>
  </HeaderContainer>
);

export default AppHeader;