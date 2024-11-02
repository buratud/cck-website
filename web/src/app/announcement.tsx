'use server';

import React, { Suspense, useEffect, useState } from 'react';
import Placeholder from './components/placeholder';
import PlaceholderSkeleton from './components/skeletons/placeholder';
import { getAnnouncements } from './api/announcements';
import { BASE_API_URL } from './config';

export default async function AnnouncementSection() {
  return (
    <Suspense fallback={<AnnouncementSkeleton />}>
      <Announcement />
    </Suspense>
  );
}

function AnnouncementSkeleton() {
  return (
    <>
      <PlaceholderSkeleton />
      <PlaceholderSkeleton />
      <PlaceholderSkeleton />
      <PlaceholderSkeleton />
    </>
  );
}

async function Announcement() {
  const announcements = await getAnnouncements();
  return (
    <>
      {announcements.map((announcement) => {
        const imageBanner = announcement.images.length > 0 ? `${BASE_API_URL}${announcement.images[0]}` : '/image.jpg';
        return <div key={announcement._id}>
          <Placeholder
            title={announcement.name}
            description={announcement.description}
            imgsrc={imageBanner}
            showButton={true}
            buttonLink={`/announcement/${announcement._id}`}
            buttonText='Read More'
          />
        </div>
      })}
    </>
  );
}