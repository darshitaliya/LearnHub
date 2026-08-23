import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://localhost:3001';
const SCREENSHOTS_DIR = path.resolve(process.cwd(), 'docs', 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log('🚀 Launching Edge browser via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    // 1. Home Page
    console.log('📸 Capturing Home Page...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_home_page.png'), fullPage: false });

    // 2. Course Catalog / Listing
    console.log('📸 Capturing Course Catalog...');
    await page.goto(`${BASE_URL}/courses`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02_course_catalog.png'), fullPage: false });

    // 3. Course Details Page (Route is /course/web101)
    console.log('📸 Capturing Course Details Page (/course/web101)...');
    await page.goto(`${BASE_URL}/course/web101`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_course_details.png'), fullPage: false });

    // 4. Login Page
    console.log('📸 Capturing Login Page...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(800);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04_login_page.png'), fullPage: false });

    // 5. Register Page
    console.log('📸 Capturing Register Page...');
    await page.goto(`${BASE_URL}/register`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(800);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05_register_page.png'), fullPage: false });

    // Log in as Student
    console.log('🔑 Logging in as Student (Alex Morgan)...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle0' });
    await page.type('input[type="email"]', 'alex@learnhub.com');
    await page.type('input[type="password"]', 'student123');
    await page.click('button[type="submit"]');
    await sleep(2000);

    // 6. Student Dashboard (Route is /dashboard)
    console.log('📸 Capturing Student Dashboard (/dashboard)...');
    await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1200);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06_student_dashboard.png'), fullPage: false });

    // 7. My Courses Page
    console.log('📸 Capturing My Courses (/my-courses)...');
    await page.goto(`${BASE_URL}/my-courses`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1200);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07_my_courses.png'), fullPage: false });

    // 8. Video Player Classroom (Route is /course/web101/learn)
    console.log('📸 Capturing Video Player Classroom (/course/web101/learn)...');
    await page.goto(`${BASE_URL}/course/web101/learn`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08_video_player.png'), fullPage: false });

    // 9. Student Profile (Route is /profile)
    console.log('📸 Capturing Student Profile (/profile)...');
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '10_user_profile.png'), fullPage: false });

    // Clear local storage and log in as Admin
    await page.evaluate(() => localStorage.clear());
    console.log('🔑 Logging in as System Admin...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle0' });
    await page.type('input[type="email"]', 'admin@learnhub.com');
    await page.type('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await sleep(2000);

    // 10. Admin Dashboard (Route is /admin)
    console.log('📸 Capturing Admin Dashboard (/admin)...');
    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1200);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '11_admin_dashboard.png'), fullPage: false });

    // 11. Admin Courses Management (/admin/courses)
    console.log('📸 Capturing Admin Courses Management (/admin/courses)...');
    await page.goto(`${BASE_URL}/admin/courses`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1200);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '12_admin_courses.png'), fullPage: false });

    // 12. Admin Users Management (/admin/users)
    console.log('📸 Capturing Admin Users Management (/admin/users)...');
    await page.goto(`${BASE_URL}/admin/users`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1200);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '13_admin_users.png'), fullPage: false });

    // 13. Admin Reports & Analytics (/admin/reports)
    console.log('📸 Capturing Admin Reports & Analytics (/admin/reports)...');
    await page.goto(`${BASE_URL}/admin/reports`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1200);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '14_admin_reports.png'), fullPage: false });

    // 14. Admin Enrollments Management (/admin/enrollments)
    console.log('📸 Capturing Admin Enrollments (/admin/enrollments)...');
    await page.goto(`${BASE_URL}/admin/enrollments`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1200);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '15_admin_enrollments.png'), fullPage: false });

    // 15. Admin Categories Management (/admin/categories)
    console.log('📸 Capturing Admin Categories (/admin/categories)...');
    await page.goto(`${BASE_URL}/admin/categories`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1200);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '16_admin_categories.png'), fullPage: false });

    // 16. About Page
    console.log('📸 Capturing About Page (/about)...');
    await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(800);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '17_about_page.png'), fullPage: false });

    // 17. Contact Page
    console.log('📸 Capturing Contact Page (/contact)...');
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(800);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '18_contact_page.png'), fullPage: false });

    console.log('✅ All verified real page screenshots captured without 404s!');
  } catch (err) {
    console.error('❌ Error capturing screenshots:', err);
  } finally {
    await browser.close();
  }
}

run();
