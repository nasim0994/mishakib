import { model, Schema } from 'mongoose';
import { ISeo } from './seoInterface';

const seoSchema = new Schema<ISeo>({
  title: { type: String, required: true },
  author: { type: String },
  subject: { type: String },
  copyright: { type: String },
  description: { type: String, required: true },
  keywords: { type: String },

  ogTitle: { type: String },
  ogType: { type: String },
  ogUrl: { type: String },
  ogImageUrl: { type: String },
  ogDescription: { type: String },
  ogSiteName: { type: String },

  facebook_domain_verification: { type: String },
  google_site_verification: { type: String },
});

export const SEO = model<ISeo>('SEO', seoSchema);
