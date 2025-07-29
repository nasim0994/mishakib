import { Router } from 'express';
const router = Router();
import { authRoute } from '../modules/auth/authRoute';
import { userRoute } from '../modules/user/userRoute';
import { adminRoute } from '../modules/admin/adminRoute';
import { aboutRoute } from '../modules/about/aboutRoute';
import { counterRoute } from '../modules/counter/counterRoute';
import { serviceRoute } from '../modules/service/serviceRoute';
import { skillRoute } from '../modules/skill/skillRoute';
import { contactRoute } from '../modules/contact/contactRoute';
import { socialRoute } from '../modules/social/socialRoute';
import { messageRoute } from '../modules/message/messageRoute';
import { logoRoute } from '../modules/logo/logoRoute';
import { seoRoute } from '../modules/seo/seoRoute';
import { projectRoute } from '../modules/project/project/projectRoute';
import { categoryRoute } from '../modules/project/category/categoryRoute';

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
    path: '/project/category',
    route: categoryRoute,
  },
  {
    path: '/project',
    route: projectRoute,
  },
  {
    path: '/contact',
    route: contactRoute,
  },
  {
    path: '/social',
    route: socialRoute,
  },
  {
    path: '/message',
    route: messageRoute,
  },
  {
    path: '/logo-favicon',
    route: logoRoute,
  },
  {
    path: '/seo',
    route: seoRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
