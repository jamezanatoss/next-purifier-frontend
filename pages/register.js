import Head from 'next/head';
import Layout from '../layout/layout';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useFormik } from 'formik';
import { registerValidate } from '../lib/validate';
import styles from '../styles/Form.module.css';
import { useRouter } from 'next/router';

export default function Register() {
    const router = useRouter();
    const [show, setShow] = useState({ password: false, cpassword: false });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: registerValidate,
        onSubmit: onSubmit
    });

    async function onSubmit(values) {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        };
      
        const response = await fetch('http://localhost:3029/api/auth/signup', options);
        const data = await response.json();
      
        if (response.ok) {
          Swal.fire({
            title: 'Success',
            text: 'Register สำเร็จ.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            router.push('/login');
          });
        } else if (response.status === 422 && data.error === 'User Already Exists...!') {
          Swal.fire({
            title: 'Error',
            text: 'Email นี้มีผู้ใช้ไปแล้ว',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Email นี้มีผู้ใช้ไปแล้ว',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
      

    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>

            <section className={styles.container}>
                <div className={styles.registerSection}>
                    <div className={styles.title}>
                        <h1 className={styles.heading}>Register</h1>
                        <p className={styles.subheading}>เครื่องกรองน้ำ Purifier</p>
                    </div>

                    {/* form */}
                    <form className={styles.form} onSubmit={formik.handleSubmit}>
                        <div className={`${styles.formGroup} ${formik.errors.username && formik.touched.username ? styles.error : ''}`}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className={styles.input}
                                {...formik.getFieldProps('username')}
                            />

                        </div>
                        {formik.errors.username && formik.touched.username && <span className={styles.error}>{formik.errors.username}</span>}

                        <div className={`${styles.formGroup} ${formik.errors.email && formik.touched.email ? styles.error : ''}`}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className={styles.input}
                                {...formik.getFieldProps('email')}
                            />

                        </div>
                        {formik.errors.email && formik.touched.email && <span className={styles.error}>{formik.errors.email}</span>}

                        <div className={`${styles.formGroup} ${formik.errors.password && formik.touched.password ? styles.error : ''}`}>
                            <input
                                type={`${show.password ? 'text' : 'password'}`}
                                name="password"
                                placeholder="Password"
                                className={styles.input}
                                {...formik.getFieldProps('password')}
                            />
                            {formik.errors.password && formik.touched.password && (
                                <span className={styles.error}>{formik.errors.password}</span>
                            )}
                        </div>
                        <div className={`${styles.formGroup} ${formik.errors.cpassword && formik.touched.cpassword ? styles.error : ''}`}>
                            <input
                                type={`${show.cpassword ? 'text' : 'password'}`}
                                name="cpassword"
                                placeholder="Confirm Password"
                                className={styles.input}
                                {...formik.getFieldProps('cpassword')}
                            />
                            {formik.errors.cpassword && formik.touched.cpassword && (
                                <span className={styles.error}>{formik.errors.cpassword}</span>
                            )}
                        </div>

                        {/* login buttons */}
                        <div className="input-button">
                            <button type="submit" className={styles.registerButton}>
                                Sign Up
                            </button>
                        </div>
                    </form>

                    {/* bottom */}
                    <div className={styles.signup}>
                        คุณมีรหัสแล้วใช่ไหม ?{' '}
                        <Link href="/login">
                            <span className={styles.signupLink}>Sign In</span>
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}


