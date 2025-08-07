import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEquipment } from '../services/EquipmentService';
import './AddEquipment.css';
import { toast } from 'react-toastify';

const AddEquipment = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: null,
    rentalPrice: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.image) errs.image = 'Image is required';
    if (!form.rentalPrice) errs.rentalPrice = 'Rental price is required';
    else if (isNaN(form.rentalPrice) || Number(form.rentalPrice) <= 0) errs.rentalPrice = 'Rental price must be a positive number';
    return errs;
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      await addEquipment(form);
      toast.success('Equipment added successfully!');
      navigate('/my-equipments');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add equipment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-equipment-container main-content mt-5">
      <div className="add-equipment-form-wrapper">
        <h1>Add New Equipment</h1>
        <form className="add-equipment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name<span className="required">*</span></label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} disabled={submitting} />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} disabled={submitting} rows={3} />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image<span className="required">*</span></label>
            <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} disabled={submitting} />
            {errors.image && <div className="form-error">{errors.image}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="rentalPrice">Rental Price (₹/day)<span className="required">*</span></label>
            <input type="number" id="rentalPrice" name="rentalPrice" value={form.rentalPrice} onChange={handleChange} disabled={submitting} min="1" step="0.01" />
            {errors.rentalPrice && <div className="form-error">{errors.rentalPrice}</div>}
          </div>
          <button className="submit-btn" type="submit" disabled={submitting}>{submitting ? 'Adding...' : 'Add Equipment'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddEquipment;