interface Identity {
    _id: string;
}

export interface Announcement extends Identity {
    name: string;
    description: string;
    images: string[];
}

export interface Activity extends Identity {
    name: string;
    description: string;
    images: string[];
}