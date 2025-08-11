import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateEquipment, getSingleEquipment } from '../services/EquipmentService';
import { toast } from 'react-toastify';
import './EditEquipment.css';

const EditEquipment = () => {
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { equipmentId } = useParams();

  useEffect(() => {
    fetchEquipment();
  }, [equipmentId]);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const response = await getSingleEquipment(equipmentId);
      setEquipment(response.data);
      setImagePreview(response.data.imageUrl);
    } catch (err) {
      toast.error('Failed to load equipment details');
      navigate('/my-equipments');
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    description: Yup.string()
      .max(500, 'Description must be less than 500 characters'),
    rentalPrice: Yup.number()
      .required('Rental price is required')
      .positive('Rental price must be positive')
      .min(1, 'Rental price must be at least ₹1')
      .max(10000, 'Rental price must be less than ₹10,000'),
  });

  const formik = useFormik({
    initialValues: {
      name: equipment?.name || '',
      description: equipment?.description || '',
      rentalPrice: equipment?.rentalPrice || '',
      image: null
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setUpdating(true);
        
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('rentalPrice', values.rentalPrice);
        
        if (values.image) {
          formData.append('image', values.image);
        }

        const response = await updateEquipment(equipmentId, formData);
        toast.success(response.data.message || 'Equipment updated successfully!');
        navigate('/my-equipments');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to update equipment');
      } finally {
        setUpdating(false);
      }
    }
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue('image', file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="edit-equipment-container main-content">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading equipment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-equipment-container main-content">
      <div className="edit-equipment-form-container">
        <div className="form-header">
          <h1>Edit Equipment</h1>
          <p>Update your equipment details</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="edit-equipment-form">
          <div className="form-group">
            <label htmlFor="name">Equipment Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.name && formik.errors.name ? 'error' : ''}
              placeholder="Enter equipment name"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error-message">{formik.errors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.description && formik.errors.description ? 'error' : ''}
              placeholder="Enter equipment description"
              rows="4"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="error-message">{formik.errors.description}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="rentalPrice">Rental Price (₹/day) *</label>
            <input
              type="number"
              id="rentalPrice"
              name="rentalPrice"
              value={formik.values.rentalPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.rentalPrice && formik.errors.rentalPrice ? 'error' : ''}
              placeholder="Enter rental price per day"
              min="1"
              step="0.01"
            />
            {formik.touched.rentalPrice && formik.errors.rentalPrice && (
              <div className="error-message">{formik.errors.rentalPrice}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image">Equipment Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="file-input"
            />
            <p className="file-help">Leave empty to keep current image</p>
            
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Equipment preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/my-equipments')}
              className="cancel-btn"
              disabled={updating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="update-btn"
              disabled={updating || !formik.isValid}
            >
              {updating ? (
                <div className="button-spinner"></div>
              ) : (
                'Update Equipment'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEquipment;
