import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { signInUser, userSelector } from '../../redux/userSlice';
import { USERNAME, PASSWORD } from '../../constants';

const LoginContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  margin: 1em;
`;

const FormContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const StyledForm = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
`;

const StyledInput = styled.input`
  margin-left: 5px;
`;

const ButtonContainer = styled.div`
  /* align-items: center;
  display: flex;
  justify-content: center; */
`

const Status = styled.div`
  display: ${props => props.isFetching ? 'block': 'none'};
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  // const location = useLocation();
  const navigate = useNavigate();
  const { isError, isFetching, isSuccess, errorMessage } = useSelector(userSelector);
  // const to = location.state?.from?.pathname || '/';
  const to = '/';

  const login = () => {
    dispatch(signInUser({username, password}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // validation checks for inputs
    login();
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (isError) {
      console.log(errorMessage);
    }

    if (isSuccess) {
      navigate(to, {replace: true});
    }
  }, [errorMessage, to, isError, isSuccess, navigate]);

  return (
    <LoginContainer>
      <h1>Login Form</h1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <div>
            <label htmlFor={USERNAME}>Username</label>
            <StyledInput 
                name={USERNAME} 
                value={username} 
                type='text' 
                onChange={updateUsername}
            />
          </div>
          <div>
            <label htmlFor={PASSWORD}>Password</label>
            <StyledInput 
              name={PASSWORD} 
              value={password} 
              type='password' 
              onChange={updatePassword}
            />
          </div>
          <ButtonContainer>
            <button type='submit' disabled={isFetching}>Submit</button>
          </ButtonContainer>
        </StyledForm>
      </FormContainer>
      <Status isFetching={isFetching}>Login in progress</Status>
    </LoginContainer>
  );
};

export default Login;


