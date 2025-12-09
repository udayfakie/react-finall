import { FunctionComponent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { getCardsById, updateCard } from "../service/cardService";
import Card from "../interface/Card";
import Navbar from "./Navbar";

interface UpdateCardProps {}

const UpdateCard: FunctionComponent<UpdateCardProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [card, setCard] = useState<Card>({
    _id: "",
    title: "",
    subtitle: "",
    description: "",
    web: "",
    phone: "",
    email: "",
    image: { url: "", alt: "" },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0,
    },
  });

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    getCardsById(id)
      .then((res) => {
        setCard(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      title: card.title,
      subtitle: card.subtitle,
      description: card.description,
      web: card.web,
      phone: card.phone,
      email: card.email,
      image: {
        url: card.image.url,
        alt: card.image.alt,
      },
      address: {
        state: card.address.state,
        country: card.address.country,
        city: card.address.city,
        street: card.address.street,
        houseNumber: card.address.houseNumber,
        zip: card.address.zip,
      },
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      title: yup.string().required().min(2).max(256),
      subtitle: yup.string().required().min(2).max(256),
      description: yup.string().required().min(2).max(1024),
      web: yup.string().min(5),
      phone: yup.string().required().min(9).max(11),
      email: yup.string().required().email(),
      image: yup.object({
        url: yup.string().min(5),
        alt: yup.string().min(2).max(256),
      }),
      address: yup.object({
        country: yup.string().required(),
        city: yup.string().required(),
        street: yup.string().required(),
        houseNumber: yup.number().required().min(1),
      }),
    }),
    onSubmit: async (values) => {
      const token = sessionStorage.getItem("token");
      if (!token) return alert("You must be logged in!");

      try {
        const res = await updateCard(id!, values);
        alert("Updated successfully!");
        navigate("/cards");
      } catch (err) {
        console.log("Error updating card", err);
      }
    },
  });

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      <Navbar
        setTerm={() => {
          ('');
        }}
        setMyCardsTerm={() => {
          ('');
        }}
        setFilteredTerm={() => {
          ('');
        }}
      />      <div className="container mt-4">
        <h2 className="text-center display-4">Edit Card</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="form-control"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <small className="text-danger">{formik.errors.title}</small>
            )}
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="subtitle"
              placeholder="Subtitle"
              className="form-control"
              value={formik.values.subtitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.subtitle && formik.errors.subtitle && (
              <small className="text-danger">{formik.errors.subtitle}</small>
            )}
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="form-control"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <small className="text-danger">{formik.errors.description}</small>
            )}
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="web"
              placeholder="Website"
              className="form-control"
              value={formik.values.web}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="form-control"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="mb-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="image.url"
              placeholder="Image URL"
              className="form-control"
              value={formik.values.image.url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="image.alt"
              placeholder="Image Alt"
              className="form-control"
              value={formik.values.image.alt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="address.country"
              placeholder="Country"
              className="form-control"
              value={formik.values.address.country}
              onChange={formik.handleChange}
            />
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="address.city"
              placeholder="City"
              className="form-control"
              value={formik.values.address.city}
              onChange={formik.handleChange}
            />
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="address.street"
              placeholder="Street"
              className="form-control"
              value={formik.values.address.street}
              onChange={formik.handleChange}
            />
          </div>

          <div className="mb-2">
            <input
              type="number"
              name="address.houseNumber"
              placeholder="House Number"
              className="form-control"
              value={formik.values.address.houseNumber}
              onChange={formik.handleChange}
            />
          </div>

          <div className="mb-2">
            <input
              type="number"
              name="address.zip"
              placeholder="ZIP"
              className="form-control"
              value={formik.values.address.zip}
              onChange={formik.handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success me-2"
            disabled={!formik.isValid || !formik.dirty}
          >
            Update Card
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateCard;
