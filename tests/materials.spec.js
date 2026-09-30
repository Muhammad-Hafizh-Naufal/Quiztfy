import { test, expect } from "@playwright/test";
const video = {
  id: "NBZ9Ro6UKV8",
  provider: "YouTube",
  url: "https://www.youtube.com/watch?v=NBZ9Ro6UKV8",
  embedUrl:
    "https://www.youtube-nocookie.com/embed/NBZ9Ro6UKV8?rel=0&playsinline=1",
  thumbnailUrl: null,
};
const material = {
  id: 1,
  title: "HTML",
  quizId: 1,
  quiz: { id: 1, title: "Web Development" },
  content: "Pelajari struktur halaman web dari dasar.",
  thumbnailUrl: null,
  sectionCount: 2,
  videoCount: 1,
  videoStatus: "available",
  sections: [
    {
      id: 10,
      title: "Pendahuluan HTML",
      content: "HTML menyusun struktur halaman.",
      videos: [video],
      images: [],
    },
    {
      id: 11,
      title: "Latihan heading",
      content: "Gunakan h1 untuk judul utama.",
      videos: [],
      images: [],
    },
  ],
};
test.beforeEach(async ({ page }) => {
  await page.route("**/api/**", (route) => {
    const path = new URL(route.request().url()).pathname.replace("/api", "");
    if (path === "/materials" || path === "/quiz/1/materials")
      return route.fulfill({ json: [material] });
    if (path === "/materials/1") return route.fulfill({ json: material });
    if (path === "/quiz/2/materials") return route.fulfill({ json: [] });
    return route.fulfill({
      status: 404,
      json: { message: "Materi tidak ditemukan." },
    });
  });
  await page.route("https://www.youtube-nocookie.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<html><body>Player test fixture</body></html>",
    }),
  );
});
test("catalog search, video player and lesson navigation stay connected to quiz", async ({
  page,
}, testInfo) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/materi");
  await expect(page.locator(".material-card")).toHaveCount(1);
  await page.getByLabel("Cari materi").fill("missing");
  await expect(page.getByText("Tidak ada materi yang cocok.")).toBeVisible();
  await page.getByLabel("Cari materi").fill("HTML");
  await page
    .getByRole("link", { name: "Pelajari materi", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Pendahuluan HTML", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Putar video Pendahuluan HTML" })
    .click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    /youtube-nocookie.com\/embed\/NBZ9Ro6UKV8/,
  );
  await expect(
    page.getByRole("link", { name: "Buka di YouTube" }),
  ).toHaveAttribute("href", video.url);
  await page.getByRole("button", { name: "Bagian berikutnya" }).click();
  await expect(
    page.getByRole("heading", { name: "Latihan heading", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Video belum tersedia" }),
  ).toBeVisible();
  await expect(page.getByText("Gunakan h1 untuk judul utama.")).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.screenshot({
    path: testInfo.outputPath("material-no-video.png"),
    fullPage: true,
  });
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Latihan heading", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Uji pemahaman" }),
  ).toHaveAttribute("href", "/quiz/1");
  await page.getByRole("button", { name: "Sebelumnya" }).click();
  await expect(
    page.getByRole("button", { name: "Putar video Pendahuluan HTML" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("material pages fit mobile, tablet and desktop", async ({
  page,
}, testInfo) => {
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/materi", "/materi/1"]) {
      await page.goto(path);
      await expect(
        page.locator(path === "/materi" ? ".material-card" : ".lesson-sidebar"),
      ).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
      await page.screenshot({
        path: testInfo.outputPath(
          `material-${width}-${path === "/materi" ? "catalog" : "detail"}.png`,
        ),
        fullPage: true,
      });
    }
  }
});
test("empty category retains quiz access and invalid material shows an error", async ({
  page,
}) => {
  await page.goto("/materi?quizId=2");
  await expect(
    page.getByText("Materi untuk topik ini sedang disiapkan."),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Tetap coba kuisnya" }),
  ).toHaveAttribute("href", "/quiz/2");
  await page.getByRole("button", { name: "Lihat semua materi" }).click();
  await expect(page.locator(".material-card")).toHaveCount(1);
  await page.goto("/materi/999");
  await expect(page.getByRole("alert")).toContainText(
    "Materi tidak ditemukan.",
  );
});
test("untrusted player URL never renders an iframe", async ({ page }) => {
  await page.route("**/api/materials/1", (route) =>
    route.fulfill({
      json: {
        ...material,
        sections: [
          {
            ...material.sections[0],
            videos: [
              { ...video, embedUrl: "https://evil.example/embed/NBZ9Ro6UKV8" },
            ],
          },
        ],
      },
    }),
  );
  await page.goto("/materi/1");
  await expect(
    page.getByRole("heading", { name: "Video belum tersedia" }),
  ).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
});
