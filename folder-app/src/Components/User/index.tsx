// import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 1em;
`;

// TODO: have to handle token expiration automatically
const User = () => {
  // const navigate = useNavigate();
  // const handleClick = () => {
  //   localStorage.clear();
  //   navigate('/login');
  // };

  return (
    <StyledContainer>
      <div>User info here</div>
      <div>
        Logout here
        {/* <Button 
          shape='round' 
          onClick={handleClick}>
          Logout
        </Button> */}
      </div>
    </StyledContainer>
  )
};

export default User;

