interface Identity {
    _id: string;
}

export interface Announcement extends Identity {
    name: string;
    description: string;
    images: string[];
}