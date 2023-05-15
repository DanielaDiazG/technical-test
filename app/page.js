"use client";
import SignIn from "@/components/SignIn";
import useUserStore from "@/hooks/useUserStore";
import constants from '@/utils/constants';
import {useRouter} from 'next/navigation';
import styles from './page.module.css'

const {USER_STATUS} = constants;

export default function Home() {
    const {createUser, userStatus} = useUserStore();
    const router = useRouter();

    if (userStatus === USER_STATUS.LOGGED_IN) {
        router.push('/posts')

    } else if (userStatus === USER_STATUS.LOGGED_OUT) {
        return (
            <main className={styles.main}>
                <SignIn createUser={createUser} />
            </main>
        );
    }
}
