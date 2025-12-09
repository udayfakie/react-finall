import { useFormik } from 'formik';
import { FunctionComponent } from 'react';
import * as yup from 'yup';
import { checkUser } from '../service/usersService';
import { Link, useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required('Email required')
        .email('Invalid email')
        .min(5),
      password: yup.string().required('Password required').min(7).max(20),
    }),
    onSubmit: async (values) => {
      try {
        const res = await checkUser({
          email: values.email,
          password: values.password,
        });
        if (res.status === 200) {

          sessionStorage.setItem(
            'userDetails',
            JSON.stringify(jwt_decode.jwtDecode(res.data))
          );
          sessionStorage.setItem('token', res.data);
          navigate('/cards');
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>Login</h2>
      <form onSubmit={formik.handleSubmit} className='w-75 m-auto'>
        <div className='form-floating mb-3'>
          <input
            type='email'
            className='form-control'
            id='email'
            placeholder='name@example.com'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor='email'>Email address</label>
          {formik.touched.email && formik.errors.email && (
            <p className='text-danger'>{formik.errors.email}</p>
          )}
        </div>

        <div className='form-floating mb-3'>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder='Password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor='password'>Password</label>
          {formik.touched.password && formik.errors.password && (
            <p className='text-danger'>{formik.errors.password}</p>
          )}
        </div>

        <button
          type='submit'
          className='btn btn-danger w-100'
          disabled={!formik.isValid || !formik.dirty}
        >
          Login
        </button>
      </form>

      <Link className='d-block text-info mt-3' to='/register'>
        New user? Register here
      </Link>
    </div>
  );
};

export default Login;
