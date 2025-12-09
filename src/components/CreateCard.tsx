import { FunctionComponent } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createCard } from '../service/cardService';
import { useNavigate } from 'react-router-dom';

interface CreateCardProps {}

const CreateCard: FunctionComponent<CreateCardProps> = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      subtitle: '',
      description: '',
      phone: '',
      email: '',
      web: '',
      image: { url: '', alt: '' },
      address: {
        state: '',
        country: '',
        city: '',
        street: '',
        houseNumber: 0,
        zip: 0,
      },
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required').min(2).max(256),
      subtitle: yup.string().required('Subtitle is required').min(2).max(256),
      description: yup
        .string()
        .required('Description is required')
        .min(2)
        .max(1024),
      phone: yup.string().required('Phone is required').min(9).max(11),
      email: yup.string().required('Email is required').min(5),
      web: yup
        .string()
        .min(14, 'Website must be at least 14 characters')
        .notRequired(),
      image: yup.object({
        url: yup.string().required('Image URL is required').min(14),
        alt: yup.string().min(2).max(256).notRequired(),
      }),
      address: yup.object({
        state: yup.string().notRequired(),
        country: yup.string().required('Country is required'),
        city: yup.string().required('City is required'),
        street: yup.string().required('Street is required'),
        houseNumber: yup.number().required('House number is required').min(1),
        zip: yup.number().notRequired(),
      }),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) return alert('You must be logged in!');

        const res = await createCard(values,token);
        // setMyCards((prev) => [...prev, res.data]);
        console.log('Card created successfully', res.data);
        resetForm();
        navigate('/my-cards');
      } catch (err) {
        console.log('Error creating card', err);
      }
    },
  });

  return (
    <div className='container mt-4'>
      <h2>Create New Card</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mb-2'>
              <input
                type='text'
                name='title'
                placeholder='Title'
                className='form-control'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title && (
                <small className='text-danger'>{formik.errors.title}</small>
              )}
            </div>

            <div className='mb-2'>
              <input
                type='text'
                name='subtitle'
                placeholder='Subtitle'
                className='form-control'
                value={formik.values.subtitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.subtitle && formik.errors.subtitle && (
                <small className='text-danger'>{formik.errors.subtitle}</small>
              )}
            </div>

            <div className='mb-2'>
              <input
                type='text'
                name='phone'
                placeholder='Phone'
                className='form-control'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <small className='text-danger'>{formik.errors.phone}</small>
              )}
            </div>

            <div className='mb-2'>
              <input
                type='email'
                name='email'
                placeholder='Email'
                className='form-control'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <small className='text-danger'>{formik.errors.email}</small>
              )}
            </div>

            <div className='mb-2'>
              <input
                type='text'
                name='web'
                placeholder='Website'
                className='form-control'
                value={formik.values.web}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.web && formik.errors.web && (
                <small className='text-danger'>{formik.errors.web}</small>
              )}
            </div>

            <div className='mb-2'>
              <input
                type='text'
                name='image.url'
                placeholder='Image URL'
                className='form-control'
                value={formik.values.image.url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.image?.url && formik.errors.image?.url && (
                <small className='text-danger'>{formik.errors.image.url}</small>
              )}
            </div>

            <div className='mb-2'>
              <input
                type='text'
                name='image.alt'
                placeholder='Image Alt'
                className='form-control'
                value={formik.values.image.alt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.image?.alt && formik.errors.image?.alt && (
                <small className='text-danger'>{formik.errors.image.alt}</small>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className='col-md-6'>
            <div className='mb-2'>
              <textarea
                name='description'
                placeholder='Description'
                className='form-control'
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <small className='text-danger'>
                  {formik.errors.description}
                </small>
              )}
            </div>

            <div className='mb-2'>
              <input
                type='text'
                name='address.state'
                placeholder='State'
                className='form-control mb-2'
                value={formik.values.address.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <input
                type='text'
                name='address.country'
                placeholder='Country'
                className='form-control mb-2'
                value={formik.values.address.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <input
                type='text'
                name='address.city'
                placeholder='City'
                className='form-control mb-2'
                value={formik.values.address.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <input
                type='text'
                name='address.street'
                placeholder='Street'
                className='form-control mb-2'
                value={formik.values.address.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <input
                type='number'
                name='address.houseNumber'
                placeholder='House Number'
                className='form-control mb-2'
                value={formik.values.address.houseNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <input
                type='number'
                name='address.zip'
                placeholder='ZIP'
                className='form-control mb-2'
                value={formik.values.address.zip}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='btn btn-success mt-3 m-1'
          disabled={!formik.isValid || !formik.dirty}
        >
          Create Card
        </button>
        <button
          type='submit'
          className='btn btn-warning mt-3  '
          onClick={ ()=> navigate(-1)}
          disabled={!formik.isValid || !formik.dirty}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default CreateCard;
