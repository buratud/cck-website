'use server';

import React, { Suspense } from 'react';
import Placeholder from '@/app/components/placeholder';
import PlaceholderSkeleton from '@/app/components/skeletons/placeholder';
import { BASE_API_URL } from '@/app/config';
import { getActivities } from '../api/activity';

export default async function ActivitySection() {
  return (
    <Suspense fallback={<ActivitySkeleton />}>
      <Activity />
    </Suspense>
  );
}

function ActivitySkeleton() {
  return (
    <>
      <PlaceholderSkeleton />
      <PlaceholderSkeleton />
      <PlaceholderSkeleton />
      <PlaceholderSkeleton />
    </>
  );
}

async function Activity() {
  const activities = await getActivities();
  return (
    <>
      {activities.map((activity) => {
        const imageBanner = activity.images.length > 0 ? `${BASE_API_URL}${activity.images[0]}` : '/no_image_available.png';
        return <div key={activity._id}>
          <Placeholder
            title={activity.name}
            description={activity.description}
            imgsrc={imageBanner}
            showButton={true}
            buttonLink={`/activity/${activity._id}`}
            buttonText='อ่านเพิ่มเติม'
          />
        </div>
      })}
    </>
  );
}