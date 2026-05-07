import { getPayload } from 'payload'
import configPromise from '@payload-config'
import * as dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const tasks = [
  {
    title: 'Implement OAuth2 Login',
    description: 'Integrate Google and GitHub social login using NextAuth.',
    status: 'in-progress',
  },
  {
    title: 'Fix Navbar Mobile Toggle',
    description: "The hamburger menu doesn't close when a link is clicked.",
    status: 'todo',
  },
  {
    title: 'Database Migration',
    description: 'Migrate legacy user data to the new PostgreSQL schema.',
    status: 'done',
  },
  {
    title: 'Update Documentation',
    description: 'Write API documentation for the new v2 endpoints.',
    status: 'todo',
  },
  {
    title: 'Refactor State Management',
    description: 'Move local component state to Redux Toolkit for global access.',
    status: 'in-progress',
  },
  {
    title: 'SSL Certificate Renewal',
    description: "Renew the Let's Encrypt certificates for the staging server.",
    status: 'done',
  },
  {
    title: 'Performance Audit',
    description: 'Run Lighthouse reports and optimize image loading times.',
    status: 'todo',
  },
  {
    title: 'Unit Testing: Auth Service',
    description: 'Achieve 80% coverage for login and registration logic.',
    status: 'in-progress',
  },
  {
    title: 'Design System Update',
    description: 'Update primary brand colors in Tailwind configuration.',
    status: 'done',
  },
  {
    title: 'Bug: Stripe Webhook',
    description: 'Investigate why checkout.session.completed is failing intermittently.',
    status: 'todo',
  },
  {
    title: 'SEO Optimization',
    description: 'Add meta tags and JSON-LD structured data to blog posts.',
    status: 'in-progress',
  },
  {
    title: 'Dark Mode Support',
    description: "Implement dark mode using the 'dark:' class prefix.",
    status: 'done',
  },
  {
    title: 'Dependency Cleanup',
    description: 'Remove unused npm packages from package.json.',
    status: 'todo',
  },
  {
    title: 'User Dashboard UI',
    description: 'Build the main layout for the user profile and settings.',
    status: 'in-progress',
  },
  {
    title: 'Error Logging Setup',
    description: 'Integrate Sentry for real-time frontend error tracking.',
    status: 'done',
  },
  {
    title: 'Email Template Design',
    description: 'Create responsive HTML templates for welcome emails.',
    status: 'todo',
  },
  {
    title: 'Load Testing',
    description: 'Simulate 500 concurrent users on the checkout page.',
    status: 'in-progress',
  },
  {
    title: 'Fix CSS Grid Layout',
    description: 'Fix overlapping cards on tablet-sized screens (768px).',
    status: 'done',
  },
  {
    title: 'Onboarding Flow',
    description: 'Create a 3-step walkthrough for new users.',
    status: 'todo',
  },
  {
    title: 'Cache Layer Config',
    description: 'Set up Redis for caching expensive database queries.',
    status: 'in-progress',
  },
  {
    title: 'Privacy Policy Update',
    description: 'Update the legal footer for GDPR compliance.',
    status: 'done',
  },
  {
    title: 'Search Bar Autocomplete',
    description: 'Add debounced search suggestions to the header.',
    status: 'todo',
  },
  {
    title: 'Profile Picture Upload',
    description: 'Connect frontend upload to AWS S3 bucket.',
    status: 'in-progress',
  },
  {
    title: 'API Rate Limiting',
    description: 'Implement a 100 req/min limit per IP address.',
    status: 'done',
  },
  {
    title: 'Footer Component',
    description: 'Add social links and copyright notice to the footer.',
    status: 'todo',
  },
  {
    title: 'Export to CSV',
    description: 'Allow admins to download the user list as a CSV file.',
    status: 'in-progress',
  },
  {
    title: 'Fix Memory Leak',
    description: 'Debug useEffect hook in the Chat component.',
    status: 'done',
  },
  {
    title: 'Password Reset Logic',
    description: 'Implement token-based password recovery via email.',
    status: 'todo',
  },
  {
    title: 'Accessibility Audit',
    description: 'Ensure all buttons have aria-labels and sufficient contrast.',
    status: 'in-progress',
  },
  {
    title: 'Hero Section Animation',
    description: 'Add a fade-in effect using Framer Motion.',
    status: 'done',
  },
  {
    title: 'Sidebar Navigation',
    description: 'Build a collapsible sidebar for the admin panel.',
    status: 'todo',
  },
  {
    title: 'Data Visualization',
    description: 'Add Chart.js graphs to the analytics page.',
    status: 'in-progress',
  },
  {
    title: 'Type Safety Fixes',
    description: "Replace 'any' types with proper interfaces in TypeScript.",
    status: 'done',
  },
  {
    title: 'Breadcrumb Component',
    description: 'Add dynamic breadcrumbs to the nested route pages.',
    status: 'todo',
  },
  {
    title: 'Password Strength Meter',
    description: 'Show visual feedback for user password complexity.',
    status: 'in-progress',
  },
  {
    title: 'Server-Side Rendering',
    description: 'Enable SSR for product pages to improve SEO.',
    status: 'done',
  },
  {
    title: 'Custom 404 Page',
    description: 'Design and code a friendly 404 error page.',
    status: 'todo',
  },
  {
    title: 'Image Optimization',
    description: 'Convert all PNGs to WebP format for faster delivery.',
    status: 'in-progress',
  },
  {
    title: 'Two-Factor Auth',
    description: 'Add TOTP support via Google Authenticator.',
    status: 'done',
  },
  {
    title: 'Newsletter Integration',
    description: 'Connect the footer signup form to Mailchimp API.',
    status: 'todo',
  },
  {
    title: 'Skeleton Loaders',
    description: 'Add loading placeholders for the content cards.',
    status: 'in-progress',
  },
  {
    title: 'Environment Variable Audit',
    description: 'Secure API keys using .env.production files.',
    status: 'done',
  },
  { title: 'Notification Bell', description: 'Real-time updates using Socket.io.', status: 'todo' },
  {
    title: 'Modal Refactoring',
    description: 'Standardize all popup modals into a single Portal component.',
    status: 'in-progress',
  },
  {
    title: 'Favicon Set',
    description: 'Generate multi-size icons for different browsers.',
    status: 'done',
  },
  {
    title: 'Role Based Access',
    description: 'Restricting admin routes based on user roles.',
    status: 'todo',
  },
  {
    title: 'Landing Page Copy',
    description: 'Finalize the marketing text for the homepage.',
    status: 'in-progress',
  },
  {
    title: 'Database Backup Script',
    description: 'Automate nightly backups to an offsite server.',
    status: 'done',
  },
  {
    title: 'API Versioning',
    description: 'Prepare the backend for /api/v2 changes.',
    status: 'todo',
  },
  {
    title: 'Theme Toggle Switch',
    description: 'Build the UI switch for light/dark mode.',
    status: 'in-progress',
  },
] as const

const seed = async () => {
  if (!process.env.PAYLOAD_SECRET) {
    console.error('❌ PAYLOAD_SECRET is still missing!')
    process.exit(1)
  }
  try {
    // 2. Initialize Payload with the imported config
    const payload = await getPayload({
      config: configPromise,
    })

    console.log('--- Starting Seed ---')

    for (const taskData of tasks) {
      await payload.create({
        collection: 'tasks',
        data: taskData,
      })
      console.log(`Added: ${taskData.title}`)
    }

    console.log('--- ✅ Seed Successful ---')
    process.exit(0)
  } catch (error) {
    console.error('--- ❌ Seed Failed ---')
    console.error(error)
    process.exit(1)
  }
}

seed()
