'use server';

import { getAnnouncement, getAnnouncements } from "@/app/api/announcements";
import Navbar from "@/app/components/navbar";
import DetailPageSkeleton from "@/app/components/skeletons/detail-page";
import { BASE_API_URL } from "@/app/config";
import Image from "next/image";
import { Suspense } from "react";
import styles from './styles.module.scss';
import Error from "next/error";
import { notFound } from "next/navigation";
import { getActivity } from "@/app/api/activity";

export default async function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <Suspense fallback={<DetailPageSkeleton />}>
            <Activity id={id} />
        </Suspense>
    );
}

async function Activity({ id }: { id: string }) {
    try {
        const activity = await getActivity(id);
        return (
            <div>
                {activity.images.length > 0 && (
                    <Image src={`${BASE_API_URL}${activity.images[0]}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className={`${styles.image}`}
                        alt={activity.name} />
                )}
                <h1 className={`${styles.title}`}>{activity.name}</h1>
                <p className={`${styles.description}`}>{activity.description}</p>
            </div>
        );
    } catch (error) {
        notFound();
    }
}