import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, FloatingLabel } from 'react-bootstrap';
import MyModal from '../components/MyModal';

function RegistrationForm() {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Validation States
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Live password requirements
  const [pwdReqs, setPwdReqs] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  // Track password live check
  useEffect(() => {
    const pwd = formData.password;
    setPwdReqs({
      length: pwd.length >= 6,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    });
  }, [formData.password]);

  const handleRedirect = useCallback(() => {
    setShowModal(false);
    navigate('/home');
  }, [navigate]);

  // Handle countdown and redirect when Modal is shown
  useEffect(() => {
    let timer;
    if (showModal) {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        handleRedirect();
      }
    }
    return () => clearTimeout(timer);
  }, [showModal, countdown, handleRedirect]);

  // Helper validation function
  const validateField = (name, value, allValues = formData) => {
    let error = '';
    switch (name) {
      case 'username':
        if (!value.trim()) {
          error = 'Tên đăng nhập không được để trống.';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email không được để trống.';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            error = 'Email không đúng định dạng (ví dụ: example@domain.com).';
          }
        }
        break;
      case 'password':
        if (!value) {
          error = 'Mật khẩu không được để trống.';
        } else if (value.length < 6) {
          error = 'Mật khẩu phải từ 6 ký tự trở lên.';
        } else {
          const hasUpper = /[A-Z]/.test(value);
          const hasLower = /[a-z]/.test(value);
          const hasDigit = /\d/.test(value);
          const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
          if (!hasUpper || !hasLower || !hasDigit || !hasSpecial) {
            error = 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt.';
          }
        }
        break;
      case 'confirmPassword':
        if (!value) {
          error = 'Vui lòng xác nhận lại mật khẩu.';
        } else if (value !== allValues.password) {
          error = 'Mật khẩu xác nhận không trùng khớp.';
        }
        break;
      default:
        break;
    }
    return error;
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    // If already attempted submit or field is touched, update error on the fly
    if (submitted || touched[name]) {
      const error = validateField(name, value, updatedForm);
      setErrors(prev => ({ ...prev, [name]: error }));
    }

    // Dynamic error handling of confirmPassword when password changes
    if (name === 'password' && (submitted || touched.confirmPassword)) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword, updatedForm);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  // Handle Input Blur (Touched)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Mark all as touched
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    // Run validation across all fields
    const newErrors = {
      username: validateField('username', formData.username),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
      confirmPassword: validateField('confirmPassword', formData.confirmPassword)
    };

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(err => err !== '');

    if (!hasErrors) {
      // Trigger MyModal successful registration dialog
      setShowModal(true);
      setCountdown(3);
    }
  };

  // Cancel Handler (Resets state)
  const handleCancel = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setTouched({
      username: false,
      email: false,
      password: false,
      confirmPassword: false
    });
    setSubmitted(false);
  };

  return (
    <div className="reg-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="reg-card">
              <div className="reg-header">
                <h3>📝 Đăng Ký Tài Khoản</h3>
                <p className="mb-0 text-white-50 small mt-1">Đăng ký để khám phá các bài viết chất lượng</p>
              </div>

              <Card.Body className="reg-body">
                <Form onSubmit={handleSubmit} noValidate>
                  
                  {/* Username Field */}
                  <Form.Group className="mb-4" controlId="formUsername">
                    <FloatingLabel label="👤 Tên đăng nhập" className="mb-1">
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Tên đăng nhập"
                        value={formData.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.username && !!errors.username}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  {/* Email Field */}
                  <Form.Group className="mb-4" controlId="formEmail">
                    <FloatingLabel label="✉️ Địa chỉ Email" className="mb-1">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && !!errors.email}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  {/* Password Field */}
                  <Form.Group className="mb-4" controlId="formPassword">
                    <FloatingLabel label="🔒 Mật khẩu" className="mb-1">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && !!errors.password}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    
                    {/* Real-time Password Requirements Checklist */}
                    <div className="px-1 mt-2">
                      <div className="small fw-semibold text-secondary mb-1">Yêu cầu mật khẩu:</div>
                      <ul className="pwd-requirement-list list-unstyled">
                        <li className={`pwd-requirement-item ${pwdReqs.length ? 'valid' : 'invalid'}`}>
                          {pwdReqs.length ? '✓' : '•'} Từ 6 ký tự trở lên
                        </li>
                        <li className={`pwd-requirement-item ${pwdReqs.uppercase ? 'valid' : 'invalid'}`}>
                          {pwdReqs.uppercase ? '✓' : '•'} Có ít nhất 1 chữ in hoa
                        </li>
                        <li className={`pwd-requirement-item ${pwdReqs.lowercase ? 'valid' : 'invalid'}`}>
                          {pwdReqs.lowercase ? '✓' : '•'} Có ít nhất 1 chữ in thường
                        </li>
                        <li className={`pwd-requirement-item ${pwdReqs.number ? 'valid' : 'invalid'}`}>
                          {pwdReqs.number ? '✓' : '•'} Có ít nhất 1 chữ số
                        </li>
                        <li className={`pwd-requirement-item ${pwdReqs.specialChar ? 'valid' : 'invalid'}`}>
                          {pwdReqs.specialChar ? '✓' : '•'} Có ít nhất 1 ký tự đặc biệt
                        </li>
                      </ul>
                    </div>
                  </Form.Group>

                  {/* Confirm Password Field */}
                  <Form.Group className="mb-4" controlId="formConfirmPassword">
                    <FloatingLabel label="🔑 Xác nhận mật khẩu" className="mb-1">
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  {/* Action Buttons */}
                  <div className="d-grid gap-3 d-md-flex justify-content-md-end mt-4">
                    <Button
                      type="button"
                      variant="outline-secondary"
                      className="btn-cancel px-4"
                      onClick={handleCancel}
                    >
                      ❌ Hủy bỏ
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      className="btn-register px-4"
                    >
                      🚀 Đăng ký
                    </Button>
                  </div>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Success Notification Modal */}
      <div className="success-modal">
        <MyModal
          show={showModal}
          onHide={handleRedirect}
          title="🎉 Đăng Ký Thành Công!"
          size="md"
          footer={
            <Button variant="success" className="w-100 rounded-3 py-2 fw-semibold" onClick={handleRedirect}>
              Đi tới Trang chủ ({countdown}s)
            </Button>
          }
        >
          <div className="text-center py-3">
            <div className="success-icon-container">
              <span className="success-icon">✓</span>
            </div>
            <h4 className="mt-3 fw-bold text-success">Xin chúc mừng!</h4>
            <p className="text-muted px-4">
              Tài khoản của bạn đã được đăng ký thành công. Hệ thống sẽ tự động chuyển bạn đến trang chủ blog post sau vài giây nữa.
            </p>
          </div>
        </MyModal>
      </div>
    </div>
  );
}

export default RegistrationForm;
