import { login, logout, startLogin, startLogout } from '../../actions/auth';

test('should generate login aciton object', () => {
  const uid = '1234'
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid: uid
  })
});

test('should generate logout aciton object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  })
});

