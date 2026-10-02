export interface Course {
  title: string;
  image: string;
  /** Legacy importer field; normalized to `image` when records are read. */
  imageUrl?: string;
  description1: string;
  description2?: string;
  link: string;
  platform?: string;
  category: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  tags?: string;
  published?: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export type StoredCourse = Course & { id: string };

export type RelatedCourse = Pick<StoredCourse, "id" | "title" | "image" | "category">;

