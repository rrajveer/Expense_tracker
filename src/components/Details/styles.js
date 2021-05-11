import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  income: {
    margin:"0px 20px",
    borderBottom: '10px solid rgba(0, 255, 0, 0.5)',
  },
  expense: {
    margin:"0px 20px",
    borderBottom: '10px solid rgba(255, 0, 0, 0.5)',
  },
}));