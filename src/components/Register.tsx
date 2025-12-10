import { useFormik } from 'formik';
import { FunctionComponent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { addUser } from '../service/usersService';
import User from '../interface/User';

interface RegisterProps {}

const phoneRegex = /^(?:\+972|0)(?:5\d|7\d|2\d|3\d)\d{7}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-]).{9,20}$/;

const Register: FunctionComponent<RegisterProps> = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: { first: '', middle: '', last: '' },
      phone: '',
      email: '',
      password: '',
      image: { url: '', alt: '' },
      address: {
        state: '',
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        zip: '',
      },
      isBusiness: false,
    },
    validationSchema: yup.object({
      name: yup.object({
        first: yup.string().required('First name required').min(2).max(256),
        middle: yup.string().min(2).max(256),
        last: yup.string().required('Last name required').min(2).max(256),
      }),
      phone: yup
        .string()
        .min(9)
        .required('Phone required')
        .matches(phoneRegex, 'Invalid Israeli phone number'),
      email: yup
        .string()
        .min(5)
        .required('Email required')
        .email('Invalid email'),
      password: yup
        .string()
        .min(9)
        .max(20)
        .required('Password required')
        .matches(
          passwordRegex,
          'Password must be 9-20 chars, include upper, lower, number, special char !@#$%^&*-'
        ),
      image: yup.object({
        url: yup.string().min(14).url('Must be a valid URL').notRequired(),
        alt: yup.string().min(2).max(256).notRequired(),
      }),
      address: yup.object({
        state: yup.string().min(2).max(256).notRequired(),
        country: yup.string().required('Country required').min(2).max(256),
        city: yup.string().required('City required').min(2).max(256),
        street: yup.string().required('Street required').min(2).max(256),
        houseNumber: yup.number().required('House number required'),
        zip: yup.number().required('ZIP required'),
      }),
      isBusiness: yup.boolean().required(),
    }),
    onSubmit: (values) => {
      console.log('Payload to sent');
      const payload: User = {
        name: {
          first: values.name.first,
          middle: values.name.middle,
          last: values.name.last,
        },
        phone: values.phone,
        email: values.email,
        password: values.password,
        image: {
          url:
            values.image.url ||
            'https://c8.alamy.com/comp/DGEWKA/fire-alphabet-letter-j-isolated-on-black-background-DGEWKA.jpg',
          alt: values.image.alt || ' image',
        },
        address: {
          state: values.address.state,
          country: values.address.country || 'Israel',
          city: values.address.city,
          street: values.address.street,
          houseNumber: Number(values.address.houseNumber),
          zip: Number(values.address.zip),
        },
        isBusiness: values.isBusiness,
      };
      addUser(payload)
        .then((res) => {
          sessionStorage.setItem('userId', res.data._id);
          sessionStorage.setItem("userDetails", JSON.stringify(res.data));

          navigate('/');
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='row g-3'>
          <div className='col-md-4 form-floating'>
            <input
              type='text'
              className='form-control'
              id='first'
              placeholder='First Name'
              name='name.first'
              value={formik.values.name.first}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='first'>First Name</label>
            {formik.touched.name?.first && formik.errors.name?.first && (
              <p className='text-danger'>{formik.errors.name.first}</p>
            )}
          </div>

          <div className='col-md-4 form-floating'>
            <input
              type='text'
              className='form-control'
              id='middle'
              placeholder='Middle Name'
              name='name.middle'
              value={formik.values.name.middle}
              onChange={formik.handleChange}
            />
            <label htmlFor='middle'>Middle Name</label>
          </div>

          <div className='col-md-4 form-floating'>
            <input
              type='text'
              className='form-control'
              id='last'
              placeholder='Last Name'
              name='name.last'
              value={formik.values.name.last}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='last'>Last Name</label>
            {formik.touched.name?.last && formik.errors.name?.last && (
              <p className='text-danger'>{formik.errors.name.last}</p>
            )}
          </div>

          <div className='col-md-6 form-floating'>
            <input
              type='text'
              className='form-control'
              id='phone'
              placeholder='Phone'
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='phone'>Phone</label>
            {formik.touched.phone && formik.errors.phone && (
              <p className='text-danger'>{formik.errors.phone}</p>
            )}
          </div>

          <div className='col-md-6 form-floating'>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='Email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='email'>Email</label>
            {formik.touched.email && formik.errors.email && (
              <p className='text-danger'>{formik.errors.email}</p>
            )}
          </div>

          <div className='col-md-6 form-floating'>
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

          <div className='col-md-6 form-floating'>
            <input
              type='text'
              className='form-control'
              id='imageUrl'
              placeholder='Image URL'
              name='image.url'
              value={formik.values.image.url}
              onChange={formik.handleChange}
            />
            <label htmlFor='imageUrl'>Image URL</label>
          </div>

          <div className='col-md-6 form-floating'>
            <input
              type='text'
              className='form-control'
              id='imageAlt'
              placeholder='Image Alt'
              name='image.alt'
              value={formik.values.image.alt}
              onChange={formik.handleChange}
            />
            <label htmlFor='imageAlt'>Image Alt</label>
          </div>

          <div className='col-md-6 form-floating'>
            <input
              type='text'
              className='form-control'
              id='country'
              placeholder='Country'
              name='address.country'
              value={formik.values.address.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='country'>Country</label>
            {formik.touched.address?.country &&
              formik.errors.address?.country && (
                <p className='text-danger'>{formik.errors.address.country}</p>
              )}
          </div>

          <div className='col-md-6 form-floating'>
            <input
              type='text'
              className='form-control'
              id='state'
              placeholder='State'
              name='address.state'
              value={formik.values.address.state}
              onChange={formik.handleChange}
            />
            <label htmlFor='state'>State</label>
          </div>

          <div className='col-md-6 form-floating'>
            <input
              type='text'
              className='form-control'
              id='city'
              placeholder='City'
              name='address.city'
              value={formik.values.address.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='city'>City</label>
            {formik.touched.address?.city && formik.errors.address?.city && (
              <p className='text-danger'>{formik.errors.address.city}</p>
            )}
          </div>

          <div className='col-md-6 form-floating'>
            <input
              type='text'
              className='form-control'
              id='street'
              placeholder='Street'
              name='address.street'
              value={formik.values.address.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='street'>Street</label>
            {formik.touched.address?.street &&
              formik.errors.address?.street && (
                <p className='text-danger'>{formik.errors.address.street}</p>
              )}
          </div>

          <div className='col-md-6 form-floating'>
            <input
              type='number'
              className='form-control'
              id='houseNumber'
              placeholder='House Number'
              name='address.houseNumber'
              value={formik.values.address.houseNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='houseNumber'>House Number</label>
            {formik.touched.address?.houseNumber &&
              formik.errors.address?.houseNumber && (
                <p className='text-danger'>
                  {formik.errors.address.houseNumber}
                </p>
              )}
          </div>

          <div className='col-md-6 form-floating'>
            <input
              type='number'
              className='form-control'
              id='zip'
              placeholder='ZIP'
              name='address.zip'
              value={formik.values.address.zip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='zip'>ZIP</label>
            {formik.touched.address?.zip && formik.errors.address?.zip && (
              <p className='text-danger'>{formik.errors.address.zip}</p>
            )}
          </div>

          <div className='col-12 form-check mb-3'>
            <input
              type='checkbox'
              className='form-check-input'
              id='isBusiness'
              name='isBusiness'
              checked={formik.values.isBusiness}
              onChange={formik.handleChange}
            />
            <label className='form-check-label' htmlFor='isBusiness'>
              Register as Business
            </label>
          </div>

          <div className='col-12'>
            <button
              type='submit'
              className='btn btn-danger w-100'
              disabled={!formik.isValid || !formik.dirty}
            >
              Register
            </button>
          </div>
        </div>
      </form>

      <Link className='d-block text-info mt-3' to='/'>
        Already have an account? Login here
      </Link>
    </div>
  );
};

export default Register;
