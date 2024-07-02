import React from 'react';

import Main from '../components/MainSection';
import MakeUser from '../components/MakeUser';
import UsersSection from '../components/UsersSection';

interface IHomePageProps {
    refs: {
        listUserRef: React.RefObject<HTMLDivElement>;
        makeUserRef: React.RefObject<HTMLDivElement>;
    };
}

const HomePage: React.FC<IHomePageProps> = ({ refs }) => {
    return (
        <div>
            <Main refTo={refs.makeUserRef} />
            <div ref={refs.listUserRef}>
                <UsersSection />
            </div>
            <div ref={refs.makeUserRef}>
                <MakeUser refTo={refs.listUserRef} />
            </div>
        </div>
    );
};

export default HomePage;
