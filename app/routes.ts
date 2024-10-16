import type { RouteConfig } from '@react-router/dev/routes'
import { index, layout, prefix, route } from '@react-router/dev/routes'

export const routes: RouteConfig = [
  index('routes/home.tsx'),
  route('/frameworks', './routes/frameworks.tsx'),
  route('/template', './routes/template.tsx'),

  /* Example routes

  layout('./auth/layout.tsx', [
    route('login', './auth/login.tsx'),
    route('register', './auth/register.tsx'),
  ]),
  ...prefix('concerts', [
    index('./concerts/home.tsx'),
    route(':city', './concerts/city.tsx'),
    route('trending', './concerts/trending.tsx'),
  ]),
  
  */
]
