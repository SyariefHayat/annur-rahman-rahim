import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Navbar from '../Landing/Navbar';

const Profile = () => {
    return (
        <DefaultLayout>
            <Navbar position="relative" />
            <main className="mx-auto max-w-7xl h-screen px-6 lg:px-8">
                {/* Cover Image */}
                <header className="w-full h-[40%] bg-gray-300 rounded-md" />

                {/* Profile Info */}
                <section className="w-full flex gap-5 my-5" aria-label="User Profile">
                {/* Profile Image */}
                <aside className="flex justify-center items-start">
                    <figure>
                    <div className="w-40 h-40 bg-gray-300 rounded-full" />
                    {/* <figcaption className="text-center mt-2">Profile picture</figcaption> */}
                    </figure>
                </aside>

                {/* User Details */}
                <article className="w-full flex flex-col justify-center gap-2">
                    <h1 className="text-4xl font-semibold">John Doe</h1>
                    <p className="text-gray-600">johndoe@gmail.com</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, eum.</p>
                </article>
                </section>
            </main>
        </DefaultLayout>
    );
};

export default Profile;
