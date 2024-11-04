'use server';

import { getAnnouncement } from "@/app/api/announcements";
import DetailPageSkeleton from "@/app/components/skeletons/detail-page";
import { BASE_API_URL } from "@/app/config";
import Image from "next/image";
import { Suspense } from "react";
import styles from './styles.module.scss';
import { notFound } from "next/navigation";

export default async function AnnouncementDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <Suspense fallback={<DetailPageSkeleton />}>
            <Announcement id={id} />
        </Suspense>
    );
}

async function Announcement({ id }: { id: string }) {
    try {
        const announcement = await getAnnouncement(id);
        return (
            <div>
                {announcement.images.length > 0 && (
                    <Image src={`${BASE_API_URL}${announcement.images[0]}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className={`${styles.image}`}
                        alt={announcement.name} />
                )}
                <h1 className={`${styles.title}`}>{announcement.name}</h1>
                <p className={`${styles.description}`}>{announcement.description}</p>
            </div>
        );
    } catch (error) {
        notFound();
    }
}