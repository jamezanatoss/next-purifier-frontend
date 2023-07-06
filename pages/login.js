import Head from 'next/head';
import Layout from '../layout/layout';
import Link from 'next/link';
import Image from 'next/image';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import login_validate from '../lib/validate';
import Header from '@/components/Header';
import Center from '@/components/Center';
import Footer from '@/components/Footer';

const inputStyles = {
    display: 'flex',
    border: '1px solid #CBD5E1',
    borderRadius: '0.375rem',
    position: 'relative',
};

const Login = () => {
    const [show, setShow] = useState(false);

    // formik hook
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: login_validate,
        onSubmit: onSubmit,
    });

    async function onSubmit(values) {
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: '/',
        });

        if (status.ok) router.push(status.url);
    }

    // Google Handler function
    async function handleGoogleSignin() {
        signIn('google', { callbackUrl: 'http://localhost:3029' });
    }

    return (
        <Layout>
            <Header />
            <Center>
                <Head>
                    <title>Login</title>
                </Head>

                <section className="w-3/4 mx-auto flex flex-col gap-10">
                    <div className="title">
                        <h1 className="text-gray-800 text-4xl font-bold py-4">เข้าสู่ระบบ</h1>
                        <p className="w-3/4 mx-auto text-gray-400">
                            เครื่องกรองน้ำ Purifier
                        </p>
                    </div>

                    {/* form */}
                    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                        <div style={inputStyles}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                style={{
                                    flex: '1',
                                    padding: '1rem 1.5rem',
                                    backgroundColor: '#F7FAFC',
                                    borderRadius: '0.375rem',
                                    outline: 'none',
                                    border: 'none',
                                }}
                                {...formik.getFieldProps('email')}
                            />
                            <span className="icon flex items-center px-4">
                                <HiAtSymbol size={25} />
                            </span>
                        </div>
                        {formik.errors.email && formik.touched.email ? (
                            <span className="text-rose-500">{formik.errors.email}</span>
                        ) : (
                            <></>
                        )}

                        <div style={inputStyles}>
                            <input
                                type={`${show ? 'text' : 'password'}`}
                                name="password"
                                placeholder="Password"
                                style={{
                                    flex: '1',
                                    padding: '1rem 1.5rem',
                                    backgroundColor: '#F7FAFC',
                                    borderRadius: '0.375rem',
                                    outline: 'none',
                                    border: 'none',
                                }}
                                {...formik.getFieldProps('password')}
                            />
                            <span className="icon flex items-center px-4" onClick={() => setShow(!show)}>
                                <HiFingerPrint size={25} />
                            </span>
                        </div>
                        {formik.errors.password && formik.touched.password ? (
                            <span className="text-rose-500">{formik.errors.password}</span>
                        ) : (
                            <></>
                        )}

                        {/* login buttons */}
                        <div className="input-button">
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    backgroundColor: '#6B7280',
                                    borderRadius: '0.375rem',
                                    padding: '0.75rem',
                                    color: '#F9FAFB',
                                    fontSize: '1.25rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                Login
                            </button>
                        </div>

                        <div className="input-button">
                            <button
                                type="button"
                                onClick={handleGoogleSignin}
                                style={{
                                    width: '100%',
                                    border: '1px solid #CBD5E1',
                                    padding: '0.75rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: '#F7FAFC',
                                    cursor: 'pointer',
                                }}
                            >
                                Sign In with Google
                                <Image src={'/assets/google.svg'} width="20" height={20} />
                            </button>
                        </div>
                    </form>

                    {/* bottom */}
                    <div className="text-center text-gray-400">
                        <span style={{ color: '#6B7280' }}>don't have an account yet?</span>{' '}
                        <Link href="/register">
                            <div className="text-blue-700 no-underline hover:underline text-lg">Sign Up</div>
                        </Link>
                    </div>


                </section>
            </Center>
            <Footer />
        </Layout>
    );
};

export default Login;
