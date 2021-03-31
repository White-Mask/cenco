import React, { useEffect, useState } from 'react';

//css
import { makeStyles, CssBaseline } from '@material-ui/core';
import './login.css';

//material-ui widget
import { Box, TextField, Button, Grid, Paper, Typography, Avatar } from '@material-ui/core';

//Background
import Logo from '../../static/easy.logo.new.png';

//Efecto loading
import CircularProgress from '@material-ui/core/CircularProgress';

//API
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginAccion } from '../../redux/authDucks';
import { Controls } from '../../components/controls/Controls';
import { insertarLogsAccion } from '../../redux/logsDucks';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      © 2017 | Easy todos los derechos reservados
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    width: theme.spacing(14),
    height: theme.spacing(14),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
    backgroundColor: '#7408A7',
    '&:hover': {
      backgroundColor: '#5F169B ',
    },
  },
  titulo: {
    color: '#7408A7',
  },
  loading: {
    margin: theme.spacing(2),
  }
}));

const SignIn = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [username, setUsuario] = useState('');
  const [password, setContraseña] = useState('');
  const [Loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  const User = useSelector(store => store.auth.user);
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const Message = useSelector(store => store.auth.message);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim()) {
      console.log("Debe ingresar el usuario")
      return
    }

    if (!password.trim()) {
      console.log("Debe ingresar la contraseña")
      return
    }

    setLoading(true)
    dispatch(loginAccion(username, password))
    setLoading(false)
  }

  useEffect(() => {
    if (Message !== undefined) {
      setNotify({
        isOpen: true,
        message: Message.text,
        type: Message.icon
      })
    }
    if (isLoggedIn) {
      dispatch(insertarLogsAccion(User[0].Username, "Login", 1, `Iniciar sesión`))
      props.history.push('/')
    }
  }, [User, Message, isLoggedIn, dispatch, props.history])

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className='image' />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>

          <Avatar className={classes.avatar} src={Logo} />

          <Typography component="h1" variant="h5" className={classes.titulo}>
            Monitor Operaciones Easy Chile
          </Typography>

          <form className={classes.form} onSubmit={e => handleSubmit(e)}>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              disabled={Loading ? true : false}
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={e => setUsuario(e.target.value)}
              value={username}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              disabled={Loading ? true : false}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setContraseña(e.target.value)}
              value={password}
            />
            {
              Loading === false ?
                <Button type="submit" fullWidth variant="contained" color='primary'>
                  Sign In
                </Button>
                :
                <div>
                  <Grid container justify="center" alignItems="center">
                    <CircularProgress className={classes.loading} />
                  </Grid>
                </div>
            }

            {
              <Controls.Notification
                notify={notify}
                setNotify={setNotify}
              />
            }
            <Box mt={5}>
              <Copyright />
            </Box>

          </form>

        </div>

      </Grid>
    </Grid>
  );
}

export default withRouter(SignIn);