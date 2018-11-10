import styled from 'react-emotion';

export type Props = {
  black?: boolean,
};

export default styled('div')(({ black }: Props) => ({
  backgroundColor: black ? 'black' : 'white',
  color: black ? 'white' : 'black',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
