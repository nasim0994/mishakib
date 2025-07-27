import { Router } from 'express';
const router = Router();
import { authRoute } from '../modules/auth/authRoute';
import { userRoute } from '../modules/user/userRoute';
import { adminRoute } from '../modules/admin/adminRoute';
import { aboutRoute } from '../modules/about/aboutRoute';
import { counterRoute } from '../modules/counter/counterRoute';
import { serviceRoute } from '../modules/service/serviceRoute';
import { skillRoute } from '../modules/skill/skillRoute';
import { categoryRoute } from '../modules/gallery/category/categoryRoute';
import { galleryRoute } from '../modules/gallery/gallery/galleryRoute';

const moduleRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/about',
    route: aboutRoute,
  },
  {
    path: '/counter',
    route: counterRoute,
  },
  {
    path: '/service',
    route: serviceRoute,
  },
  {
    path: '/skill',
    route: skillRoute,
  },
  {
    path: '/gallery/category',
    route: categoryRoute,
  },
  {
    path: '/gallery',
    route: galleryRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
