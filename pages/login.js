import Head from 'next/head';
import Layout from '../layout/layout';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
//import login_validate from '../lib/validate';
import Header from '@/components/Header';
import Center from '@/components/Center';
import Footer from '@/components/Footer';
import styles from '../styles/Login.module.css';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const inputStyles = {
    display: 'flex',
    border: '1px solid #CBD5E1',
    borderRadius: '0.375rem',
    position: 'relative',
};

const Login = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated' && session) {
            router.replace('/');
        }
    }, [status, session, router]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: onSubmit,
    });

    async function onSubmit(values) {
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: '/',
        });

        if (status.ok) {
            Swal.fire({
                title: 'Success',
                text: 'Login สำเร็จ',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                // Redirect using signIn() function
                signIn('credentials', {
                    email: values.email,
                    password: values.password,
                    callbackUrl: '/',
                });
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Email หรือ Password ไม่ถูกต้อง',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    }

    async function handleGoogleSignin() {
        signIn('google', { callbackUrl: 'http://localhost:3029' });
    }

    return (

        <div className={styles.container}>

            <Center>
                <section className={styles.loginSection}>
                    <div className={styles.title}>
                        <h1 className={styles.heading}>เข้าสู่ระบบ</h1>
                        <p className={styles.subheading}>เครื่องกรองน้ำ Purifier</p>
                    </div>

                    <form className={styles.form} onSubmit={formik.handleSubmit}>
                        <div className={styles.formGroup}>
                            <input
                                className={styles.input}
                                type="email"
                                name="email"
                                placeholder="Email"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <span className={styles.error}>{formik.errors.email}</span>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <input
                                className={styles.input}
                                type="password"
                                name="password"
                                placeholder="Password"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.errors.password && formik.touched.password && (
                                <span className={styles.error}>{formik.errors.password}</span>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <button className={styles.loginButton} type="submit">
                                Login
                            </button>
                        </div>

                        <div className={styles.formGroup}>
                            <button className={styles.googleButton} type="button" onClick={handleGoogleSignin}>
                                Sign In with Google
                            </button>
                        </div>
                    </form>

                    <div className={styles.signup}>
                        <span className={styles.signupText}>คุณยังไม่มีรหัสใช่ไหม ?</span>
                        <Link href="/register">
                            <div className={styles.signupLink}>Sign Up</div>
                        </Link>
                    </div>
                </section>
            </Center>

        </div>
    );
};

export default Login;
